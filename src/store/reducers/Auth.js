import * as actionTypes from '../actions/actionType';

const InitialState = {
    token: null,
    userId: null,
    loading: false,
    redirect: false
}

const reducer = (state = InitialState,action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return {
            ...state,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS: return {
            ...state,
            loading: false,
            token: action.token,
            userId: action.userId,
            redirect: true
        }
        case actionTypes.AUTH_REDIRECT: return {
            ...state,
            redirect: false
        }
        case actionTypes.LOGOUT: return {
            ...state,
            token: null,
            userId: null,
        }
        default: return state;
    }
}

export default reducer;