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
} from '../actions/types';

const initialState = {
  comments: [],
};

export default function comment(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...payload],
      };
    case LIKE_COMMENT:
    case DISLIKE_COMMENT:
    case DELETE_COMMENT:
    case ADD_COMMENT:
    case DELETE_REPLY:
    case REPLY_COMMENT:
    case RATING_SUCESS:
      return {
        ...state,
        comments: [...payload],
      };
    case LIKE_COMMENT_FAIL:
    case DISLIKE_COMMENT_FAIL:
    case GET_COMMENTS_FAIL:
    case DELETE_COMMENT_FAIL:
    case REPLY_COMMENT_FAIL:
    case DELETE_REPLY_FAIL:
    case RATING_FAIL:
    case ADD_COMMENT_FAIL:
    default:
      return state;
  }
}
