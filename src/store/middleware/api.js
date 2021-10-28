import axios from 'axios';

import * as actions from '../api';

// API middleware
const api =
  ({ dispatch }) =>
  (next) =>
  // Asynchronous function
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      // Go to next middleware or next action
      return next(action);
    }

    const { url, method, data, onSuccess, onError, onStart } = action.payload;

    // Start requesting
    if (onStart)
      dispatch({
        type: onStart,
      });

    // Show in redux devtools api/callBegan action
    next(action);

    try {
      const response = await axios.request({
        baseURL: 'http://localhost:3000',
        url,
        method,
        data,
      });

      // Show in redux devtools successful response from server
      dispatch(actions.apiCallSuccess(response.data));

      // Load data for reducer
      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: response.data,
        });
    } catch (error) {
      // Show in redux devtools failure from server
      dispatch(actions.apiCallFailed(error.message));

      // Load error for reducer
      if (onError)
        dispatch({
          type: onError,
          payload: error.message,
        });
    }
  };

export default api;
