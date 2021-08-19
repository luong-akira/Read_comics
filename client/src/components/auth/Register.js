import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password1: '',
  });

  const { username, email, password, password1 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== password1) {
      console.log('Password is not match!');
      setAlert("Password doesn't match", 'danger');
    } else {
      register(username, email, password);
    }
  };

  if (isAuthenticated) {
    window.location = '/';
  }

  return (
    <div style={{ width: '80%', margin: '2rem auto 2rem' }}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Full Name</label>
          <input
            type='name'
            name='username'
            value={username}
            className='form-control'
            id='exampleInputEmail1'
            placeholder='Enter Your Full Name'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            className='form-control'
            id='exampleInputEmail1'
            placeholder='Enter Your Email'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            className='form-control'
            id='exampleInputPassword'
            placeholder='Password'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            name='password1'
            value={password1}
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign up
        </button>{' '}
        <p style={{ display: 'inline' }}>Already have an account ?</p>{' '}
        <a href='/login'>Login</a>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register, setAlert })(Register);
