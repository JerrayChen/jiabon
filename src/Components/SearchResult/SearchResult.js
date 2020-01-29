import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleMap from '../GoogleMap/GoogleMap';
import StoreCard from '../Cards/StoreCard/StoreCard';
import './SearchResult.css';

class SearchResult extends Component{
    constructor(){
        super();
    }

    componentDidMount(){

    }

    render(){
        let storeList = this.props.stores.map((e,i)=>{return(
            <StoreCard  key={i} 
                        store_id={e.store_id} 
                        store_name={e.name} 
                        pick_up_time={e.pick_up_time}  />
        )})
        return (
            <div>
                <div id='google-map'>
                    <GoogleMap stores={this.props.stores} />
                </div>
                <div className='search-result-label'>Search Result:</div>
                <div>
                    {storeList}  
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState){
    return {
        stores: reduxState.searchReducer.stores
    }
}

export default connect(mapStateToProps, {}) (SearchResult);