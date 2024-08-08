/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { cn } from '../../utils/cn';
import Spinner from '../../components/Spinner';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

interface SignUpInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function validatePassword(password: string, confirmPassword: string): string {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!regex.test(password)) {
    return 'Password must contain at least one lowercase, one uppercase, one digit, one special character, and be at least 8 characters long.';
  }
  return '';
}

const SignUpPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<SignUpInfo>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignupWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );
      const uid = userCredential.user.uid;
      const idToken = await userCredential.user.getIdToken(true);
      
      const results = await Promise.all([
        await axios.post('http://localhost:3000/users/create', {
          first_name: info.first_name,
          last_name: info.last_name,
          email: info.email,
          firebase_uid: uid,
          email_verified: false,
          number_of_login: 1,
        }),
        await axios.post('http://localhost:3000/users/generate-token', {
          token: idToken,
          email: info.email,
          name: `${info.first_name} ${info.last_name}`,
        }),
      ]);
      await auth.signOut();
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: `Please check your email ${info.email} to verify your account. Thank you!`,
      });
      console.log(results, 'results');

      //  console.log(userCredential, 'this is user credential');
      //  const idToken = await userCredential.user.getIdToken(true);
      //  console.log(idToken, 'this is id token');
    } catch (error: Error | any) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError('');
    e.preventDefault();
    for (const key in info) {
      if (info[key as keyof SignUpInfo] === '') {
        setLoading(false);
        return setError('Please fill in all fields.');
      }
    }
    const error = validatePassword(info.password, info.confirmPassword);
    if (error) {
      setLoading(false);
      return setError(error);
    }
    handleSignupWithEmail();
  };

  return (
    <div className='h-screen w-full flex'>
      <div className='h-full hidden md:flex flex-col items-center justify-between py-10 w-[50%] bg-[#18181B] bg-slate-900'>
        <p></p>
        <img
          alt='incit'
          src='https://media.licdn.com/dms/image/D560BAQG4neWXyNr5rw/company-logo_200_200/0/1690780852855/international_centre_for_industrial_transformation_ltd_logo?e=1730937600&v=beta&t=7MLm7btaEpwtqWOxBytwysIUVSf98BSILHZVhHbMiA0'
          className='h-20 w-auto rounded-lg'
        />
        <h3>Welcome to Incit Assessment by Reinhart 🚀 🚀</h3>
      </div>
      <div className='h-full w-full md:w-[50%] bg-white'>
        <div
          className='flex h-full gap-4 flex-col max-w-[75%]
          lg:max-w-[60%] items-center justify-center mx-auto'
        >
          <h3 className='text-3xl text-slate-900 font-bold text-center'>
            Sign Up
          </h3>
          <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                  text-slate-800
                  '
              id='firstName'
              placeholder='First Name'
              onChange={(e) => setInfo({ ...info, first_name: e.target.value })}
            />
            <input
              type='text'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                  text-slate-800
                  '
              id='lastName'
              placeholder='Last Name'
              onChange={(e) => setInfo({ ...info, last_name: e.target.value })}
            />
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
            <input
              type='password'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                  text-slate-800
                  '
              id='confirmPassword'
              placeholder='Confirm Password'
              onChange={(e) =>
                setInfo({ ...info, confirmPassword: e.target.value })
              }
            />
            {error && <p className='text-red-500'>{error}</p>}
            <button
              type='submit'
              className={cn(
                'w-full px-8 py-2 h-11 flex items-center bg-black text-white text-sm rounded-md hover:bg-black/[0.8] hover:shadow-lg justify-center',
                loading && 'disabled'
              )}
            >
              {loading ? <Spinner /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
