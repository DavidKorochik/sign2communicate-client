import React from 'react';
import AppLayout from './components/layout/Layout';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
import { authToken } from './utils/authToken';

const App: React.FC = () => {
  if (localStorage.getItem('auth-token')) {
    authToken(localStorage.getItem('auth-token'));
  }

  return (
    <AppLayout>
      <AnimatedRoutes />
    </AppLayout>
  );
};

export default App;
