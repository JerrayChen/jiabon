import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StoreCard.css';
class StoreCard extends Component {

    render() {
        return (
            <div className='store-card-wrapper'>
                <Link to={`/dashboard/store/${this.props.store_id}`}>
                    <div className='store-card'>
                        <img className='store-logo' src={process.env.PUBLIC_URL + '/jiabon.png'} alt='icon' />
                        <div className='store-info'>
                            <h3 className='store-name'>{this.props.store_name}</h3>
                            <span className='r-time'>Pick up on {new Date(this.props.pick_up_time).toString().slice(4,21)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
export default StoreCard;