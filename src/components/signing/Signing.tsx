import React, { useState } from 'react';
import { Col, Card } from 'antd';
import SigningContentModal from '../signing-content-modal/SigningContentModal';
import moment from 'moment';
import { motion } from 'framer-motion';
import UpdateSigningModal from '../update-signing-modal/UpdateSigningModal';
import type { ISigning } from '../../interfaces/signing/types';
import './Signing.css';
import { IUser } from '../../interfaces/user/types';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/users/atoms/atoms';
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

interface Props {
  description: string;
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
  id: string | undefined;
  handleDeleteSigning: (id: string | undefined) => Promise<void>;
  time: string | null | moment.Moment;
  equipment: string[];
  setSigningsListState: (signings: ISigning[]) => void;
  signingsListState: ISigning[];
  user: IUser | undefined;
}

const Signing: React.FC<Props> = ({
  description,
  signingDate,
  returningDate,
  id,
  handleDeleteSigning,
  time,
  equipment,
  setSigningsListState,
  signingsListState,
  user,
}) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string>('');
  const [current, setCurrent] = useState<ISigning | null>(null);
  const [editEquipment, setEditEquipment] = useState<string[]>([]);
  const userloggedIn = useRecoilValue(userState);

  const [isSigningContentModalVisible, setIsSigningContentModalVisible] =
    useState<boolean>(false);

  const [isUpdateSigningModalVisible, setIsUpdateSigningModalVisible] =
    useState<boolean>(false);

  const [editSigningDate, setEditSigningDate] = useState<
    moment.Moment | null | Date
  >(null);

  const [editReturnDate, setEditReturnDate] = useState<
    moment.Moment | null | Date
  >(null);

  const [editSigningTime, setEditSigningTime] = useState<moment.Moment | null>(
    null
  );

  return (
    <motion.div
      animate={
        deleteClicked
          ? {
              scale: 0,
              transition: { ease: 'easeOut', duration: 1 },
            }
          : ''
      }
    >
      <Col span={4}>
        <Card
          onAnimationEnd={() => setDeleteClicked(false)}
          className={`${deleteClicked ? 'fade-out' : ''}`}
          size='default'
          title='החתמה'
          style={{ width: 350, textAlign: 'center' }}
          actions={[
            <DeleteOutlined
              key='delete'
              onAnimationEnd={() => setDeleteClicked(false)}
              onClick={() => {
                setDeleteClicked(true);
                handleDeleteSigning(id);
              }}
            />,
            <EditOutlined
              onClick={() => {
                setIsUpdateSigningModalVisible(!isUpdateSigningModalVisible);
                setCurrent({
                  description,
                  equipment,
                  returningDate,
                  signingDate,
                  time,
                  id,
                });
              }}
              key='edit'
            />,
            <InfoCircleOutlined
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
            {userloggedIn?.role === 'Admin'
              ? `${user?.personal_number} - ${user?.name}`
              : ''}
          </p>
        </Card>
      </Col>
      {isSigningContentModalVisible ? (
        <SigningContentModal
          setIsSigningContentModalVisible={setIsSigningContentModalVisible}
          signingContentVisible={isSigningContentModalVisible}
          time={time}
          equipment={equipment}
          description={description}
          signingDate={signingDate}
          returningDate={returningDate}
          user={user}
        />
      ) : (
        ''
      )}
      {isUpdateSigningModalVisible ? (
        <UpdateSigningModal
          setIsUpdateSigningModalVisible={setIsUpdateSigningModalVisible}
          updateSigningVisible={isUpdateSigningModalVisible}
          current={current}
          setCurrent={setCurrent}
          editDescription={editDescription}
          editEquipment={editEquipment}
          editSigningDate={editSigningDate}
          editSigningTime={editSigningTime}
          editReturnDate={editReturnDate}
          setEditDescription={setEditDescription}
          setEditEquipment={setEditEquipment}
          setEditSigningDate={setEditSigningDate}
          setEditSigningTime={setEditSigningTime}
          setEditReturnDate={setEditReturnDate}
          id={id}
          setSigningsListState={setSigningsListState}
          signingsListState={signingsListState}
        />
      ) : (
        ''
      )}
    </motion.div>
  );
};

export default Signing;
