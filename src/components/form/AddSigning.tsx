import * as React from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
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

// Tree select data boilerplate
//{
// title: 'Light',
// value: 'light',
// children: [{ title: 'Bamboo', value: 'bamboo' }],
//},

const format = 'HH:mm';

function AddSigning() {
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

      <Form layout='horizontal'>
        <Form.Item style={{ width: '15%', textAlign: 'right' }}>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder='הכנס/י את רשימת הציוד שהנך צריך/ה'
            allowClear
            multiple
            treeDefaultExpandAll
            treeData={[
              {
                title: '624',
                value: '624',
              },
              {
                title: '709',
                value: '709',
              },
            ]}
          />
        </Form.Item>

        <Space direction='horizontal'>
          <Form.Item style={{ textAlign: 'right' }}>
            <DatePicker placeholder='תאריך ההחזרה' />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <DatePicker placeholder='תאריך החתימה' />
          </Form.Item>
        </Space>

        <Form.Item style={{ textAlign: 'right' }}>
          <TimePicker format={format} placeholder='שעת ההחתמה' />
        </Form.Item>

        <Form.Item>
          <TextArea
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
}

export default AddSigning;
