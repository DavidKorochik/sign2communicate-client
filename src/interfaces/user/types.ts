import type { ISigning } from '../signing/types';

export interface IUser {
  id?: string;
  name: string;
  personal_number: string;
  phone_number: string;
  military_unit: string;
  role: string;
  signings?: ISigning[];
}
