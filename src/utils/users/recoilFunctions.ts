import axios from 'axios';
import type { IUser } from '../../interfaces/user/types';
import { authToken } from '../authToken';

export const loadUser = async () => {
  if (localStorage.getItem('auth-token')) {
    authToken(localStorage.getItem('auth-token'));
  }

  try {
    const res = await axios.get('/api/auth');
    return res.data;
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};

export const createUser = async (user: IUser): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/user', user, config);
    localStorage.setItem('auth-token', res.data);
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};

export const loginUser = async (personal_number: string): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', { personal_number }, config);
    localStorage.setItem('auth-token', res.data);
  } catch (err: any) {
    console.error(err.response.data.error);
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('auth-token');
};
