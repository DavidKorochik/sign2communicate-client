import * as React from 'react';
import AppLayout from './components/layout/Layout';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
