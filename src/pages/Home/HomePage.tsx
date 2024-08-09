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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AnalyticResult {
  data: number;
  message: string;
}
interface Analytics {
  count?: AnalyticResult | null;
  today?: AnalyticResult | null;
  week?: AnalyticResult | null;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Analytics>({
    count: null,
    today: null,
    week: null,
  });

  const userDataSql = JSON.parse(
    localStorage.getItem('userSql') || '{"name":""}'
  );
  const getData = async () => {
    try {
      const [resCount, resToday, resWeek] = await Promise.all([
        await axios.get(
          'https://striking-illumination-production.up.railway.app/analytics/count-users'
        ),
        await axios.get(
          'https://striking-illumination-production.up.railway.app/analytics/today-sessions'
        ),
        await axios.get(
          'https://striking-illumination-production.up.railway.app/analytics/week-sessions'
        ),
      ]);
      setData({
        count: resCount.data,
        today: resToday.data,
        week: resWeek.data,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
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
          <p>Numbers of users signed up: {data?.count?.data}</p>
          <p>
            Numbers of users with active sessions today: {data?.today?.data}
          </p>
          <p>Numbers of users 7 days: {data?.week?.data?.toFixed(2)}</p>
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
      <div className='w-full flex flex-col items-center justify-center gap-2'>
        <img
          className='w-50 h-50 rounded-full bg-blue-400'
          src={
            auth?.currentUser?.photoURL ||
            'https://console.aiven.io/4d81fe5220c76323e0ae.png'
          }
          alt='Rounded avatar'
        />
        <h1 className='text-5xl font-bold'>
          Hello, {auth.currentUser?.displayName || auth.currentUser?.email}
        </h1>
        <div className='flex flex-col items-center lg:flex-row gap-4'>
          <p className='text-lg'>
            <span className='font-thin text-gray-300 text-sm'>Signed Up</span> :{' '}
            {moment(userDataSql?.createdAt).format('llll')}
          </p>
          <p className='text-lg'>
            <span className='font-thin text-gray-300 text-sm'>Logged in</span> :{' '}
            {userDataSql?.number_of_login || 0} times
          </p>
          <p className='text-lg'>
            <span className='font-thin text-gray-300 text-sm'>Last login</span>{' '}
            : {moment(userDataSql?.last_login).format('llll')}
          </p>
        </div>
        <button
          type='button'
          className='focus:outline-none
        text-white
        bg-purple-700
        hover:bg-purple-800
        focus:ring-4
        focus:ring-purple-300
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
        mb-2
        dark:bg-purple-600
        dark:hover:bg-purple-700
        dark:focus:ring-purple-900'
        onClick={() => navigate('/profile')}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default HomePage;
