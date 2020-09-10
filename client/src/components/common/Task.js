import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'antd';
import { Col, Input } from 'antd';

/*      Styles      */
import './taskStyles.scss';

/*      Redux Action        */
import { updateTask } from '../../redux/actions/taskActions';

const Task = ({ task, toggleModal, setSelectedTask, updateTask, token }) => {

    const { TextArea } = Input;
    const [updatedTask, changeTask] = useState(task.description);
    const [showTask, toggleView] = useState(true);
    const [taskState, updateTaskState] = useState(task);

    const onChange = (e) => {
        changeTask(e.target.value);
    };

    const onEdit = () => {
        toggleView(false);
    };

    const onSave = () => {
        updateTaskState({ ...taskState, description: updatedTask });
        task.description = updatedTask; 
        updateTask(token, task);
        toggleView(true);
    };

    const onDelete = () => {
        toggleModal(true);
        setSelectedTask(task);
    };

    const onCompleted = () => {
        updateTaskState({ ...taskState, completed: true });
        task.completed = true;  
        updateTask(token, task);
    };

    const renderTask = () => {  
       if(taskState.completed === false) {
            return <Row className='task-row' key={task._id}>
                        <i onClick={onCompleted} className='far fa-circle'></i>
                        <div className='task-description'>{task.description}</div>
                        <i onClick={onEdit} className="far fa-edit"></i>
                        <i onClick={onDelete} className="far fa-trash-alt"></i>
                    </Row>;
       }
       return null;
    };

    const editTask = () => <Col>
        <TextArea
            value={updatedTask}
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
            <button className='add-btn' onClick={onSave}>Save</button>
            <button className='cancel-btn' onClick={() => toggleView(true)}>Cancel</button>
        </Row>
    </Col>;

    return (showTask ? renderTask() : editTask());
};

export default connect(null, { updateTask })(Task);
