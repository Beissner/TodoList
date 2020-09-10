import { TOGGLE_MODAL } from '../actions/types';

const INITIAL_STATE = {
    isOpen: false,

};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;

    switch (type) {
        case TOGGLE_MODAL:
            return { ...state, isOpen: payload };
        default:
            return state;
    }
};
