import React from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import './SigningContentModal.css';
import { IUser } from '../../interfaces/user/types';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/users/atoms/atoms';

interface Props {
  signingContentVisible: boolean;
  setIsSigningContentModalVisible: (bool: boolean) => void;
  time: string | null | moment.Moment;
  equipment: string[];
  description: string;
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
  user: IUser | undefined;
}

const SigningContentModal: React.FC<Props> = ({
  signingContentVisible,
  setIsSigningContentModalVisible,
  equipment,
  description,
  signingDate,
  returningDate,
  time,
  user,
}) => {
  const userLoggedIn = useRecoilValue(userState);

  const descriptionSplitted = description.split(',');

  const equipmentToStringArr = equipment.join(', ');

  const handleOk = () => {
    setIsSigningContentModalVisible(!signingContentVisible);
  };

  const handleCancel = () => {
    setIsSigningContentModalVisible(!signingContentVisible);
  };

  return (
    <>
      <Modal
        style={{ textAlign: 'center' }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'ר'}
        cancelText={'צא'}
        title='פרטי ההחתמה'
        visible={signingContentVisible}
      >
        {descriptionSplitted.map((desc, i) => (
          <p key={i} dir='rtl'>
            {desc}
          </p>
        ))}
        <p>{equipmentToStringArr}</p>
        <p>
          {signingDate} - {returningDate}
        </p>
        <p>
          {time?.toString().split(':')[0]}:{time?.toString().split(':')[1]}
        </p>
        <p>
          {userLoggedIn?.role === 'Admin'
            ? `${user?.personal_number} - ${user?.name}`
            : ''}
        </p>
      </Modal>
    </>
  );
};

export default SigningContentModal;
