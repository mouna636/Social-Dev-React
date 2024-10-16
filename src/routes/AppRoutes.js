import { Routes, Route } from 'react-router-dom';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/Home';
import PublicRoute from './PublicRoute';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<PublicRoute />}>
        <Route path='/login' element={<SignIn />} />
      </Route>

      <Route path='/register' element={<SignUp />} />
      <Route path='/' element={<Home />} />
      {/* <Route path='/' element={<ProtectedRoute />}>
       
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
