import type { IUser } from '../user/types';

export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: moment.Moment | null | string;
  returningDate: moment.Moment | null | string;
  time: moment.Moment | null | string;
  description: string;
  user_id?: IUser;
}
