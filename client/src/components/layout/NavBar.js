import React from 'react';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const NavBar = ({ isAuthenticated, logout }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <a className='navbar-brand' href='/'>
        <img
          src='https://i.ibb.co/9WVtJXL/Comics-Seven-Stories-removebg-preview.png'
          width='96'
          height='40'
          alt=''
        />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='/'>
              Home <span className='sr-only'>(current)</span>
            </a>
          </li>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='/'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Genres
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <a className='dropdown-item' href='/genre/action'>
                Action
              </a>
              <a className='dropdown-item' href='/genre/mystery'>
                Mystery
              </a>
              <a className='dropdown-item' href='/genre/adventure'>
                Adventure
              </a>
              <a className='dropdown-item' href='/genre/school-life'>
                School Life
              </a>
              <a className='dropdown-item' href='/genre/comedy'>
                Comedy
              </a>
              <a className='dropdown-item' href='/genre/romance'>
                Romance
              </a>
              <a className='dropdown-item' href='/genre/sports'>
                Sports
              </a>
            </div>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/hot-comics'>
              Hot Manga
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/completed-comics'>
              Completed Manga
            </a>
          </li>
        </ul>
        <form
          className='form-inline my-2 my-lg-0'
          method='get'
          action='/search'
        >
          <input
            className='form-control mr-sm-2'
            type='search'
            name='search'
            placeholder='Enter your keywords...'
            aria-label='Search'
          />
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
          >
            Search
          </button>
        </form>
        {isAuthenticated ? (
          <div>
            <a
              className='btn btn-outline-success ml-2 my-sm-0'
              href='/logout'
              role='button'
              onClick={() => logout()}
            >
              Logout
            </a>
          </div>
        ) : (
          <div>
            <a
              className='btn btn-outline-success ml-2 my-sm-0'
              href='/register'
              role='button'
            >
              Register
            </a>
            <a
              className='btn btn-outline-success ml-2 my-sm-0'
              href='/login'
              role='button'
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(NavBar);
