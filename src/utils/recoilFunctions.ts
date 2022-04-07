import axios from 'axios';
import type { ISigning } from '../interfaces/signing/types';
import { signingState, loadingState } from '../recoil/signings/atoms/atoms';
import { useRecoilState } from 'recoil';

export const addSigning = async (signing: ISigning | undefined) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/signings', signing, options);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteSigning = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/signings/${id}`);
  } catch (err: any) {
    console.error(err.message);
  }
};
