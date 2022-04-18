import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import { equipmentData } from '../../utils/equipmentData';
import { useRecoilState } from 'recoil';
import { addSigning } from '../../utils/signings/recoilFunctions';
import { signingState, loadingState } from '../../recoil/signings/atoms/atoms';
import type { ISigning } from '../../interfaces/signing/types';
import Spinner from '../../utils/spinner/Spinner';
import moment from 'moment';
import './AddSigning.css';
import {
  Form,
  Input,
  Button,
  DatePicker,
  TreeSelect,
  Space,
  TimePicker,
  notification,
} from 'antd';

const { TextArea } = Input;

const format = 'HH:mm';
const dateFormatList = ['DD/MM/YYYY'];

const AddSigning: React.FC = () => {
  const [signingData, setSigningData] =
    useRecoilState<ISigning[]>(signingState);
  const [loading, setLoading] = useRecoilState<boolean>(loadingState);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [signingDate, setSigningDate] = useState<moment.Moment | null>(null);
  const [returnDate, setReturnDate] = useState<moment.Moment | null>(null);
  const [signingTime, setSigningTime] = useState<moment.Moment | null>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    const res = await addSigning({
      equipment,
      signingDate: moment(signingDate).format('MM/DD/YYYY'),
      returningDate: moment(returnDate).format('MM/DD/YYYY'),
      time: moment(signingTime).format('HH:mm'),
      description,
    });

    setSigningData(res);

    setEquipment([]);
    setSigningDate(null);
    setReturnDate(null);
    setSigningTime(null);
    setDescription('');

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const openAddSigningNotification = () => {
    notification.success({
      message: `!הוספת החתמה בהצלחה`,
      description: '.תוכל לראות את פרטי ההחתמה בעמוד ההחתמות',
    });
  };

  const openFailedAddSigningNotification = () => {
    notification.error({
      message: 'ההחתמה אינה נוספה בהצלחה',
      description: 'אנא וודא/י שמילאת את כל הפרטים על ההחתמה',
    });
  };

  const isInputsEmpty =
    !equipment || !signingDate || !returnDate || !signingTime || !description
      ? true
      : false;

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <motion.div
          className='form-main'
          transition={{ type: 'linear' }}
          variants={pageAnimation}
          initial={pageAnimation.hidden}
          animate={pageAnimation.enter}
          exit={pageAnimation.exit}
        >
          <h1 style={{ color: 'gray', marginBottom: '2%', fontWeight: 'bold' }}>
            הוסף בקשה לחתימה
          </h1>

          <Form onSubmitCapture={handleSubmit} layout='horizontal'>
            <Form.Item style={{ width: '20%', textAlign: 'right' }}>
              <TreeSelect
                aria-require={true}
                value={equipment}
                onChange={(equipmentData: string[]) =>
                  setEquipment(equipmentData)
                }
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder='הכנס/י את רשימת הציוד שהנך צריך/ה'
                allowClear
                multiple
                treeDefaultExpandAll
                treeCheckable={true}
                treeData={equipmentData}
              />
            </Form.Item>

            <Space direction='horizontal'>
              <Form.Item style={{ textAlign: 'right' }}>
                <DatePicker
                  aria-require={true}
                  value={returnDate}
                  format={dateFormatList}
                  onChange={(date: moment.Moment | null): void =>
                    setReturnDate(date)
                  }
                  placeholder='תאריך ההחזרה'
                />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <DatePicker
                  aria-require={true}
                  value={signingDate}
                  format={dateFormatList}
                  onChange={(date: moment.Moment | null): void =>
                    setSigningDate(date)
                  }
                  placeholder='תאריך החתימה'
                />
              </Form.Item>
            </Space>

            <Form.Item style={{ textAlign: 'right' }}>
              <TimePicker
                aria-require={true}
                value={signingTime}
                onChange={(time: moment.Moment | null): void =>
                  setSigningTime(time)
                }
                format={format}
                placeholder='שעת ההחתמה'
              />
            </Form.Item>

            <Form.Item>
              <TextArea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='הערות'
                style={{ textAlign: 'right' }}
                rows={4}
              />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={() =>
                  isInputsEmpty
                    ? openFailedAddSigningNotification()
                    : openAddSigningNotification()
                }
                type='primary'
                htmlType='submit'
              >
                שלח בקשה
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      )}
    </>
  );
};

export default AddSigning;
