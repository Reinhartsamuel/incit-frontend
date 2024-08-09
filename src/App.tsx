/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './App.css';
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from './config/firebase';
import AuthRouter from './routes/AuthRouter';
import MainRouter from './routes/MainRouter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2'
function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(
            `https://striking-illumination-production.up.railway.app/users/query?firebase_uid=${user.uid}`
          )
          .then((response) => {
            // console.log(response.data);
            const user = Array.isArray(response?.data?.data)
              ? response?.data?.data[0]
              : {};
            if (user?.email_verified) {
              setUser(user);
            } else {
              // Swal.fire({icon:'warning',text:'email not verified'});
              auth.signOut();
            }
          });
        navigate('/');
      } else {
        setUser(null);
      }
    });

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';
        return signInWithEmailAndPassword(auth, email, password);
      })
  }, []);
  return <>{user ? <MainRouter /> : <AuthRouter />}</>;
}

export default App;
