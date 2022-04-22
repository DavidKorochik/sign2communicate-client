import React, { useState } from 'react';
import { Col, Card, Popover } from 'antd';
import SigningContentModal from '../signing-content-modal/SigningContentModal';
import { motion } from 'framer-motion';
import UpdateSigningModal from '../update-signing-modal/UpdateSigningModal';
import { updateSigning } from '../../utils/signings/recoilFunctions';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/users/atoms/atoms';
import './Signing.css';
import type {
  ISigning,
  SigningComponentProps,
} from '../../interfaces/signing/types';
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const Signing: React.FC<SigningComponentProps> = ({
  signingDate,
  returningDate,
  handleDeleteSigning,
  setSigningsListState,
  signingsListState,
  signing,
}) => {
  const { description, equipment, time, id, status, user } = signing;
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [current, setCurrent] = useState<ISigning | null>(null);
  const userloggedIn = useRecoilValue(userState);

  const [isSigningContentModalVisible, setIsSigningContentModalVisible] =
    useState<boolean>(false);

  const [isUpdateSigningModalVisible, setIsUpdateSigningModalVisible] =
    useState<boolean>(false);

  const deleteAcceptContentHover = (
    <p style={{ color: 'red', fontSize: '15px' }}>
      רק מנהלי אתר יכולים לבצע פעולה זו
    </p>
  );

  const handleCloseButtonClick = async (): Promise<void> => {
    const res = await updateSigning({
      ...signing,
      status: 'Declined',
    });

    setSigningsListState(
      signingsListState.map((signing) => (signing.id === id ? res : signing))
    );
  };

  const handleCheckButtonClick = async (): Promise<void> => {
    const res = await updateSigning({
      ...signing,
      status: 'Accepted',
    });

    setSigningsListState(
      signingsListState.map((signing) => (signing.id === id ? res : signing))
    );
  };

  const handleEditSigning = () => {
    setIsUpdateSigningModalVisible(!isUpdateSigningModalVisible);
    setCurrent({
      description,
      equipment,
      returningDate,
      signingDate,
      time,
      id,
    });
  };

  const displayCloseButtonDisabled =
    userloggedIn?.role !== 'Admin' ? (
      <Popover content={deleteAcceptContentHover} trigger='click'>
        <CloseOutlined
          className='close-outlined'
          style={{
            color: `${status === 'Declined' ? 'red' : ''}`,
          }}
          disabled={true}
        />
      </Popover>
    ) : (
      <CloseOutlined
        className='close-outlined'
        style={{
          color: `${status === 'Declined' ? 'red' : ''}`,
        }}
        onClick={() => handleCloseButtonClick()}
      />
    );

  const displayCheckButtonDisabled =
    userloggedIn?.role !== 'Admin' ? (
      <Popover content={deleteAcceptContentHover} trigger='click'>
        <CheckOutlined
          className='check-outlined'
          style={{
            color: `${status === 'Accepted' ? 'green' : ''}`,
          }}
          disabled={true}
        />
      </Popover>
    ) : (
      <CheckOutlined
        className='check-outlined'
        style={{
          color: `${status === 'Accepted' ? 'green' : ''}`,
        }}
        onClick={() => handleCheckButtonClick()}
      />
    );

  return (
    <motion.div
      animate={
        deleteClicked && {
          scale: 0,
          transition: { ease: 'easeOut', duration: 1 },
        }
      }
    >
      <Col span={4}>
        <Card
          onAnimationEnd={() => setDeleteClicked(false)}
          className={`${deleteClicked && 'fade-out'}`}
          size='default'
          title='החתמה'
          style={{ width: 350, textAlign: 'center' }}
          actions={[
            displayCloseButtonDisabled,
            displayCheckButtonDisabled,
            <DeleteOutlined
              className='delete-outlined'
              key='delete'
              onAnimationEnd={() => setDeleteClicked(false)}
              onClick={() => {
                setDeleteClicked(true);
                handleDeleteSigning(id);
              }}
            />,
            <EditOutlined
              className='edit-outlined'
              onClick={() => handleEditSigning()}
              key='edit'
            />,
            <InfoCircleOutlined
              className='info-outlined'
              onClick={() =>
                setIsSigningContentModalVisible(!isSigningContentModalVisible)
              }
              key='info'
            />,
          ]}
        >
          <p style={{ fontWeight: 'bold', fontSize: '17px' }}>{description}</p>
          <p>
            {signingDate} - {returningDate}
          </p>
          <p>
            {userloggedIn?.role === 'Admin' &&
              `${user?.personal_number} - ${user?.name}`}
          </p>
        </Card>
      </Col>
      {isSigningContentModalVisible && (
        <SigningContentModal
          setIsSigningContentModalVisible={setIsSigningContentModalVisible}
          signingContentVisible={isSigningContentModalVisible}
          signingDate={signingDate}
          returningDate={returningDate}
          signing={signing}
        />
      )}
      {isUpdateSigningModalVisible && (
        <UpdateSigningModal
          setIsUpdateSigningModalVisible={setIsUpdateSigningModalVisible}
          updateSigningVisible={isUpdateSigningModalVisible}
          current={current}
          setCurrent={setCurrent}
          id={id}
          setSigningsListState={setSigningsListState}
          signingsListState={signingsListState}
        />
      )}
    </motion.div>
  );
};

export default Signing;
