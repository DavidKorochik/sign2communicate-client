import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUser, loadUser } from '../../utils/users/recoilFunctions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  loadingStateUser,
  tokenState,
  userState,
} from '../../recoil/users/atoms/atoms';
import './Login.css';

const Login: React.FC = () => {
  let navigator: NavigateFunction = useNavigate();

  const setLoading = useSetRecoilState(loadingStateUser);
  const setUser = useSetRecoilState(userState);
  const token = useRecoilValue(tokenState);

  const [pnumber, setPnumber] = useState<string>('');

  const handleSubmit = async () => {
    await loginUser(pnumber);

    const res = await loadUser();
    setUser(res);

    navigator('/create', { replace: true });

    setPnumber('');

    setLoading(false);
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
            value={pnumber}
            onChange={(e) => setPnumber(e.target.value)}
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
