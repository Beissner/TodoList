import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Modal } from 'antd';


import './headerStyles.scss';
import { toggleModal } from '../../../redux/actions/modalActions';

const Header = ({ logoutUser, deleteAccount }) => {

    const [showModal, toggleAlertModal] = useState(false);

    const onConfirmDelete = () => {
        toggleAlertModal(false);
        deleteAccount();
    };
    const menu = (
        <Menu style={{marginTop: '10px', backgroundColor: '#282828'}}>
          <Menu.Item className='item' onClick={() => logoutUser()}>
                <i className="fas fa-sign-out-alt"></i>
                <span style={{ color: '#fff', opacity: 0.8}}>Logout</span>
          </Menu.Item>
          
          <Menu.Item className='item' onClick={() => toggleAlertModal(true)}>
                <i className="fas fa-user-times"></i>
                <span style={{ color: 'red', opacity: 0.8}}>Delete account</span>
          </Menu.Item>
        </Menu>
      );

    return (
        <div className='header-container'>
            <Modal
            visible={showModal}
            onOk={deleteAccount}
            onCancel={() => toggleAlertModal(false)}
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
            <p>Danger Zone!</p>
            <p>Are you sure you want to delete your account?</p>
            <button key="back" onClick={() => toggleAlertModal(false)} className='cancel-btn'>
                Cancel
            </button>
            <button key="submit" type="primary" onClick={onConfirmDelete} className='delete-btn'>
                Delete
            </button>
        </Modal>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" >
                <i onClick={e => e.preventDefault()} className="fas fa-cog"></i>
            </Dropdown>
        </div>
    );
};

export default Header;