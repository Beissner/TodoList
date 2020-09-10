import { FETCH_TASKS, ADD_TASK, SELECTED_TASK, DELETE_TASK, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {
    taskList: [],
    selectedTask: null
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCH_TASKS:
            return { ...state, taskList: payload };
        case ADD_TASK:
            return { ...state, taskList: [...state.taskList, payload] };
        case SELECTED_TASK:
            return { ...state, selectedTask: payload };
        case DELETE_TASK:
            const updatedList = state.taskList.filter(item => item._id !== payload._id);
            return { ...state, taskList: updatedList };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
};
