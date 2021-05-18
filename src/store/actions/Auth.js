import axios from 'axios';
import * as actionTypes from './actionType';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authRedirect = () => {
    return {
        type: actionTypes.AUTH_REDIRECT
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const auth = (email,password,signup) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbEZ_0N3ZyWYK4mqBUZU8Ee7mc9hLphLo';
        if(!signup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbEZ_0N3ZyWYK4mqBUZU8Ee7mc9hLphLo';
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url,authData)
        .then(response => {
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            //console.log(response.data);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const authStateCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            console.log(userId);
            console.log(token);
            dispatch(authSuccess(token,userId));
        }
    }
}