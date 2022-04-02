import * as React from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';

const Home: React.FC = () => {
  return (
    <motion.div
      transition={{ type: 'linear' }}
      variants={pageAnimation}
      initial={pageAnimation.hidden}
      animate={pageAnimation.enter}
      exit={pageAnimation.exit}
    >
      <h1>This is the home page</h1>
    </motion.div>
  );
};

export default Home;
