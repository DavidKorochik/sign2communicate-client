import type { IUser } from '../user/types';
import moment from 'moment';

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

export interface SigningComponentProps {
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
  handleDeleteSigning: (id: string | undefined) => Promise<void>;
  setSigningsListState: (signings: ISigning[]) => void;
  signingsListState: ISigning[];
  signing: ISigning;
}

export interface SigningContentModalProps {
  signing: ISigning;
  signingContentVisible: boolean;
  setIsSigningContentModalVisible: (bool: boolean) => void;
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
}

export interface UpdateSigningModalProps {
  setIsUpdateSigningModalVisible: (bool: boolean) => void;
  updateSigningVisible: boolean;
  current: ISigning | null;
  setCurrent: (signing: ISigning | null) => void;
  id: string | undefined;
  setSigningsListState: (signings: ISigning[]) => void;
  signingsListState: ISigning[];
}
