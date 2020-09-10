import { 
    IS_LOADING, 
    LOGIN_ERROR, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT_USER 
} from '../actions/types';

const INITIAL_STATE = {
    isAuthenticated: false,
    loading: false,
    errorMsg: '',
    token: null,
    user: null
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;

    switch (type) {
        case IS_LOADING:
            return { ...state, loading: payload };
        case LOGIN_ERROR:
            return { ...state, errorMsg: payload };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return { ...state, isAuthenticated: true, loading: false, user: payload, token: payload.token };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return { ...state, loading: false, token: null, errorMsg: payload };
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return { ...state, isAuthenticated: false, errorMsg: '', token: null, user: null };
        default:
            return state;
    }
};
