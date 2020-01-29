import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './MenuCard.css';
class MenuCard extends Component{
    constructor(){
        super();
        this.state = {
            dishes: []
        }
    }

    componentDidMount(){
        axios.get(`/api/customer/menu/${this.props.menu.store_menu_id}`).then(response=>{
            this.setState({
                dishes: response.data
            })
        })
    }

    render(){
        let dishList = this.state.dishes.map((d,i)=>{
            return (
                <div className='mc-dish-wrapper' key={i}>
                    <div className='mc-dish-info'>
                        <div className='mc-dish-name'>{d.dish_name} </div>
                        <div className='mc-dish-remain'>{d.left_amt} serve(s) left</div>
                    </div>
                    <h4 className='mc-dish-price'>${d.unit_price} </h4>
                </div>
            )
        })

        return (
            <div className='menu-card-wrapper'>
                {/* new Date(this.props.pick_up_time).toString().slice(4,21) */}
                <h1 className='mc-pick-up'>{new Date(this.props.menu.pick_up_time).toString().slice(4,21)}</h1>
                <h2 className='mc-reserve'>Order before {new Date(this.props.menu.reserve_time).toString().slice(4,21)}</h2>
                {dishList}
                <Link to={`/dashboard/menu/${this.props.menu.store_menu_id}`}><button className='little-btn'>Order now</button></Link>
            </div>
            
        )
    }
}
export default MenuCard;