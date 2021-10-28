import configureStore from './store/configureStore';
import { loadBugs, addBug, assignBug, resolveBug } from './store/bugs';
import { loadMembers, addMember } from './store/members';

// Configure store
const store = configureStore();

// Initial load
store.dispatch(loadBugs());
store.dispatch(loadMembers());

// Bugs actions
// store.dispatch(addBug({ description: 'New bug' }));
// store.dispatch(assignBug(4, 2));
// store.dispatch(resolveBug(4));

// Members actions
// store.dispatch(addMember({ fullName: 'Settar Settarov' }));

// Dispatch destructuring function
// store.dispatch((dispatch, getState) => {
//   dispatch({ type: 'bugsRecieved', bugs: [1, 2, 3] });
//   console.log(getState());
// });

// Tost middleware
// store.dispatch({
//   type: 'error',
//   payload: { message: 'An error occurred.' },
// });
