import { atom } from 'recoil';
// import moment from 'moment';
import type { ISigning } from '../../../interfaces/signing/types';

export const signingState = atom<ISigning[]>({
  key: 'signingState',
  default: [
    {
      equipment: [],
      signingDate: null,
      returnDate: null,
      signingTime: null,
      description: '',
    },
  ],
});

// export const signingEquipmentState = atom<string[]>({
//   key: 'signingEquipmentState',
//   default: [],
// });

// export const signingDateState = atom<moment.Moment | null>({
//   key: 'signingDateState',
//   default: null,
// });

// export const returnDateState = atom<moment.Moment | null>({
//   key: 'returnDateState',
//   default: null,
// });

// export const signingTimeState = atom<moment.Moment | null>({
//   key: 'signingTimeState',
//   default: null,
// });

// export const signingDescriptionState = atom<string>({
//   key: 'signingDescriptionState',
//   default: '',
// });

// export const loadingState = atom<boolean>({
//   key: 'loadingState',
//   default: true,
// });
