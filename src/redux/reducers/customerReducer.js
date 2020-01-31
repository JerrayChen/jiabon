import axios from 'axios';
let initState = {
    customer_id: null,
    username: '',
    email: '',
    errorMsg: '',
    loading: false
}

const LOGIN_USER = 'LOGIN_USER';
const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REGISTER_USER = 'REGISTER_USER';
// const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export function register(username, email, password) {
    const customer = { username, email, password }
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', customer)
    }
}
export function login(email, password) {
    const customer = { email, password }
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', customer)
    }
}
export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/customer')
    }
}
// export function changePassword(email, oldPassword, newPassword) {
//     const customer = { email, oldPassword, newPassword }
//     return {
//         type: CHANGE_PASSWORD,
//         payload: axios.post('/auth/changepassword', customer)
//     }
// }
export function logout() {
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/logout')
    }
}

export default function reducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                customer_id: payload.data.customer_id,
                username: payload.data.username,
                email: payload.data.email,
                errorMsg: ''
            }
        case `${REGISTER_USER}_REJECTED`:
            return {
                ...state,
                errorMsg: payload.response.data
            }
        case `${LOGIN_USER}_FULFILLED`:
            return {
                ...state,
                customer_id: payload.data.customer_id,
                username: payload.data.username,
                email: payload.data.email,
                errorMsg: ''
            }
        case `${LOGIN_USER}_REJECTED`:
            return {
                ...state,
                errorMsg: payload.response.data
            }
        // case `${CHANGE_PASSWORD}_FULFILLED`:
        //     return {
        //         ...state,
        //         customer_id: payload.data.customer_id,
        //         username: payload.data.username,
        //         email: payload.data.email,
        //         loading: false
        //     }
        // case `${CHANGE_PASSWORD}_PENDING`:
        //     return {
        //         ...state,
        //         errorMsg: '',
        //         loading: true
        //     }
        // case `${CHANGE_PASSWORD}_REJECTED`:
        //     return {
        //         ...state,
        //         errorMsg: payload.response.data,
        //         loading: false
        //     }
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                customer_id: null,
                username: '',
                email: '',
                errorMsg: ''
            }
        case `${GET_USER}_FULFILLED`:
            return {
                ...state,
                customer_id: payload.data.customer_id,
                username: payload.data.username,
                email: payload.data.email,
                errorMsg: ''
            }
        case `${GET_USER}_REJECTED`:
            return {
                ...state,
                customer_id: null,
                username: '',
                email: '',
                errorMsg: ''
            }

        default:
            return state;
    }

}