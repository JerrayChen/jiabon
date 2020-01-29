import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import './Dashboard.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import ChangePW from '../ChangePW/ChangePW';
import OrderList from '../OrderList/OrderList';
import About from '../About/About';
import SearchResult from '../SearchResult/SearchResult';
import Store from '../Store/Store';
import Order from '../Order/Order';
import OrderConfirm from '../OrderConfirm/OrderConfirm';
class Dashboard extends Component {

    render() {
        if (!this.props.customer_id) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <div className='head-menu'>
                    <Header />
                </div>
                <div className='content'>
                    <Switch>
                        <Route path={`${this.props.match.url}/confirm/:order_id`} component={OrderConfirm}></Route>
                        <Route path={`${this.props.match.url}/menu/:menu_id`} component={Order}></Route>
                        <Route path={`${this.props.match.url}/store/:store_id`} component={Store}></Route>
                        <Route path={`${this.props.match.url}/searchresult`} component={SearchResult}></Route>
                        <Route path={`${this.props.match.url}/orderlist`} component={OrderList}></Route>
                        <Route path={`${this.props.match.url}/changepw`} component={ChangePW}></Route>
                        <Route path={`${this.props.match.url}/about`} component={About}></Route>
                        <Route path={this.props.match.url} exact component={Search}></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {

    return {
        customer_id: reduxState.customerReducer.customer_id
    }
}

export default connect(mapStateToProps, {})(Dashboard);