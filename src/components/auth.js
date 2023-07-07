import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Auth = () => {
  const { setLoggedIn, setUserId } = useContext(UserContext);

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
      setUserId(auth.currentUser.uid);
    } catch (err) {
      console.log('Error');
    }
  };

  return (
    <div>
      <form>
        <button onClick={(e) => signinWithGoogle(e)}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
};
