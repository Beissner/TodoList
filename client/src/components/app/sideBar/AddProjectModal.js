import React, { useState } from 'react';
import { Modal } from 'antd';

/*      Styles      */
import './sideBarStyles.scss';

export const AddProjectModal = ({toggleAddProjectModal, showAddProjectModal, onAddProject}) => {

    const [projectTitle, updateProjectTitle] = useState('');

    const onChange = (e) => {
        updateProjectTitle(e.target.value);
    };

    return (
        <Modal
        visible={showAddProjectModal}
        onOk={() => toggleAddProjectModal(false)}
        onCancel={() => toggleAddProjectModal(false)}
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
                <div className='project-modal-title'>Add Project</div>
                <input
                type='text'
                placeholder='project name'
                name='title'
                value={projectTitle}
                onChange={e => onChange(e)}
                autocomplete="false"
                style={{
                    color: '#fff',
                    backgroundColor: '#171717',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    opacity: '0.9',

                }}
                />
                <div className='project-modal-button-container'>
                    <button key="back" onClick={() => toggleAddProjectModal(false)} className='cancel-btn'>
                        Cancel
                    </button>
                    <button key="submit" type="primary" onClick={() => onAddProject(projectTitle)} className='delete-btn'>
                        Add
                    </button>
                </div>
           
           </div>
     
    </Modal>
    );
};
