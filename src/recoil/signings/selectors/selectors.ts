import { selector } from 'recoil';
import axios from 'axios';

export const getSignings = selector({
  key: 'getSignings',
  get: async ({ get }) => {
    try {
      const res = await axios.get('/api/signings');
      return res.data;
    } catch (err: any) {
      console.error(err.message.data.error);
    }
  },
});
