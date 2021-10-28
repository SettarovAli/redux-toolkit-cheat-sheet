// Toast middleware for handling errors
const toast = (state) => (next) => (action) => {
  if (action.type === 'error') {
    console.log('toast:', action.payload.message);
  } else {
    next(action);
  }
};

export default toast;
