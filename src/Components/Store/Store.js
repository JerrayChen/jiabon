import React, { Component } from 'react';
import axios from 'axios'
import './Store.css';
import MenuCard from '../Cards/MenuCard/MenuCard';
class Store extends Component {
    constructor() {
        super();
        // this.props.match.params.store_id
        this.state = {
            menus: [],
            store_name: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/customer/store/${this.props.match.params.store_id}`).then(response => {
            this.setState({
                menus: response.data,
                store_name: response.data[0].name
            })
        })
    }

    render() {
        let menuCards = this.state.menus.map((menu, i) => {
            return (
                <MenuCard key={i} menu={menu}/>
            )
        })
        return (
            <div>
                <img className='store-pic' src='https://chinesenewyear.imgix.net/assets/images/food/chinese-new-year-food-feast.jpg?q=50&w=2560&h=1440&fit=crop&auto=format' alt='store_pic' />
                <div className='s-store-name'>{this.state.store_name}</div>
                {menuCards}
            </div>
        )
    }
}
export default Store;