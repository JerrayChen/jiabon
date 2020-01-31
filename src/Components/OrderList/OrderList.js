import React, {Component} from 'react';
import './OrderList.css';
import OrderCard from '../Cards/OrderCard/OrderCard';
import axios from 'axios';
class OrderList extends Component{
    constructor(){
        super();
        this.state = {
            orders: []
        }
        this.updateOrderList = this.updateOrderList.bind(this);
    }

    componentDidMount(){
        this.updateOrderList();
    }

    updateOrderList(){
        axios.get('/api/customer/order').then(response=>{
            this.setState({
                orders: response.data
            });
        })
    }

    render(){
        let order = this.state.orders.map((e,i)=>{
            return (
                <OrderCard key={i} order={e} updateOrderList={this.updateOrderList} />
            )
        })
        let empty = <div className='ol-empty'>You don't have any order!</div>
        return (
            <div className='ol-wrapper'>
                <div className='ol-title'>Your Orders:</div>
                <div className='ol-list-wrapper'>
                    {this.state.orders.length===0?empty:order}
                </div>
            </div>
        )
    }
}
export default OrderList;