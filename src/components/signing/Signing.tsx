import * as React from 'react';
import { Col, Card } from 'antd';
import moment from 'moment';

interface Props {
  description: string;
  signingDate: string | null | moment.Moment;
  returningDate: string | null | moment.Moment;
}

const Signing: React.FC<Props> = ({
  description,
  signingDate,
  returningDate,
}) => {
  return (
    <>
      <Col span={12}>
        <Card
          size='default'
          title='החתמה'
          extra={<a href='#'>עוד</a>}
          style={{ width: 350, textAlign: 'center' }}
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
