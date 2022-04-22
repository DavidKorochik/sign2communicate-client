import React from 'react';
import { Modal } from 'antd';
import './SigningContentModal.css';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/users/atoms/atoms';
import type { SigningContentModalProps } from '../../interfaces/signing/types';

const SigningContentModal: React.FC<SigningContentModalProps> = ({
  signing,
  signingContentVisible,
  setIsSigningContentModalVisible,
  signingDate,
  returningDate,
}) => {
  const { description, equipment, time, user } = signing;

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
