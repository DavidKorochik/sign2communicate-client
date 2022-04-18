import React, { useEffect, useState } from 'react';
import { Col, Card } from 'antd';
import SigningContentModal from '../signing-content-modal/SigningContentModal';
import moment from 'moment';
import { motion } from 'framer-motion';
import UpdateSigningModal from '../update-signing-modal/UpdateSigningModal';
import type { ISigning } from '../../interfaces/signing/types';
import './Signing.css';
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
}) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [isSigningContentModalVisible, setIsSigningContentModalVisible] =
    useState(false);
  const [isUpdateSigningModalVisible, setIsUpdateSigningModalVisible] =
    useState(false);
  const [current, setCurrent] = useState<ISigning | null>(null);
  const [editEquipment, setEditEquipment] = useState<string[]>([]);
  const [editSigningDate, setEditSigningDate] = useState<
    string | moment.Moment | null
  >(null);
  const [editReturnDate, setEditReturnDate] = useState<
    string | moment.Moment | null
  >(null);
  const [editSigningTime, setEditSigningTime] = useState<
    string | moment.Moment | null
  >(null);
  const [editDescription, setEditDescription] = useState<string>('');

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
          className={`${deleteClicked ? 'fade-out' : ''}`}
          size='default'
          title='החתמה'
          style={{ width: 350, textAlign: 'center' }}
          actions={[
            <DeleteOutlined
              key='delete'
              onClick={() => {
                setDeleteClicked(!deleteClicked);
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
