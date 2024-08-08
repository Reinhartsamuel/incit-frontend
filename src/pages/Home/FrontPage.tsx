import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();
  return (
    <div className='w-screen min-h-screen items-center justify-center flex relative'>
      <div className="flex flex-col gap-2 w-1/3">
      <div className="flex flex-col  w-full">
        <h1 className='text-6xl font-bold'>Welcome</h1>
        <p className='text-sm font-thin text-slate-200'>Please either sign in or sign up to continue</p>
      </div>
        <button
          onClick={() => navigate('/login')}
          type='button'
          className='w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        >
          Sign In
        </button>
        <button
        onClick={() => navigate('/signup')}
          type='button'
          className='w-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
