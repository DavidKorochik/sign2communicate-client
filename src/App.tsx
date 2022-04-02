import * as React from 'react';
import AppLayout from './components/layout/Layout';
import Signup from './components/signup/Signup';

const App: React.FC = () => {
  return (
    <>
      <AppLayout>
        <Signup />
      </AppLayout>
    </>
  );
};

export default App;
