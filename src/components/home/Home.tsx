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
    </motion.div>
  );
};

export default Home;
