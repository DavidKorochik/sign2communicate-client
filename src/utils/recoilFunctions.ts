import axios from 'axios';
import type { ISigning } from '../interfaces/signing/types';
import { signingState } from '../recoil/signings/atoms/atoms';
import { useRecoilState } from 'recoil';

export const addSigning = async (signing: ISigning): Promise<void> => {
  const [_, setSigningData] = useRecoilState(signingState);

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/signings', signing, options);
    setSigningData(res.data);
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
