const axios = require('axios');
require('dotenv').config();
const { STRIPE_PUBLIC_KEY, STRIPE_PRIVATE_KEY, GOOGLE_API_KEY_SERVER } = process.env
const stripe = require('stripe')(STRIPE_PRIVATE_KEY)

module.exports = {
    getStore,
    getMenus,
    getDishes,
    getStripePublicKey,
    orderDishes,
    getOrder,
    deleteOrder,
    getOrders
};

async function getStore(req, res) {
    const db = req.app.get('db');
    let { zipcode, lat, lng, hashtag } = req.query;
    // console.log(req.query);

    zipcode = zipcode === undefined ? '' : zipcode;
    lat = lat === undefined ? '' : lat;
    lng = lng === undefined ? '' : lng;
    hashtag = hashtag === undefined ? '' : hashtag;

    if (zipcode) {

        let location = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + '&key=' + GOOGLE_API_KEY_SERVER)
            .then(response => {
                // console.log(response.data);
                const latitude = response.data.results[0].geometry.location.lat;
                const longitude = response.data.results[0].geometry.location.lng;
                // console.log({ latitude, longitude })
                return { latitude, longitude }
            })
        lat = location.latitude;
        lng = location.longitude;
    };
    // lat and lng range
    const range = .05
    let hashtagParam = `%${hashtag.replace(' ', '%')}%`
    // if it's pass the reserve time, then don't show them.
    const time = new Date().toISOString();
    db.getStores(lat, lng, range, hashtagParam, time).then(stores => {
        res.status(200).json(stores);
    })

}

function getMenus(req, res) {
    const db = req.app.get('db');
    db.getMenus(req.params.store_id).then(menus => {
        res.status(200).json(menus);
    })
}


function getDishes(req, res) {
    const db = req.app.get('db');
    db.getDishes(req.params.menu_id).then(dishes => {
        res.status(200).json(dishes);
    })
}

function getStripePublicKey(req, res) {
    res.status(200).json(STRIPE_PUBLIC_KEY);
}

function orderDishes(req, res) {
    const db = req.app.get('db');
    const { dishes, token } = req.body
    let dbCheckAmt;
    let totalPrice;
    let orderMaster;
    console.log(token);
    
    db.checkDishAmt(JSON.stringify(dishes)).then(result => {
        // res.status(200).json(result);
        dbCheckAmt = result;
        console.log('dbCheckAmt', dbCheckAmt);
        let available = result.reduce((ttl, e) => ttl && e.available, true);
        if (available) {
            totalPrice = result.reduce((ttl, e) => ttl += e.unit_price * e.ordering_amt, 0);
            let stripeTotalPrice = parseInt(totalPrice * 100);
            return stripe.charges.create({
                amount: stripeTotalPrice,
                source: token.id,
                currency: 'usd'
            });
        } else {
            return Promise.reject('The available amt is not enough!')
        }
    }, (err) => {
        console.log('1', err);
        res.status(451).json(err);
    }).then(stripeRes => {
        console.log(stripeRes);  
        let charge_id = stripeRes.id;      
        return db.addOrderMaster(dbCheckAmt[0].store_dish_id, req.session.customer.customer_id, totalPrice, charge_id)
    }, (err) => {
        console.log('2', err);
        res.status(451).json(err)
    }).then(master => {
        console.log('master', master);        
        orderMaster = master;
        return db.addOrderDetail(master[0].order_master_id, JSON.stringify(dishes));
    }).then(detail => {
        console.log('detail', detail);        
        res.status(201).json({ order_master: orderMaster, order_detail: detail });
    }).catch(err => {
        console.log(err);        
        res.status(451).json(err);
    });
}


function getOrder(req,res){
    const db = req.app.get('db');
    const {order_id} = req.params;
    // console.log(order_id);
    db.getOrder(order_id).then(order=>{
        if(order[0].customer_id === req.session.customer.customer_id){
            res.status(200).json(order);
        }else{
            return Promise.reject('You are not authorized to see this order!');
        }
    }, err=>{
        // console.log(err);
        res.status(401).json(err);        
    })
}

function deleteOrder(req,res){
    const db = req.app.get('db');
    const {order_id} = req.params;
    console.log(order_id);
    db.getOrder(order_id).then(order=>{
        if(order[0].customer_id === req.session.customer.customer_id){
            let charge_id = order[0].charge_id;
            console.log(charge_id);
            
            return stripe.refunds.create(
                {charge: charge_id}
            );
        }else{
            return Promise.reject('You are not authorized to see this order!');
        }
    }, err=>{
        // console.log(err);
        res.status(401).json(err);        
    })
    .then(stripeRes=>{
        return db.refundOrder(order_id);
    }, err=>{
        // console.log(err);
        res.status(451).json(err);        
    }).then(response=>{
        res.status(200).json(response);
    })
}

function getOrders(req,res){
    const db = req.app.get('db');
    db.getOrders(req.session.customer.customer_id).then(response=>{
        res.status(200).json(response);
    })
}