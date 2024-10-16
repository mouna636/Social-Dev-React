import { Routes, Route } from 'react-router-dom';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/Home';
import Dashboard from '../pages/dashboard/Dashboard';
import PublicRoute from './PublicRoute';
import UsersGrid from '../pages/dashboard/components/UsersGrid';
import MainGrid from '../pages/dashboard/components/MainGrid';
import AuthLayout from '../Layout/AuthLayout';
import NotAuthorized from '../components/NotAuthorized/NotAuthorized';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<PublicRoute />}>
        <Route
          path='/login'
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
      </Route>

      <Route
        path='/register'
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route path='/not-authorized' element={<NotAuthorized />}></Route>

      <Route path='/dashboard' element={<ProtectedRoute />}>
        <Route path='' element={<Dashboard />}>
          <Route index element={<MainGrid />} />
          <Route path='users' element={<UsersGrid />} />
        </Route>
      </Route>

      <Route path='/register' element={<SignUp />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
