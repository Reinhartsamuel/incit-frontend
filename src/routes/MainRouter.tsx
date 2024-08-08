import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ProfilePage from '../pages/Profile/ProfilePage';

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default MainRouter;
