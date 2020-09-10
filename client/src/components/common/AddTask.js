import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input } from 'antd';

/*      Redux Actions       */
import { addTask } from '../../redux/actions/taskActions';

import './taskStyles.scss';

const AddTaskView = ({ token, addTask, selectedProject }) => {
    const { TextArea } = Input;

    const [task, setTask] = useState('');
    const [showCreateTask, toggleView] = useState(false);

    const onChange = (e) => {
        setTask(e.target.value);
    };

    const onAddTask = () => {
        addTask(token, task, selectedProject.title);
        setTask('');
        toggleView(false);
    };

    const createTaskView = () => {
        return (
            <Col>
                <TextArea
                    value={task}
                    onChange={e => onChange(e)}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    style={{
                        color: '#fff',
                        backgroundColor: '#171717',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '5px',
                        opacity: '0.9',

                    }}
                />

                <Row>
                    <button className='add-btn' onClick={onAddTask}>Add Task</button>
                    <button className='cancel-btn' onClick={() => toggleView(false)}>Cancel</button>
                </Row>
            </Col>
        );
    };

    const addTaskView = () => <Row className='add-task-row' onClick={() => toggleView(true)}>
        <i className="fas fa-plus"></i>
        <div className='add-task'>Add task</div>
    </Row>;

    return (showCreateTask ? createTaskView() : addTaskView());
};

const mapStateToProps = reduxState => ({
    token: reduxState.auth.token,
    selectedProject: reduxState.project.selectedProject
});

export default connect(mapStateToProps, { addTask })(AddTaskView);