import { auth, googleProvider } from '../config/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export const Auth = () => {
  const signinWithGoogle = async () => {
    console.log('Logging in');
    // try {
    //   await signInWithPopup(auth, googleProvider);
    //   // await signInWithRedirect(auth, googleProvider);
    //   console.log(auth?.currentUser?.email);
    // } catch (err) {
    //   console.log('Error');
    // }
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("🚀 ~ file: auth.js:19 ~ .then ~ token:", token)
        // The signed-in user info.
        const user = result.user;
        console.log("🚀 ~ file: auth.js:22 ~ .then ~ user:", user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code;
        console.log("🚀 ~ file: auth.js:28 ~ signinWithGoogle ~ errorCode:", errorCode)
        const errorMessage = error.message;
        console.log("🚀 ~ file: auth.js:30 ~ signinWithGoogle ~ errorMessage:", errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log("🚀 ~ file: auth.js:33 ~ signinWithGoogle ~ email:", email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("🚀 ~ file: auth.js:36 ~ signinWithGoogle ~ credential:", credential)
        // ...
      });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('Error');
    }
  };

  return (
    <div>
      <form>
        <button onClick={signinWithGoogle}> Sign in with Google </button>

        <button onClick={logOut}>Log out</button>
      </form>
    </div>
  );
};
