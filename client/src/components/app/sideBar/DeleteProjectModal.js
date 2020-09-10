import React from 'react';
import { Modal } from 'antd';

/*      Styles      */
import './sideBarStyles.scss';

export const DeleteProjectModal = ({toggleDeleteProjectModal, showDeleteProjectModal, onDelete, projectToDelete}) => {
    return (
        <Modal
        visible={showDeleteProjectModal}
        onOk={() => toggleDeleteProjectModal(false)}
        onCancel={() => toggleDeleteProjectModal(false)}
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
           <div className='project-modal-container'>
                <div className='project-modal-title'>Are you sure you want to delete this project?</div>
                <div>{projectToDelete ? projectToDelete.title : ''}</div>
                <div className='project-modal-button-container'>
                    <button key="back" onClick={() => toggleDeleteProjectModal(false)} className='cancel-btn'>
                        Cancel
                    </button>
                    <button key="submit" type="primary" onClick={onDelete} className='delete-btn'>
                        Delete
                    </button>
                </div>
           
           </div>
    </Modal>
    );
};
