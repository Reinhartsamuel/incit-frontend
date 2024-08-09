/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import Spinner from '../../components/Spinner';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';
import moment from 'moment';
import Swal from 'sweetalert2';

interface LoginInfo {
  email: string;
  password: string;
};


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();





const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const customToken = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<LoginInfo>({ email: '', password: '' });


  const updateUserData = async (userSql:any) => {
          // update user data
          await axios.put(`https://striking-illumination-production.up.railway.app/users/update/${userSql?.data[0]?.id}`, {
            last_login : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            number_of_login : userSql?.data[0]?.number_of_login ? userSql?.data[0]?.number_of_login + 1 : 1
          });
  }
  const handleLoginEmail = async () => {
    try {
      const { email , password } = info;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      const userCredential = await  signInWithEmailAndPassword(auth, email, password);


      // get user data from sql
      const {data : userSql} = await axios.get(`https://striking-illumination-production.up.railway.app/users/query?firebase_uid=${userCredential?.user?.uid}`);
      localStorage.setItem('userSql', JSON.stringify(userSql?.data[0]));


      await updateUserData(userSql);
    } catch (error: any) {
      window.alert(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      })
    }
  };


  const handleLoginGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result, 'result');
      const user = result?.user;

      const {data} = await axios.get(`https://striking-illumination-production.up.railway.app/users/query?firebase_uid=${user?.uid}`);
      const findExistingUser = data?.data;
      if(findExistingUser?.length > 0) {
        // send new data to sql
        const newData = {
          first_name: user?.displayName?.split(' ')[0] || user?.displayName,
          last_name: user?.displayName?.split(' ')[1] || '-',
          email: user?.email || '',
          firebase_uid: user?.uid || '',
          email_verified: true,
          number_of_login: 1
        };
        const sendToSql = await axios.post('https://striking-illumination-production.up.railway.app/users/create', newData);
        console.log(sendToSql.data, 'sendToSql.data!!!!!');
      } else {
        // update last login sql
        await updateUserData(data);
      }
    } catch (error : Error | any) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      })
      console.error(error.message, ':::this is error login');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result, 'result');
      const user = result?.user;
    } catch(error : Error | any) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      })
      console.error(error.message, ':::this is error login');
    }
  }

  const handleLoginCustomToken = async () => {
    if (!customToken) return;
    signInWithCustomToken(auth, customToken)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, 'user is here');
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  useEffect(() => {
    if (customToken) {
      handleLoginCustomToken();
    }
  }, [customToken]);

  return (
    <div className='h-screen w-full flex'>
      <div className='h-full hidden md:flex flex-col items-center justify-between py-10 w-[50%] bg-[#18181B] bg-slate-900'>
        <p></p>
        <img
          alt='incit'
          src='https://media.licdn.com/dms/image/D560BAQG4neWXyNr5rw/company-logo_200_200/0/1690780852855/international_centre_for_industrial_transformation_ltd_logo?e=1730937600&v=beta&t=7MLm7btaEpwtqWOxBytwysIUVSf98BSILHZVhHbMiA0'
          className='h-20 w-auto rounded-lg'
        />
        <h3>Welcome to INCIT Assessment by Reinhart 🚀 🚀</h3>
      </div>
      <div className='h-full w-full md:w-[50%] bg-white'>
        <div
          className='flex h-full gap-4 flex-col max-w-[75%]
          lg:max-w-[60%] items-center justify-center mx-auto'
        >
          <h3 className='text-3xl text-slate-900 font-bold text-center'>
            Login now
          </h3>
          <div className='flex flex-col w-full gap-2'>
            <input
              type='email'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                  text-slate-800
                  '
              id='email'
              placeholder='name@example.com'
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <input
              type='password'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                  text-slate-800
                  '
              id='password'
              placeholder='Password'
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
            <button
              className={cn(
                'w-full px-8 py-2 h-11  bg-black text-white text-sm rounded-md hover:bg-black/[0.8] hover:shadow-lg',
                loading && 'disabled'
              )}
              onClick={handleLoginEmail}
            >
              {loading ? 'Please wait...' : 'Login with email'}
            </button>
          </div>
          <div className='relative my-4 flex w-full items-center text-xs uppercase text-slate-900'>
            <div className='w-full flex h-0 border-[0.5px] border-slate-300' />
            <span className='bg-background wrap-no-wrap px-2 text-muted-foreground whitespace-nowrap'>
              or continue with
            </span>
            <div className='w-full flex h-0 border-[0.5px] border-slate-300' />
          </div>

          <button
            className={`w-full flex items-center justify-center gap-2 px-8 py-2 h-11 border-[1px] border-slate-300 bg-white text-slate-800 text-sm rounded-md font-semibold  hover:${
              !loading && 'shadow-xl'
            }`}
            disabled={loading}
            onClick={() => handleLoginGoogle()}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  className='w-5'
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'
                  }
                />
                <p>Google</p>
              </>
            )}
          </button>
          <button
            className={`w-full flex items-center justify-center gap-2 px-8 py-2 h-11 border-[1px] border-slate-300 bg-white text-slate-800 text-sm rounded-md font-semibold  hover:${
              !loading && 'shadow-xl'
            }`}
            disabled={loading}
            onClick={() => handleLoginFacebook()}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  className='w-5'
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'
                  }
                />
                <p>Facebook</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
