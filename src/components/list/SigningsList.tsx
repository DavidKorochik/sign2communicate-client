import { useEffect, useState } from 'react';
import {
  deleteSigning,
  getSignings,
} from '../../utils/signings/recoilFunctions';
import { loadingState, signingState } from '../../recoil/signings/atoms/atoms';
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
  const [signings, setSignings] = useRecoilState(signingState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getSignings();
      setSigningsListState(res);
    })();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleDeleteSigning = async (id: string | undefined): Promise<void> => {
    const res = await deleteSigning(id);
    setSigningsListState(res);
  };

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
          <Row justify='space-around'>
            {signingsListState.map((signing) => (
              <div style={{ margin: '40px' }}>
                <Signing
                  key={signing.id}
                  id={signing.id}
                  description={signing.description}
                  signingDate={moment(signing.signingDate).format('DD/MM/YYYY')}
                  returningDate={moment(signing.returningDate).format(
                    'DD/MM/YYYY'
                  )}
                  handleDeleteSigning={handleDeleteSigning}
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
