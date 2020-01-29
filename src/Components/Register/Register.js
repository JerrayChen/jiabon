import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, getUser } from '../../redux/reducers/customerReducer';
import { Link, Redirect } from 'react-router-dom';
import './Register.css';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            errorMsg: ''
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleUserInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // already has session, redirect to dashboard.
        if (this.props.customer_id) {
            return (<Redirect to='/dashboard' />)
        }
        // no session, needs to login.
        return (
            <div>
                <div className='reg-title-wrapper'>
                    <h1 className='reg-title'>Register</h1>
                </div>
                <div className='register-form'>
                    <div className='login-title-label'>Username</div>
                    <input className='login-input' name='username' onChange={this.handleUserInput} />
                    <div className='login-title-label'>Email</div>
                    <input className='login-input' name='email' onChange={this.handleUserInput} />
                    <div className='login-title-label'>Password</div>
                    <input className='login-input' name='password' type='password' onChange={this.handleUserInput} />
                    <div className='reg-err-msg'>{this.props.errorMsg}</div>
                </div>
                <button onClick={()=>{this.props.register(this.state.username,this.state.email,this.state.password)}} >Register</button>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        customer_id: reduxState.customerReducer.customer_id,
        errorMsg: reduxState.customerReducer.errorMsg
    }
}

export default connect(mapStateToProps, { getUser, register })(Register);