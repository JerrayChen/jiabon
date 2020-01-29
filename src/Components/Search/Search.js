import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {searchStore} from '../../redux/reducers/searchReducer';
import axios from 'axios';
import './Search.css';
import StoreCard from '../Cards/StoreCard/StoreCard';

class Search extends Component{
    constructor(){
        super();
        this.state = {
            type: '',
            // date: null,
            location: '',
            stores: [],
            lat:'',
            lng:''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentDidMount(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                // get customer's current position.
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })

                // get the stores near the customer.
                axios.get(`/api/customer/store?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                .then(response=>{
                    // console.log(response.data);
                    this.setState({
                        stores: response.data
                    })
                })
            })
        }else{
            alert('Please enter zipcode to search.(Can not get current location.)');
        }
        
    }

    handleUserInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        let storeList = this.state.stores.map((e,i)=>{return(
            <StoreCard  key={i} 
                        store_id={e.store_id} 
                        store_name={e.name} 
                        pick_up_time={e.pick_up_time}  />
        )})
        return (
            <div>
                <div className='input-group'>
                    <div className='label'>Type of homemade food: </div>
                    <input className='search-input' name='type' onChange={this.handleUserInput} />
                </div>
                {/* <span className='label'>Date: </span>
                <input name='date' type='date'/> */}
                <div className='input-group'>
                    <div className='label'>Location: </div>
                    <input className='search-input' name='location' placeholder='Current location' onChange={this.handleUserInput} />
                </div>
                <Link to='/dashboard/searchresult'>
                    <button className='search-btn' onClick={()=>{this.props.searchStore(this.state.type, this.state.location, this.state.lat, this.state.lng)}} >Search</button>
                </Link>
                <div className='input-group'>
                    <div className='label'>Or try the food near you: </div>
                </div>
                <div className='store-list'>
                    {storeList}                
                </div>
            </div>
        )
    }
}
export default connect( undefined , { searchStore } )(Search);