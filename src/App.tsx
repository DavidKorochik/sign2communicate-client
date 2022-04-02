import * as React from 'react';
import AppLayout from './components/layout/Layout';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <AppLayout>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </AppLayout>
      </Routes>
    </>
  );
};

export default App;
