import { createSlice } from '@reduxjs/toolkit';
import { bugsRequestFailed } from './bugs';

// Slice
const slice = createSlice({
  name: 'errors',
  initialState: [],
  reducers: {},

  // Extra reducers from another slice
  extraReducers: {
    [bugsRequestFailed]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default slice.reducer;
