import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import moment from 'moment';

// Action creator API call began
import { apiCallBegan } from './api';

// Slice
const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    bugsRequested: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    bugsRecieved: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bugAdded: (state, action) => {
      state.list.push(action.payload);
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
    bugAssigned: (state, action) => {
      const { id: bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === bugId);
      console.log(index);
      state.list[index].userId = userId;
    },
  },
});

export default slice.reducer;

// Action creators
const { bugAdded, bugResolved, bugAssigned, bugsRecieved, bugsRequested } =
  slice.actions;

// Export to use like extraReducer in another slice
export const { bugsRequestFailed } = slice.actions;

const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 2) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
      onSuccess: bugsRecieved.type,
    })
  );
};

// Action creator WITHOUT dispatch and getState
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onError: bugsRequestFailed.type,
//     onSuccess: bugsRecieved.type,
//   });

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: 'post',
    data: { resolved: false, userId: null, ...bug },
    onSuccess: bugAdded.type,
  });

export const assignBug = (bugId, userId) => {
  return apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssigned.type,
  });
};

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: {
      resolved: true,
    },
    onSuccess: bugResolved.type,
  });

// Selectors, Memoization
export const selectUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const selectBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

/////////////////////////////////////////////////////////////////////////////////////
// CREATE ACTION and CREATE REDUCER syntax
/////////////////////////////////////////////////////////////////////////////////////

// Action creators
// export const bugUpdated = createAction('bugUpdated');
// export const bugAdded = createAction('bugAdded');
// export const bugRemoved = createAction('bugRemoved');
// export const bugResolved = createAction('bugResolved');

// Reducers
// let lastId = 0;

// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },
//   // bugRemoved: (state, action) => {
//   //   state;
//   // },
// });

// export function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id == action.payload.id ? { ...bug, resolved: true } : bug
//       );
//     default:
//       return state;
//   }
// }

// // Action types
// const BUG_ADDED = 'bugAdded';
// const BUG_REMOVED = 'bugRemoved';
// const BUG_RESOLVED = 'bugResolved';

// // Action creators
// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });

// export const bugRemoved = (id) => ({
//   type: BUG_REMOVED,
//   payload: {
//     id,
//   },
// });

// export const bugResolved = (id) => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

// // Reducers
// let lastId = 0;

// export function reducer(state = [], action) {
//   switch (action.type) {
//     case BUG_ADDED:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case BUG_REMOVED:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case BUG_RESOLVED:
//       return state.map((bug) =>
//         bug.id == action.payload.id ? { ...bug, resolved: true } : bug
//       );
//     default:
//       return state;
//   }
// }
