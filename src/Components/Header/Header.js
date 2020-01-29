import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/customerReducer';
import { Link } from 'react-router-dom'
import './Header.css';
class Header extends Component {
    constructor() {
        super();
        this.state = {
            menuStatus: "menu-status"
        }
    }

    handleMenu() {
        if (this.state.menuStatus === "menu-status-open") {
            this.setState({
                menuStatus: "menu-status-close"
            });
        } else {
            this.setState({
                menuStatus: "menu-status-open"
            });
        }
    }

    render() {
        return (
            <header>
                <ul onClick={() => { this.handleMenu() }} className={this.state.menuStatus}>
                    <li className='menu-list-mobile'><Link to='/dashboard' >Home</Link></li>
                    <li className='menu-list-mobile'><Link to='/dashboard/orderlist' >Your Order</Link></li>
                    <li className='menu-list-mobile'><Link to='/dashboard/changepw'>Change password</Link></li>
                    <li className='menu-list-mobile'><Link to='/dashboard/about'>About Jiabon</Link></li>
                    <li className='menu-list-mobile' onClick={this.props.logout}>Logout</li>
                </ul>
                <div className='header'>
                    <nav className='nav'>
                        <button className='menu-btn' onClick={() => { this.handleMenu() }}>☰</button>
                        <span className='welcome'>Welcome {this.props.username}!</span>
                        <span className='dummy'></span>
                    </nav>
                </div>
            </header>
        )
    }
}

const mapStateToProps = function (reduxState) {

    return {
        customer_id: reduxState.customerReducer.customer_id,
        username: reduxState.customerReducer.username
    }
}

export default connect(mapStateToProps, { logout })(Header);