import React, { Component } from 'react';
// import { CardElement, injectStripe } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './Order.css';
class Order extends Component {
    constructor() {
        super();
        this.state = {
            store_name: '',
            reserve_time: '',
            pick_up_time: '',
            dishes: [],
            stripeKey: '',
            totalPrice: 0
        }
        this.payBill = this.payBill.bind(this)
    }

    componentDidMount() {
        axios.get(`/api/customer/menu/${this.props.match.params.menu_id}`).then(response => {
            this.setState({
                store_name: response.data[0].store_name,
                reserve_time: response.data[0].reserve_time,
                pick_up_time: response.data[0].pick_up_time,
                dishes: response.data,
            })
        })
        axios.get('/api/customer/stripe').then(response=>{
            this.setState({
                stripeKey: response.data
            })
        })

    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.dishes !== this.state.dishes){
            let ttlPrice = this.state.dishes.reduce((ttl, e)=>{
                return ttl+=e.ordering_amt*e.unit_price
            },0);
            this.setState({
                totalPrice: ttlPrice
            });
        }
    }

    // async payBill() {
    //     let { token } = await this.props.stripe.createToken({ name: "Name" });
    //     console.log(token);
    // }
    payBill = (token, address) => {
        var dishes = this.state.dishes.map(e=>{return {store_dish_id: e.store_dish_id, ordering_amt: e.ordering_amt}});
        axios.post('/api/customer/order', {dishes, token}).then(response=>{
            alert('Order successfully placed!');
            // console.log(response);
            this.props.history.push(`/dashboard/confirm/${response.data.order_master[0].order_master_id}`);
        },err=>{alert(err);})

    }

    // payBill() {

        // let stripeHandler = window.StripeCheckout.configure({
        //     key: 'pk_test_lSWosfxST1JdbS9FvbzTZLHW00US8hMmSO',
        //     locale: 'en',
        //     token: function(token) {
        //         console.log(token);            
        //     }
        // })
        // stripeHandler.open({
        //     amount: 1000
        // })
    // }




    render() {
        let dishCards = this.state.dishes.map((d, i) => {
            return (
                <div className='order-dish-wrapper' key={i}>
                    <div className='order-dish-info'>
                        <span className='order-dish-name'>{d.dish_name} </span>
                        <span className='order-dish-price'>${d.unit_price} </span>
                        <span className='order-dish-remain'>{d.left_amt} serve(s) left </span>
                    </div>
                    <input className='order-input' type='number' min='0' step='1' max={d.left_amt} value={d.ordering_amt} onChange={(e) => {
                        // console.log(d.store_dish_id, e.target.value);
                        // save the order amt of each dish in the ordering_amt state.
                        const updatedAmt = [...this.state.dishes];
                        updatedAmt[i].ordering_amt = e.target.value;
                        this.setState({
                            ...this.state,
                            dishes: updatedAmt
                        })
                    }} />
                </div>
            )
        })
        return (
            <div>
                <h1 className='order-store-name'>{this.state.store_name} </h1>
                <h2 className='order-pick-up-time'>{new Date(this.state.pick_up_time).toString().slice(4, 21)}</h2>
                <h3 className='order-reserve-time'>Order before {new Date(this.state.reserve_time).toString().slice(4, 21)}</h3>
                {dishCards}
                {/* <div className="checkout">
                    <CardElement style={this.state.style} />
                </div>
                <button onClick={this.payBill} >Pay</button> */}
                {/* <button onClick={this.payBill} >Pay</button> */}
                <StripeCheckout
                    stripeKey="pk_test_lSWosfxST1JdbS9FvbzTZLHW00US8hMmSO"
                    token={this.payBill}
                    amount={this.state.totalPrice*100}
                    description={this.state.store_name}
                    locale='en'
                    currency='USD'
                    name='Jiabon'
                ><button className='little-btn'>Pay</button></StripeCheckout>
            </div>

        )
    }
}
// export default injectStripe(Order);
export default Order;