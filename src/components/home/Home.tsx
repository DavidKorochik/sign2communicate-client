import * as React from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import TypeWriter from 'typewriter-effect';
import './Home.css';

const Home: React.FC = () => {
  return (
    <motion.div
      className='main-wrapper'
      style={{ width: '100%  ' }}
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <h1>sign2communicate</h1>
      <div className='type-writer' dir='rtl'>
        <TypeWriter
          options={{ autoStart: true, loop: true }}
          onInit={(typewriter) => {
            typewriter
              .typeString('המקום שלך לניהול החתמות יעיל וחסכוני')
              .pauseFor(1500)
              .deleteAll()
              .typeString('כניסה מהירה וקלילה לאתר')
              .pauseFor(1500)
              .deleteAll()
              .typeString('כניסה מהירה וקלילה לאתר')
              .pauseFor(1500)
              .deleteAll()
              .typeString('נגמרו הימים של איבוד ציוד')
              .pauseFor(1500)
              .deleteAll()
              .start();
          }}
        />
      </div>

      <div dir='rtl' className='site-explain'>
        <h2>הסבר קצר על האתר</h2>
        <p>
          אתר זה נועד לנהל את ההחתמות האישיות שלכם על ציוד קשר מול מחלקת הקשר.
        </p>
        <p>
          אתם מעלים החתמה עם כל הציוד שתרצו לדרוש, מכניסים תאריך החתמה, תאריך
          החזרה, <br /> שעת הגעה למחלקת הקשר על מנת לחתום על הציוד ולבסוף פירוט
          של הציוד וכמויות.
        </p>
        <p>
          תוכלו לראות את ההחתמות האישיות שלכם והאם הן מאושרות או לא באמצעות סימן
          הוי או סימן האיקס על ההחתמה עצמה.
        </p>
        <p>
          שימוש נעים ומהנה, כמובן אם יש שאלות תוכלו לפנות לכל אחד ממחלקת הקשר!
        </p>
      </div>
    </motion.div>
  );
};

export default Home;
