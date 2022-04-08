import type { IUser } from '../user/types';

export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: moment.Moment | null | string;
  returnDate: moment.Moment | null | string;
  signingTime: moment.Moment | null | string;
  description: string;
  user_id?: IUser;
}
