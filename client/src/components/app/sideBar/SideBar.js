import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';

/*      Styles      */
import './sideBarStyles.scss';

/*      Redux Actions       */
import { getProjects, addProject, setProject, deleteProject } from '../../../redux/actions/projectActions';

/*      Child Components        */
import { AddProjectModal } from './AddProjectModal';
import { DeleteProjectModal } from './DeleteProjectModal';


const SideBar = ({ getProjects, addProject, setProject, deleteProject, projectList, token }) => {

    useEffect(() => {
        getProjects(token);
    }, []);

    const [showAddProjectModal, toggleAddProjectModal] = useState(false);
    const [showDeleteProjectModal, toggleDeleteProjectModal] = useState(false);
    const [projectToDelete, updateProjectToDelete] = useState();

    const onAddProject = (title) => {
        toggleAddProjectModal(false);
        addProject(token, title);
    };

    const onDelete = () => {
        toggleDeleteProjectModal(false);
        deleteProject(token, projectToDelete);
    };

    const onDeleteClick = (project) => {
        toggleDeleteProjectModal(true);
        updateProjectToDelete(project);
    };

    const onProjectClick = (project) => {
        setProject(project);
    };

    const renderProjects = () => {
        if (projectList) {
            return projectList.map(project => <div className='project-title-row' key={project._id}>
                <div onClick={() => onProjectClick(project)} className='project-title'>{project.title}</div>
                <i onClick={() => onDeleteClick(project)} className="far fa-trash-alt"></i>
                </div>);
        }
        return null;
    };


    return (
            <Col className='side-bar-container'>
                <AddProjectModal onAddProject={onAddProject} toggleAddProjectModal={toggleAddProjectModal} showAddProjectModal={showAddProjectModal}/>
                <DeleteProjectModal onDelete={onDelete} toggleDeleteProjectModal={toggleDeleteProjectModal} showDeleteProjectModal={showDeleteProjectModal} projectToDelete={projectToDelete}/>
                <Row onClick={() => setProject({title: 'Inbox'})} className='side-bar-row'>
                    <i className="fas fa-inbox"></i>
                    <div>Inbox</div>
                </Row>
                <Row className='side-bar-project'>
                    <div>Projects</div>
                    <i onClick={()=> toggleAddProjectModal(true)} className="fas fa-plus-circle"></i>
                </Row>
                {renderProjects()}  
            </Col>
    );
};

const mapStateToProps = reduxState => ({
    isAuthenticated: reduxState.auth.isAuthenticated,
    token: reduxState.auth.token,
    projectList: reduxState.project.projectList,
   
});

export default connect(mapStateToProps, {addProject, getProjects, setProject, deleteProject})(SideBar);
