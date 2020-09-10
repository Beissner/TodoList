import axios from 'axios';

import { IS_LOADING, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER } from './types';

// set error messages on login/register page
export const setMsg = (msg) => ({ type: LOGIN_ERROR, payload: msg });

// register new user and login
export const registerUser = ({ name, email, password }) => async dispatch => {

    dispatch({ type: IS_LOADING, payload: true });

    //register user
    const newUser = {
        name,
        email,
        password
    };

    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/users/register', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    } catch (e) {
        console.error('Unable to register user', e);
        dispatch({ type: REGISTER_FAIL, payload: 'Unable to register user' });
    }
};

// login user 
export const loginUser = (email, password) => async dispatch => {

    const user = {
        email,
        password
    };

    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify(user);
        const res = await axios.post('/users/login', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (e) {
        console.error('Unable to login user', e);
        dispatch({ type: LOGIN_FAIL, payload: 'Unable to login user' });
    }

};

// logout user
export const logoutUser = (token) => async dispatch => {
    try {
        const config = { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } };
        await axios.get('/users/logout', config);
        dispatch({ type: LOGOUT_USER });
    } catch (e) {
        console.error('Unable to logout user', e);
    }
};

// delete user account
export const deleteAccount = (token) => async dispatch => {
  
    try {
        const config = { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } };
        await axios.delete('/users/delete', config);
        dispatch({ type: LOGOUT_USER });
    } catch (e) {
        console.error('Unable to delete user', e);
    }
};