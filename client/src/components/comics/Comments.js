import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addComment,
  getComment,
  likeComment,
  dislikeComment,
  deleteComment,
  deleteReply,
  replyComment,
} from '../../actions/comment';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Comments = ({
  id,
  auth,
  addComment,
  getComment,
  likeComment,
  dislikeComment,
  deleteComment,
  replyComment,
  deleteReply,
  comment,
}) => {
  const [formData, setFormData] = useState('');
  const [formData1, setFormData1] = useState({});
  useEffect(() => {
    getComment(id);
  }, [id, getComment]);
  return (
    <div>
      <hr
        style={{
          borderWidth: '0.2rem',
          width: '90%',
          backgroundColor: 'black',
        }}
      />
      <form
        style={{ width: '85%', margin: '1rem auto 1rem' }} //
        onSubmit={(e) => {
          if (!auth.isAuthenticated) {
            window.location.href = '/login';
          }
          e.preventDefault();
          addComment(id, formData);
          setFormData('');
        }}
      >
        <div class='form-group'>
          <label for='exampleFormControlTextarea1' style={{ color: 'red' }}>
            <b>COMMENT SECTION</b>
          </label>
          <textarea
            class='form-control'
            id='exampleFormControlTextarea1'
            name='formData'
            value={formData}
            rows='3'
            onChange={(e) => {
              setFormData(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          type='submit'
          class='btn btn-outline-dark'
          style={{ display: 'block', margin: '0.4rem 0 0.4rem auto' }}
        >
          Comment
        </button>
      </form>
      <div>
        {comment &&
          comment.comments.map((singleComment, index) => {
            return (
              <section class='container'>
                <div class='comments container'>
                  <div
                    class='post bg-white row'
                    style={{
                      border: 'solid 1px',
                      borderRadius: '0.5rem',
                      marginBottom: '0.4rem',
                      paddingTop: '0.4rem',
                      paddingBottom: '0.1rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div className='col-3' style={{ textAlign: 'center' }}>
                      <img
                        class='round-img rounded-circle'
                        width='50px'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Blogger.svg/1200px-Blogger.svg.png'
                        alt=''
                      />
                      <p style={{ wordWrap: 'break-word' }}>
                        {singleComment.username}
                      </p>
                    </div>
                    <div className='col-9'>
                      <p style={{ wordWrap: 'break-word', marginBottom: '0' }}>
                        {singleComment.comment}
                      </p>
                      <button
                        type='button'
                        class='btn btn-outline-dark'
                        onClick={() => {
                          likeComment(id, singleComment._id);
                        }}
                      >
                        <i class='far fa-thumbs-up'></i>{' '}
                        {singleComment.likes.length}
                      </button>
                      <button
                        type='button'
                        class='btn btn-outline-dark'
                        onClick={() => {
                          dislikeComment(id, singleComment._id);
                        }}
                      >
                        <i class='far fa-thumbs-down'></i>{' '}
                        {singleComment.dislikes.length}
                      </button>
                      <button
                        type='button'
                        class='btn btn-outline-dark'
                        onClick={() => {
                          var elem = document.getElementById(index);
                          if (elem.style.display === 'none') {
                            elem.style.display = 'block';
                          } else {
                            elem.style.display = 'none';
                          }
                        }}
                      >
                        <i class='fas fa-reply'></i> Reply
                      </button>

                      {auth.user && auth.user._id === singleComment.user && (
                        <button
                          type='button'
                          class='btn btn-outline-dark'
                          onClick={() => {
                            deleteComment(id, singleComment._id);
                          }}
                        >
                          <i class='fas fa-trash-alt'></i> Delete Comment
                        </button>
                      )}

                      <p class='post-date' style={{ marginBottom: '0.1rem' }}>
                        Posted on{' '}
                        <Moment format='hh:mm DD/MM/YYYY'>
                          {singleComment.date}
                        </Moment>
                      </p>
                    </div>
                  </div>
                  {singleComment.reply.map((singleRep) => {
                    return (
                      <div
                        class='row'
                        style={{
                          width: '80%',
                          margin: '0 0 0 auto',
                          border: 'solid 1px',
                          borderRadius: '0.5rem',
                          paddingTop: '0.4rem',
                          marginBottom: '0.4rem',
                          fontSize: '0.75rem',
                        }}
                      >
                        <div className='col-4' style={{ textAlign: 'center' }}>
                          <img
                            class='round-img rounded-circle'
                            width='30px'
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Blogger.svg/1200px-Blogger.svg.png'
                            alt=''
                          />
                          <p
                            style={{
                              wordWrap: 'break-word',
                              marginBottom: '0',
                            }}
                          >
                            {singleRep.username}
                          </p>
                        </div>
                        <div className='col-8'>
                          <p
                            style={{
                              wordWrap: 'break-word',
                              marginBottom: '0',
                            }}
                          >
                            {singleRep.comment}
                          </p>
                          <p className='post-date'>
                            Reply on
                            <Moment format='hh:mm DD/MM/YYYY'>
                              {singleRep.date}
                            </Moment>
                          </p>
                        </div>
                        {auth.user && auth.user._id === singleRep.user && (
                          <button
                            type='button'
                            class='btn btn-outline-dark'
                            style={{ margin: '0.1rem 10% 0.1rem auto' }}
                            onClick={() => {
                              deleteReply(id, singleComment._id, singleRep._id);
                            }}
                          >
                            <i class='far fa-trash-alt'></i>Delete this reply
                          </button>
                        )}
                      </div>
                    );
                  })}
                  <div
                    id={index}
                    style={{
                      margin: '0 0 0 auto',
                      width: '80%',
                      display: 'none',
                    }}
                  >
                    <form
                      style={{ display: 'inline' }}
                      onSubmit={(e) => {
                        if (!auth.isAuthenticated) {
                          window.location.href = '/login';
                        }
                        e.preventDefault();
                        console.log(formData1['formData' + index.toString()]);
                        replyComment(
                          id,
                          singleComment._id,
                          formData1['formData' + index.toString()]
                        );
                      }}
                    >
                      <textarea
                        class='form-control'
                        name={'formData' + index.toString()}
                        value={formData1['formData' + index.toString()]}
                        onChange={(e) => {
                          setFormData1({
                            ...formData1,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        rows='3'
                      ></textarea>
                      <button
                        type='submit'
                        style={{
                          display: 'block',
                          margin: '0.1rem 0 0.1rem auto',
                        }}
                        class='btn btn-outline-dark'
                      >
                        Comment
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
};

Comments.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  deleteReply: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comment: state.comment,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addComment,
  getComment,
  likeComment,
  dislikeComment,
  deleteComment,
  replyComment,
  deleteReply,
})(Comments);
