import React from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import './SigningContentModal.css';

interface Props {
  signingContentVisible: boolean;
  setIsSigningContentModalVisible: (bool: boolean) => void;
  time: string | null | moment.Moment;
  equipment: string[];
  description: string;
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
}

const SigningContentModal: React.FC<Props> = ({
  signingContentVisible,
  setIsSigningContentModalVisible,
  equipment,
  description,
  signingDate,
  returningDate,
  time,
}) => {
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
        <p>{description}</p>
        <p>{equipmentToStringArr}</p>
        <p>
          {signingDate} - {returningDate}
        </p>
        <p>
          {time?.toString().split(':')[0]}:{time?.toString().split(':')[1]}
        </p>
      </Modal>
    </>
  );
};

export default SigningContentModal;
