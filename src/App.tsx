import * as React from 'react';
import AppLayout from './components/layout/Layout';
import AnimatedRoutes from './components/layout/AnimatedRoutes';

const App: React.FC = () => {
  return (
    <AppLayout>
      <AnimatedRoutes />
    </AppLayout>
  );
};

export default App;
