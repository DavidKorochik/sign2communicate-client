import { useEffect, useState } from 'react';
import { loadingState } from '../../recoil/signings/atoms/atoms';
import { useRecoilState } from 'recoil';
import { Row, notification } from 'antd';
import Signing from '../signing/Signing';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import moment from 'moment';
import Spinner from '../../utils/spinner/Spinner';
import NoSignings from './no-signings/NoSignings';
import type { ISigning } from '../../interfaces/signing/types';
import { NotificationPlacement } from 'antd/lib/notification';
import './SigningsList.css';
import {
  deleteSigning,
  getSignings,
} from '../../utils/signings/recoilFunctions';

const SigningsList: React.FC = () => {
  const [signingsListState, setSigningsListState] = useState<ISigning[]>([]);
  const [loading, setLoading] = useRecoilState<boolean>(loadingState);

  const openNotification = (placement: NotificationPlacement) => {
    notification.success({
      message: `!הסרת ההחתמה הושלמה בהצלחה`,
      description: 'ההחתמה עליה לחצת על מנת להסירה הוסרה בהצלחה',
      placement,
    });
  };

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
    openNotification('topRight');
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
          {signingsListState?.length === 0 ? (
            <NoSignings />
          ) : (
            <Row justify='space-around'>
              {signingsListState.map((signing) => (
                <div key={signing.id} style={{ margin: '40px' }}>
                  <Signing
                    signingDate={moment(signing.signingDate).format(
                      'DD/MM/YYYY'
                    )}
                    returningDate={moment(signing.returningDate).format(
                      'DD/MM/YYYY'
                    )}
                    handleDeleteSigning={handleDeleteSigning}
                    setSigningsListState={setSigningsListState}
                    signingsListState={signingsListState}
                    signing={signing}
                  />
                </div>
              ))}
            </Row>
          )}
        </motion.div>
      )}
    </>
  );
};

export default SigningsList;
