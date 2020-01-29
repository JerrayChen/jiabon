import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, login } from '../../redux/reducers/customerReducer';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
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
        if(this.props.customer_id ){
            return (<Redirect to='/dashboard' />)
        }
        // no session, needs to login.
        return (
            <div>
                <div className='title'>
                    <img className='logo' src={process.env.PUBLIC_URL + '/jiabon.png'} alt='logo' />
                    <h1>Jiabon</h1>
                </div>
                <div className='login-form'>
                    <span className='login-label'>Login</span>
                    <div className='login-title-label'>Email</div>
                    <input className='login-input' name='email' type='email' onChange={this.handleUserInput} />
                    <div className='login-title-label'>Password</div>
                    <input className='login-input' name='password' type='password' onChange={this.handleUserInput} />
                    <div className='err-msg'>{this.props.errorMsg}</div>
                </div>
                <button onClick={()=>{this.props.login(this.state.email,this.state.password)}}>Login</button>
                <div className='register-msg'>Don't have an account yet? <Link to='/register'><label className='register-link'>Register</label></Link> now!</div>
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

export default connect(mapStateToProps, { getUser, login })(Login);