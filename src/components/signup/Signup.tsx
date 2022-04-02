import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import './Signup.css';

const Signup: React.FC = () => {
  return (
    <motion.div
      className='ant-form'
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <h1 className='form-title'>הירשם לאתר</h1>

      <Form name='basic' initialValues={{ remember: true }} autoComplete='off'>
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'הכנס/י את שמך המלא' }]}
        >
          <Input
            placeholder='שם מלא'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='personal_number'
          rules={[{ required: true, message: 'הכנס/י את המספר האישי שלך' }]}
        >
          <Input
            placeholder='מספר אישי'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='phone_number'
          rules={[{ required: true, message: 'הכנס/י את מספר הטלפון שלך' }]}
        >
          <Input
            placeholder='מספר טלפון'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='military_unit'
          rules={[{ required: true, message: 'הכנס/י את הפלוגה/מחלקה שלך' }]}
        >
          <Input
            placeholder='פלוגה/מחלקה'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            הירשם
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default Signup;
