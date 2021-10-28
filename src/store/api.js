import { createAction } from '@reduxjs/toolkit';

// Action creators for API calls
export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
