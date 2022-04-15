import axios from 'axios';
import type { ISigning } from '../../interfaces/signing/types';

export const addSigning = async (signing: ISigning) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/signing', signing, config);
    return res.data;
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};

export const getSignings = async () => {
  try {
    const res = await axios.get('/api/signing');
    return res.data;
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};

export const deleteSigning = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/signing/${id}`);
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};
