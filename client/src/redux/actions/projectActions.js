import axios from 'axios';

import { ADD_PROJECT, FETCH_PROJECTS, SET_PROJECT, DELETE_PROJECT } from './types';

// fetch all projects
export const getProjects = (token) => async dispatch => {

    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        const res = await axios.get('/projects/myprojects', config);

        const projectArray = Object.values(res.data);
        dispatch({ type: FETCH_PROJECTS, payload: projectArray });

    } catch (e) {
        console.error('Failed to fetch projects', e);
    }
};


// add a new project
export const addProject = (token, projectTitle) => async dispatch => {
    const projectBody = {
        title: projectTitle
    };

    const JSON_Body = JSON.stringify(projectBody);

    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        const res = await axios.post('/projects/addProject', JSON_Body, config);
  
        dispatch({ type: ADD_PROJECT, payload: res.data });

    } catch (e) {
        console.error('Failed to add project', e);
    }
};

// set selected project
export const setProject = (title) => ({ type: SET_PROJECT, payload: title });


// delete a project
export const deleteProject = (token, project) => async dispatch => {
   
    const projectId = project._id;
    
    try {
        const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        await axios.delete(`/projects/delete/${projectId}`, config);
        dispatch({ type: DELETE_PROJECT, payload: project });
    } catch (e) {
        console.error('Failed to delete project', e);
    }
};
