import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

//
import { apiCallBegan } from './api';

// Slice
const slice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    membersRequested: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    membersRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    membersRecieved: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    memberAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default slice.reducer;

// Action creators
const { membersRequested, membersRequestFailed, membersRecieved, memberAdded } =
  slice.actions;

const url = '/members';

export const loadMembers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.members;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 2) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: membersRequested.type,
      onError: membersRequestFailed.type,
      onSuccess: membersRecieved.type,
    })
  );
};

export const addMember = (member) =>
  apiCallBegan({
    url,
    method: 'post',
    data: { bugs: [], ...member },
    onSuccess: memberAdded.type,
  });
