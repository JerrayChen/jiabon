import React, {Component} from 'react';
import axios from 'axios';
import './OrderCard.css';
class OrderCard extends Component{
    constructor(){
        super();
        this.state = {
            store_name: '',
            pick_up_time: '',
            orderDishes: [],
            totalPrice: 0
        }
    }

    componentDidMount(){
        axios.get(`/api/customer/order/${this.props.order.order_master_id}`)
        .then(response=>{
            this.setState({
                store_name: response.data[0].name,
                pick_up_time: response.data[0].pick_up_time,
                orderDishes: response.data,
                total_price: response.data[0].total_price
            })
        })
    }

    cancelOrder(){
        axios.delete(`/api/customer/order/${this.props.order.order_master_id}`)
        .then(response=>{
            alert('The order is cancelled!');
            // update view
            this.props.updateOrderList();
        })
    }

    render(){
        let detail = this.state.orderDishes.map((e,i) => {
            return (
                <tr key={i}>
                    <td><div className='om-cell'>{e.dish_name} </div></td>
                    <td><div className='om-cell'>{e.order_amt} </div></td>
                </tr>
            )
        })
        let btn;
        if(new Date(this.state.pick_up_time) > new Date()){
            btn = <button className='om-little-btn' onClick={()=>{this.cancelOrder();}}>Cancel</button>
        }else{
            btn = <div className='om-dummy'></div>;
        }
        
        return (
            <div className='om-wrapper'>
                <div className='om-store-name'>{this.state.store_name} </div>
                <label className='om-label'>Pick up on:</label>
                <div className='om-pick-time'>{new Date(this.state.pick_up_time).toString().slice(4, 21)} </div>
                <table className='om-table'>
                    <thead>
                        <tr>
                            <th><div className='om-cell'>Item</div></th>
                            <th><div className='om-cell'>qty</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <div className='om-footer'>
                    {btn}                
                    <div className='om-price'>Total: ${this.state.total_price} </div>
                </div>
            </div>
        )
    }
}
export default OrderCard;