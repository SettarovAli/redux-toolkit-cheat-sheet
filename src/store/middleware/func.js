const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    if (typeof action === 'function') {
      action(dispatch, getState);
    } else {
      next(action);
    }
  };

export default func;
