import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { pageAnimation } from '../../utils/animations';
import { createUser, loadUser } from '../../utils/users/recoilFunctions';
import { useSetRecoilState } from 'recoil';
import {
  userState,
  isAuthenticatedState,
} from '../../recoil/users/atoms/atoms';
import './Signup.css';

const Signup: React.FC = () => {
  let navigator: NavigateFunction = useNavigate();

  const setUser = useSetRecoilState(userState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const [name, setName] = useState<string>('');
  const [personalNumbner, setPersonalNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [militaryUnit, setMilitaryUnit] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    const [_, res] = await Promise.all([
      await createUser({
        name,
        personal_number: personalNumbner,
        phone_number: phoneNumber,
        military_unit: militaryUnit,
      }),
      await loadUser(),
    ]);

    // await createUser({
    //   name,
    //   personal_number: personalNumbner,
    //   phone_number: phoneNumber,
    //   military_unit: militaryUnit,
    // });

    // const res = await loadUser();
    setUser(res);

    setIsAuthenticated(true);

    setName('');
    setPersonalNumber('');
    setPhoneNumber('');
    setMilitaryUnit('');

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
      <h1 className='form-title'>הירשם לאתר</h1>

      <Form
        onSubmitCapture={handleSubmit}
        name='basic'
        initialValues={{ remember: true }}
        autoComplete='off'
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'הכנס/י את שמך המלא' }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='שם מלא'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='personal_number'
          rules={[{ required: true, message: 'הכנס/י את המספר האישי שלך' }]}
        >
          <Input
            value={personalNumbner}
            onChange={(e) => setPersonalNumber(e.target.value)}
            placeholder='מספר אישי'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='phone_number'
          rules={[{ required: true, message: 'הכנס/י את מספר הטלפון שלך' }]}
        >
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='מספר טלפון'
            style={{ textAlign: 'right', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='military_unit'
          rules={[{ required: true, message: 'הכנס/י את הפלוגה/מחלקה שלך' }]}
        >
          <Input
            value={militaryUnit}
            onChange={(e) => setMilitaryUnit(e.target.value)}
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
