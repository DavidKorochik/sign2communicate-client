import * as React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'antd';
import moment from 'moment';

interface Props {
  description: string;
  signingDate: string | null | moment.Moment;
}

const Signing: React.FC<Props> = ({ description, signingDate }) => {
  return (
    <>
      <Col span={12}>
        <Card
          size='default'
          title='החתמה'
          extra={<a href='#'>עוד</a>}
          style={{ width: 350, textAlign: 'center' }}
        >
          <p>{description}</p>
          <p>{signingDate}</p>
        </Card>
      </Col>
    </>
  );
};

export default Signing;
