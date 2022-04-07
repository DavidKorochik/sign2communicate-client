import Signup from '../../components/signup/Signup';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import AddSigning from '../form/AddSigning';
import SigningsList from '../list/SigningsList';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<AddSigning />} />
        <Route path='/signings' element={<SigningsList />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
