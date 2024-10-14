import { Routes, Route } from 'react-router-dom';

import SignIn from '../components/SignIn';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/Home';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
