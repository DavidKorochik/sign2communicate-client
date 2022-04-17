import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import { useSetRecoilState } from 'recoil';
import { loginUser, loadUser } from '../../utils/users/recoilFunctions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  userState,
  isAuthenticatedState,
} from '../../recoil/users/atoms/atoms';
import './Login.css';

const Login: React.FC = () => {
  let navigator: NavigateFunction = useNavigate();

  const setUser = useSetRecoilState(userState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const [personalNumber, setPersonalNumber] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    const [_, res] = await Promise.all([
      await loginUser(personalNumber),
      await loadUser(),
    ]);

    console.log(res);

    // await loginUser(personalNumber);

    // const res = await loadUser();
    setUser(res);

    setIsAuthenticated(true);

    setPersonalNumber('');

    navigator('/signings');
  };

  return (
    <motion.div
      className='ant-form'
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <h1 className='form-title'>ברוכים הבאים!</h1>

      <Form
        onSubmitCapture={handleSubmit}
        name='basic'
        initialValues={{ remember: true }}
        autoComplete='off'
      >
        <Form.Item
          name='personal_number'
          rules={[{ required: true, message: 'הכנס/י את המספר האישי שלך' }]}
        >
          <Input
            value={personalNumber}
            onChange={(e) => setPersonalNumber(e.target.value)}
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
