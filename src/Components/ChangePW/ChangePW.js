import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { getUser, changePassword } from '../../redux/reducers/customerReducer';
import { getUser } from '../../redux/reducers/customerReducer';
import './ChangePW.css';
class ChangePW extends Component {
    constructor() {
        super();
        this.state = {
            oldpw: '',
            newpw: '',
            confirmpw: '',
            errMsg: '',
            inputStyle: 'right-input'
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleUserInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, function () {
            if (this.state.newpw !== this.state.confirmpw) {
                this.setState({
                    errMsg: 'Please confirm your password!',
                    inputStyle: 'wrong-input'
                })
            } else {
                this.setState({
                    errMsg: '',
                    inputStyle: 'right-input'
                })
            }
        });
    }

    changePassword() {
        const { oldpw, newpw, confirmpw } = this.state;
        if (newpw !== confirmpw) {
            return false;
        }
        const customer = {
            email: this.props.email,
            oldPassword: oldpw,
            newPassword: newpw
        }
        axios.post('/auth/changepassword', customer).then(() => {
            alert('Password changed successfully!');
            this.props.history.push('/dashboard');
        }).catch(() => {
            this.setState({
                errMsg: 'Old password incorrect!'
            });
        })

        // this.props.changePassword(this.props.email, oldpw, newpw);
        // if (this.props.loading === false && this.props.errorMsg === '') {
        //     this.props.history.push('/dashboard');
        // }else{
        //     this.setState({
        //         errMsg: 'Old password incorrect!'
        //     });
        // }
    }

    render() {
        return (
            <div>
                <div className='change-title-wrapper'>
                    <h1 className='change-title'>Change Password</h1>
                </div>
                <div className='change-form'>
                    <div className='change-title-label'>Old password</div>
                    <input className={this.state.inputStyle} name='oldpw' type='password' onChange={this.handleUserInput} />
                    <div className='change-title-label'>New password</div>
                    <input className={this.state.inputStyle} name='newpw' type='password' onChange={this.handleUserInput} />
                    <div className='change-title-label'>Confirm new password</div>
                    <input className={this.state.inputStyle} name='confirmpw' type='password' onChange={this.handleUserInput} />
                    <div className='err-msg'>{this.state.errMsg}</div>
                </div>
                <button onClick={() => { this.changePassword() }}>Change Password</button>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        customer_id: reduxState.customerReducer.customer_id,
        email: reduxState.customerReducer.email,
        errorMsg: reduxState.customerReducer.errorMsg
    }
}

// export default connect(mapStateToProps, { getUser, changePassword })(ChangePW);
export default connect(mapStateToProps, { getUser })(ChangePW);