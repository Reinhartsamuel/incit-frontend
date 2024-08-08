import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import FrontPage from '../pages/Home/FrontPage';
import SignUpPage from '../pages/Auth/SignupPage';

const AuthRouter = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<FrontPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/signup'} element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default AuthRouter;
