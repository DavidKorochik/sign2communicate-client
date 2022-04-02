import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import './Login.css';

const Login: React.FC = () => {
  return (
    <motion.div
      className='ant-form'
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <Form name='basic' initialValues={{ remember: true }} autoComplete='off'>
        <h1 className='form-title'>ברוכים הבאים!</h1>

        <Form.Item
          name='personal_number'
          rules={[{ required: true, message: 'הכנס/י את המספר האישי שלך' }]}
        >
          <Input
            placeholder='מספר אישי'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            כנס
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default Login;
