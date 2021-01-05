import axios from 'axios';

import { IS_LOADING, FETCH_TASKS, ADD_TASK, SELECTED_TASK, TOGGLE_MODAL, DELETE_TASK } from './types';


// register new user and login
export const getTasks = (token, projectTitle) => async dispatch => {

    dispatch({ type: IS_LOADING, payload: true });

    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        const res = await axios.get(`/api/tasks/mytasks/${projectTitle}`, config);

        const taskArray = Object.values(res.data);
        dispatch({ type: FETCH_TASKS, payload: taskArray });

    } catch (e) {
        console.error('Failed to get tasks', e);
    }
};

// fetch tasks for logged in user
export const addTask = (token, task, projectTitle) => async dispatch => {
    const taskBody = {
        description: task,
        project: projectTitle
    };

    const JSON_Body = JSON.stringify(taskBody);

    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        const res = await axios.post('/api/tasks/addTask', JSON_Body, config);
        dispatch({ type: ADD_TASK, payload: res.data });

    } catch (e) {
        console.error('Failed to add task', e);
    }
};

// set selected task object
export const setSelectedTask = (task) => ({ type: SELECTED_TASK, payload: task });

// delete task
export const deleteTask = (token, task) => async dispatch => {

    dispatch({ type: TOGGLE_MODAL, payload: false });
    const taskId = task._id;
    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        await axios.delete(`/api/tasks/delete/${taskId}`, config);
        dispatch({ type: DELETE_TASK, payload: task });
    } catch (e) {
        console.error('Failed to delete task', e);
    }
};

//  update task
export const updateTask = (token, task) => async dispatch => {

    const taskId = task._id;
    const taskBody = {
        description: task.description,
        completed: task.completed
    };

    const JSON_Body = JSON.stringify(taskBody);

    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        await axios.patch(`/api/tasks/update/${taskId}`, JSON_Body, config);
        //dispatch({ type: UPDATE_TASK, payload: task });
    } catch (e) {
        console.error('Failed to update task', e);
    }
};