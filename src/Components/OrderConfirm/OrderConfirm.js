import React, { Component } from 'react';
import './OrderConfirm.css';
import axios from 'axios';
class OrderConfirm extends Component {
    constructor() {
        super();
        this.state = {
            store_name: '',
            pick_up_time: '',
            orderDishes: [],
            total_price: 0
        }
    }

    componentDidMount() {
        axios.get(`/api/customer/order/${this.props.match.params.order_id}`).then(response => {
            this.setState({
                store_name: response.data[0].name,
                pick_up_time: response.data[0].pick_up_time,
                orderDishes: response.data,
                total_price: response.data[0].total_price
            })
        })
    }

    render() {
        let detail = this.state.orderDishes.map((e,i) => {
            return (
                <tr key={i}>
                    <td><div className='om-cell'>{e.dish_name} </div></td>
                    <td><div className='om-cell'>{e.order_amt} </div></td>
                </tr>
            )
        })
        return (
            <div className='oc-wrapper'>
                <div className='oc-store-name'>{this.state.store_name} </div>
                <label className='oc-pick-label'>Pick up on:</label>
                <div className='oc-pick-time'>{new Date(this.state.pick_up_time).toString().slice(4, 21)} </div>
                <table className='oc-dish-table'>
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
                <div className='oc-price'>Total: ${this.state.total_price} </div>
            </div>
        )
    }
}
export default OrderConfirm;