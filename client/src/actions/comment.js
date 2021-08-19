import {
  GET_COMMENTS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT_FAIL,
  ADD_COMMENT,
  LIKE_COMMENT,
  LIKE_COMMENT_FAIL,
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_FAIL,
  DELETE_COMMENT,
  DELETE_COMMENT_FAIL,
  REPLY_COMMENT,
  REPLY_COMMENT_FAIL,
  DELETE_REPLY,
  DELETE_REPLY_FAIL,
  RATING_SUCESS,
  RATING_FAIL,
} from './types';
import axios from 'axios';
import { loadUser } from './auth';
import { setAlert } from './alert';

//Post a comment
export const addComment = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/comic/${id}`, { comment: formData }, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.comments,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg.slice(44), 'danger'));
    }
    dispatch({
      type: ADD_COMMENT_FAIL,
    });
  }
};

//Get comments
export const getComment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/comic/${id}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data.comments,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: GET_COMMENTS_FAIL,
    });
  }
};

//like comment
export const likeComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/comic/${id}/like/${commentId}`);
    dispatch({
      type: LIKE_COMMENT,
      payload: res.data.comments,
    });
  } catch (err) {
    dispatch({
      type: LIKE_COMMENT_FAIL,
    });
  }
};

//dislike comment
export const dislikeComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/comic/${id}/dislike/${commentId}`);
    dispatch({
      type: DISLIKE_COMMENT,
      payload: res.data.comments,
    });
  } catch (err) {
    dispatch({
      type: DISLIKE_COMMENT_FAIL,
    });
  }
};

//Delete comment
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/comic/${id}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data.comments,
    });
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
    });
  }
};

//Post a reply
export const replyComment = (id, commentId, formData1) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/comic/${id}/${commentId}`,
      { comment: formData1 },
      config
    );
    dispatch({
      type: REPLY_COMMENT,
      payload: res.data.comments,
    });
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg.slice(52), 'danger'));
    }
    dispatch({
      type: REPLY_COMMENT_FAIL,
    });
  }
};

//Delete a reply
export const deleteReply = (id, commentId, replyId) => async (dispatch) => {
  try {
    const res = await axios.post(`/comic/${id}/${commentId}/${replyId}`);
    dispatch({
      type: DELETE_REPLY,
      payload: res.data.comments,
    });
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg.slice(52), 'danger'));
    }
    dispatch({
      type: DELETE_REPLY_FAIL,
    });
  }
};

//Rating a film
export const rating = (id, rateNumber) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/comic/${id}/rating`,
      { value: rateNumber },
      config
    );
    dispatch({
      type: RATING_SUCESS,
      payload: res.data.comments,
    });
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setAlert(err.response.data.msg.slice(0), 'danger'));
    }
    dispatch({
      type: RATING_FAIL,
    });
  }
};
