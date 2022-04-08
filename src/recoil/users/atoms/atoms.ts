import { atom } from 'recoil';
import { IUser } from '../../../interfaces/user/types';

export const isAuthenticatedState = atom<boolean>({
  key: 'isAuthenticatedState',
  default: false,
});

export const loadingStateUser = atom<boolean>({
  key: 'loadingStateUser',
  default: true,
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: localStorage.getItem('auth-token'),
});

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null,
});
