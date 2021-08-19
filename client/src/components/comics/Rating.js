import React from 'react';
import './Rating.css';
import { connect } from 'react-redux';
import { rating } from '../../actions/comment';

const Rating = ({ id, rating }) => {
  return (
    <form className='rating'>
      <div>
        <label>
          <input
            type='radio'
            name='stars'
            value='1'
            onClick={() => {
              rating(id, 1);
            }}
          />
          <span class='icon'>★</span>
        </label>
        <label>
          <input
            type='radio'
            name='stars'
            value='2'
            onClick={() => {
              rating(id, 2);
            }}
          />
          <span class='icon'>★</span>
          <span class='icon'>★</span>
        </label>
        <label>
          <input
            type='radio'
            name='stars'
            value='3'
            onClick={() => {
              rating(id, 3);
            }}
          />
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
        </label>
        <label>
          <input
            type='radio'
            name='stars'
            value='4'
            onClick={() => {
              rating(id, 4);
            }}
          />
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
        </label>
        <label>
          <input
            type='radio'
            name='stars'
            value='5'
            onClick={() => {
              rating(id, 5);
            }}
          />
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
          <span class='icon'>★</span>
        </label>
      </div>
    </form>
  );
};

export default connect(null, { rating })(Rating);
