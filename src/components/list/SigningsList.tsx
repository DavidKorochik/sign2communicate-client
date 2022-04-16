import { useEffect, useState } from 'react';
import { getSignings } from '../../utils/signings/recoilFunctions';
import { Row } from 'antd';
import Signing from '../signing/Signing';
import type { ISigning } from '../../interfaces/signing/types';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import moment from 'moment';
import './SigningsList.css';

const SigningsList: React.FC = () => {
  const [signingsListState, setSigningsListState] = useState<ISigning[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getSignings();
      setSigningsListState(res);
    })();
  }, []);

  return (
    <motion.div
      className='card-wrapper'
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <Row>
        {signingsListState.map((signing) => (
          <div style={{ margin: '40px' }}>
            <Signing
              key={signing.id}
              description={signing.description}
              signingDate={moment(signing.signingDate).format('DD/MM/YYYY')}
            />
          </div>
        ))}
      </Row>
    </motion.div>
  );
};

export default SigningsList;
