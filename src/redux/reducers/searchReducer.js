import axios from 'axios';

let initState = {
    stores: []
};

const SEARCH_STORE = 'SEARCH_STORE';

export function searchStore(foodType, location, lat, lng){
    return{
        type: SEARCH_STORE,
        payload: axios.get(`/api/customer/store?zipcode=${location}&hashtag=${foodType}&lat=${lat}&lng=${lng}`)
    }
}

export default function reducer(state = initState, action){
    const {type, payload} = action;
    switch (type){
        case `${SEARCH_STORE}_FULFILLED`:
            return {
                ...state,
                stores: payload.data
            }
        default: return state;
    }
}