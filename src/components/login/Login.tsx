import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
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
    const [err, res] = await Promise.all([
      await loginUser(personalNumber),
      await loadUser(),
    ]);

    if (personalNumber.length !== 7) {
      message.error('מספר אישי צריך להיות באורך של 7 ספרות', 2);
    } else if (err) {
      message.error(err, 2);
    } else {
      setUser(res);

      setIsAuthenticated(true);

      setPersonalNumber('');

      navigator('/signings');
    }
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

        <div dir='rtl' className='site-explain'>
          <h2>הסבר קצר על האתר</h2>
          <p>
            אתר זה נועד לנהל את ההחתמות האישיות שלכם על ציוד קשר מול מחלקת הקשר.
          </p>
          <p>
            אתם מעלים החתמה עם כל הציוד שתרצו לדרוש, מכניסים תאריך החתמה, תאריך
            החזרה, <br /> שעת הגעה למחלקת הקשר על מנת לחתום על הציוד ולבסוף
            פירוט של הציוד וכמויות.
          </p>
          <p>
            תוכלו לראות את ההחתמות האישיות שלכם והאם הן מאושרות או לא באמצעות
            סימן הוי או סימן האיקס על ההחתמה עצמה.
          </p>
          <p>
            שימוש נעים ומהנה, כמובן אם יש שאלות תוכלו לפנות לכל אחד ממחלקת הקשר!
          </p>
        </div>
      </Form>
    </motion.div>
  );
};

export default Login;
