import React, { useState } from 'react';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    window.location = '/';
  }
  return (
    <div style={{ width: '80%', margin: '2rem auto 2rem' }}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Email Address</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={email}
            aria-describedby='emailHelp'
            placeholder='Enter Your Email'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={password}
            id='exampleInputPassword'
            placeholder='Password'
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>{' '}
        <p style={{ display: 'inline' }}>Don't have an account ?</p>{' '}
        <a href='/register'>Sign Up</a>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
