import { atom } from 'recoil';
import type { ISigning } from '../../../interfaces/signing/types';

export const signingState = atom<ISigning[]>({
  key: 'signingState',
  default: [
    {
      equipment: [],
      signingDate: null,
      returningDate: null,
      time: null,
      description: '',
    },
  ],
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: true,
});
