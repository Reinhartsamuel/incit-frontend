/* eslint-disable @typescript-eslint/no-explicit-any */
// Exam 8: User Database Dashboard
// Create a dashboard with a list of all users that have signed up to your app. For each user, show the following information:
// Timestamp of the user sign up.
// Number of times logged in.
// Timestamp of the user logged out.

// Exam 9: User Statistics
// At the top of the user database dashboard, show the following statistics:
// Total number of users who have signed up.
// Total number of users with active sessions today.
// Average number of active session users in the last 7 days rolling.
import moment from 'moment';
import { auth } from '../../config/firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const getData = async () => {
    try {
      //
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='w-screen min-h-screen items-center flex relative'>
      <div className='absolute w-full top-0 bg-gray-900 px-5 py-2 flex justify-between items-center'>
        <div className='flex flex gap-10'>
          <p>Numbers of users signed up: 12</p>
          <p>Numbers of users with active sessions today: 0</p>
          <p>Numbers of users 7 days: 1</p>
        </div>
        <div className='flex flex gap-2'>
          <button
            onClick={handleLogout}
            type='button'
            className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            Log Out
          </button>
        </div>
      </div>
      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>
          Hello, {auth.currentUser?.displayName || auth.currentUser?.email}
        </h1>
        <div className='flex gap-4'>
          <p>Signed Up : {moment().format()}</p>
          <p>Logged in : 10 times</p>
          <p>Last login : {moment().add(-1, 'days').format()}</p>
          <p>Last logout : {moment().add(-12, 'days').format()}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
