import { useLayoutEffect, useEffect, useState } from 'react';
import { getSignings } from '../../utils/signings/recoilFunctions';
import { loadingState } from '../../recoil/signings/atoms/atoms';
import { useRecoilState } from 'recoil';
import { Row } from 'antd';
import Signing from '../signing/Signing';
import type { ISigning } from '../../interfaces/signing/types';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import moment from 'moment';
import './SigningsList.css';
import Spinner from '../../utils/spinner/Spinner';

const SigningsList: React.FC = () => {
  const [signingsListState, setSigningsListState] = useState<ISigning[]>([]);
  const [loading, setLoading] = useRecoilState<boolean>(loadingState);

  // useEffect(() => {}, [signingsListState]);

  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getSignings();
      setSigningsListState(res);
    })();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [setSigningsListState]);

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
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
                  returningDate={moment(signing.returningDate).format(
                    'DD/MM/YYYY'
                  )}
                />
              </div>
            ))}
          </Row>
        </motion.div>
      )}
    </>
  );
};

export default SigningsList;
