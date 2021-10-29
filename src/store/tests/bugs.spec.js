import configureStore from '../configureStore';
import { addBug } from '../bugs';
import { apiCallBegan } from '../api';
import { bugAdded } from '../bugs';

// Solitary test
describe('bugsSlice', () => {
  describe('action creators', () => {
    it('addBug', () => {
      const bug = { description: 'a' };
      const result = addBug(bug);
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: '/bugs',
          method: 'post',
          data: { resolved: false, userId: null, ...bug },
          onSuccess: bugAdded.type,
        },
      };
      expect(result).toEqual(expected);
    });
  });
});

// Social test
describe('bugsSlice', () => {
  it('should handle the addBug action', async () => {
    const store = configureStore();
    const bug = { description: 'a' };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1) === 1;
  });
});
