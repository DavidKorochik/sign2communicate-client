import React, { useState } from 'react';
import { Col, Card } from 'antd';
import moment from 'moment';
import { motion } from 'framer-motion';
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
}

const Signing: React.FC<Props> = ({
  description,
  signingDate,
  returningDate,
  id,
  handleDeleteSigning,
}) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  console.log(deleteClicked);

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
            <EditOutlined key='edit' />,
            <InfoCircleOutlined key='info' />,
          ]}
        >
          <p style={{ fontWeight: 'bold', fontSize: '17px' }}>{description}</p>
          <p>
            {signingDate} - {returningDate}
          </p>
        </Card>
      </Col>
    </motion.div>
  );
};

export default Signing;
