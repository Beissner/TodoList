import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/*          Redux Actions       */
import { registerUser, setMsg, loginUser } from '../../redux/actions/authActions';


/*  Styles   */
import './loginStyles.scss';

const Login = ({ registerUser, setMsg, errorMsg, isAuthenticated, loginUser }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const [showRegistration, toggleView] = useState(true);

    //destructure state object
    const { name, email, password, password2 } = formData;

    const onChange = e => {
        setMsg(''); //clear out error message
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onRegisterSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setMsg('passwords don\'t match!');
        } else {
            registerUser(formData);
        }
    };

    const onLoginSubmit = async e => {
        e.preventDefault();
        loginUser(email, password);
    };

    const registrationView = () => <section>
        <form onSubmit={e => onRegisterSubmit(e)} className='form-container'>
            <input
                type='text'
                placeholder='name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
                required
            />

            <input
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
            />

            <input
                type='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
            />

            <input
                type='password'
                placeholder='re-enter password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
            />
            <div>{errorMsg}</div>
            <button>register</button>
        </form>
    </section>;

    const loginView = () => <section>
        <form onSubmit={e => onLoginSubmit(e)} className='form-container'>
            <input
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
            />
            <input
                type='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
            />
            <div>{errorMsg}</div>
            <button>login</button>
        </form>
    </section>;

    if (isAuthenticated) return <Redirect to='/home' />;

    return (
        <Fragment>
            <div className='welcome-text'>Welcome to MyList!</div>
            <div className='registration-login-container'>
                <div className='title-container'>
                    <span onClick={() => toggleView(!showRegistration)} className={showRegistration ? 'title add-border' : 'title'}>Register</span>
                    <span onClick={() => toggleView(!showRegistration)} className={!showRegistration ? 'title add-border' : 'title'}>Login</span>
                </div>
                {showRegistration ? registrationView() : loginView()}
            </div>
        </Fragment>
    );
};

const mapStateToProps = reduxState => ({
    errorMsg: reduxState.auth.errorMsg,
    loading: reduxState.auth.loading,
    isAuthenticated: reduxState.auth.isAuthenticated
});

export default connect(mapStateToProps, { registerUser, loginUser, setMsg })(Login);

