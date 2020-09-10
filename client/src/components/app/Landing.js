import React from 'react';
import { Row } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/*      Child Components        */
import SideBar from './sideBar/SideBar';
import Inbox from './dashboard/Inbox';
import Header from './header/Header';

/*      REDUX ACTIONS       */
import { logoutUser, deleteAccount } from '../../redux/actions/authActions';


/*      Styles      */
import './LandingStyles.scss';

const Landing = ({ isAuthenticated, logoutUser, token, deleteAccount, user }) => {

    const onDeleteAccount = () => {
        deleteAccount(token, user.user._id);
    };

    const onLogout = () => {
        logoutUser(token);
    };

    if (!isAuthenticated) return <Redirect to='/' />;

    return (
        <div className='home-container'>
            <Header logoutUser={onLogout} deleteAccount={onDeleteAccount}/>
            <Row className='home-row'>
 
                <SideBar />
                <Inbox />
            
            </Row>
        </div>
    );
};

const mapStateToProps = reduxState => ({
    isAuthenticated: reduxState.auth.isAuthenticated,
    token: reduxState.auth.token,
    user: reduxState.auth.user,
    isOpen: reduxState.modal.isOpen, 
});

export default connect(mapStateToProps, { logoutUser, deleteAccount })(Landing);
