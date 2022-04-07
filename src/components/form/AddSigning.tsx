import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import { equipmentData } from '../../utils/equipmentData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addSigning } from '../../utils/recoilFunctions';
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
} from 'antd';
import {
  // signingEquipmentState,
  // signingDateState,
  // returnDateState,
  // signingTimeState,
  // signingDescriptionState,
  signingState,
} from '../../recoil/signings/atoms/atoms';

const { TextArea } = Input;

const format = 'HH:mm';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AddSigning: React.FC = () => {
  const [signingData] = useRecoilValue(signingState);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [signingDate, setSigningDate] = useState<moment.Moment | null>(null);
  const [returnDate, setReturnDate] = useState<moment.Moment | null>(null);
  const [signingTime, setSigningTime] = useState<moment.Moment | null>(null);
  const [description, setDescription] = useState<string>('');

  // const [equipment, setEquipment] = useRecoilState<string[]>(
  //   signingEquipmentState
  // );

  // const [signingDate, setSigningDate] = useRecoilState<null | moment.Moment>(
  //   signingDateState
  // );

  // const [returnDate, setReturnDate] = useRecoilState<null | moment.Moment>(
  //   returnDateState
  // );

  // const [signingTime, setSigningTime] = useRecoilState<null | moment.Moment>(
  //   signingTimeState
  // );

  // const [description, setDescription] = useRecoilState<string>(
  //   signingDescriptionState
  // );

  const handleSubmit = async (): Promise<void> => {
    await addSigning({
      equipment,
      signingDate: moment(signingDate).format('DD/MM/YYYY'),
      returnDate: moment(returnDate).format('DD/MM/YYYY'),
      signingTime: moment(signingTime).format('HH:mm'),
      description,
    });

    console.log(signingData);

    setEquipment([]);
    setSigningDate(null);
    setReturnDate(null);
    setSigningTime(null);
    setDescription('');
  };

  return (
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
            value={equipment}
            onChange={(equipmentData: string[]) => setEquipment(equipmentData)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='הערות'
            style={{ textAlign: 'right' }}
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            שלח בקשה
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default AddSigning;
