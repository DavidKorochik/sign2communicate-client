import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import { equipmentData } from '../../utils/equipmentData';
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

const { TextArea } = Input;

const format = 'HH:mm';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AddSigning: React.FC = () => {
  const [equipment, setEquipment] = useState<string[]>([]);
  // const [numberOfEquipment, setNumberOfEquipment] = useState<string>('');
  const [signingDate, setSigningDate] = useState<null | moment.Moment>();
  const [returnDate, setReturnDate] = useState<null | moment.Moment>();
  const [signingTime, setSigningTime] = useState<null | moment.Moment>();
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (): void => {
    console.log(
      equipment,
      moment(signingDate).format('DD/MM/YYYY'),
      moment(returnDate).format('DD/MM/YYYY'),
      moment(signingTime).format('HH:mm'),
      description
    );

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
