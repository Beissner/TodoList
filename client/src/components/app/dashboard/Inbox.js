import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
/*      Components      */
import AddTaskView from '../../common/AddTask';
import Task from '../../common/Task';

/*      Redux Actions       */
import { toggleModal } from '../../../redux/actions/modalActions';
import { setSelectedTask, deleteTask, getTasks } from '../../../redux/actions/taskActions';

/*      Styles      */
import './InboxStyles.scss';


const Inbox = ({ token, taskList, toggleModal, isOpen, setSelectedTask, selectedTask, deleteTask, getTasks, selectedProject }) => {

    useEffect(() => {
        getTasks(token, selectedProject.title);
    }, [selectedProject]);

    const renderList = () => {
        const taskArray = Object.values(taskList);
        return taskArray.map(item => {
           
            return <Task task={item} toggleModal={toggleModal} setSelectedTask={setSelectedTask} key={item._id} token={token} />;
            
        });
    };

    const onDelete = () => {
        deleteTask(token, selectedTask);
    };

    return (
        <div className='task-root'>
            <Modal
                visible={isOpen}
                onOk={onDelete}
                onCancel={() => toggleModal(false)}
                bodyStyle={{
                    color: '#fff',
                    backgroundColor: '#000',
                    borderStyle: 'solid',
                    borderWidth: '5px',
                    borderColor: '#000',
                    opacity: 0.8,
                }}
                footer={null}
            >
                <p>Are you sure you want to delete this task?</p>
                <p className='selectedTaskTxt'>{selectedTask !== null && selectedTask.description}</p>
                <button key="back" onClick={() => toggleModal(false)} className='cancel-btn'>
                    Cancel
                </button>
                <button key="submit" type="primary" onClick={onDelete} className='delete-btn'>
                    Delete
                </button>
            </Modal>
           
            <div className='inbox-container'>
                <div className='section-title'>{selectedProject.title}</div>
                {taskList !== null && renderList()}

                <AddTaskView />
            </div>
        
        </div>
    );
};

const mapStateToProps = reduxState => ({
    taskList: reduxState.task.taskList,
    isOpen: reduxState.modal.isOpen,
    selectedTask: reduxState.task.selectedTask,
    token: reduxState.auth.token,
    selectedProject: reduxState.project.selectedProject
});

export default connect(mapStateToProps, { toggleModal, setSelectedTask, deleteTask, getTasks })(Inbox);
