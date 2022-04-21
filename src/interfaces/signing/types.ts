import type { IUser } from '../user/types';

export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: moment.Moment | null | string | Date;
  returningDate: moment.Moment | null | string | Date;
  time: moment.Moment | null | string;
  description: string;
  status?: string;
  user?: IUser;
}
