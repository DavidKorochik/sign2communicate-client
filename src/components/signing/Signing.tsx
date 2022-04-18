import React, { useEffect, useState } from 'react';
import { Col, Card } from 'antd';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { signingState } from '../../recoil/signings/atoms/atoms';
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  deleteSigning,
  getSignings,
} from '../../utils/signings/recoilFunctions';

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
  // const [signings, setSignings] = useRecoilState(signingState);

  // const handleDeleteSigning = async () => {
  //   await deleteSigning(id);

  //   setSignings((signingsData) =>
  //     signingsData.filter((signing) => signing.id !== id)
  //   );
  // };

  return (
    <>
      <Col span={4}>
        <Card
          size='default'
          title='החתמה'
          style={{ width: 350, textAlign: 'center' }}
          actions={[
            <DeleteOutlined
              key='delete'
              onClick={() => handleDeleteSigning(id)}
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
    </>
  );
};

export default Signing;
