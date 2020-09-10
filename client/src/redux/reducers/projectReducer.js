import { ADD_PROJECT, FETCH_PROJECTS, SET_PROJECT, DELETE_PROJECT } from '../actions/types';

const INITIAL_STATE = {
    projectList: [],
    selectedProject: {title: 'Inbox'}    // default
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_PROJECT:
            return { ...state, projectList: [...state.projectList, payload], selectedProject: payload.title };
        case FETCH_PROJECTS:
            return { ...state, projectList: payload };
        case SET_PROJECT: 
            return { ...state, selectedProject: payload };
        case DELETE_PROJECT: 
            const list = state.projectList;
            const filteredProjectList = list.filter(project => project._id != payload._id);
            return { ...state, projectList: filteredProjectList };
        default:
            return state;
    }
};
