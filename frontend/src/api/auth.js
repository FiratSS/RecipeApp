import { auth, googleProvider, twitterProvider } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signOut as firebaseSignOut,
    signInWithPopup
} from 'firebase/auth';

export const createUserWithEmailAndPassword = (email, password) => {
    return firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

export const signInWithTwitter = () => {
    return signInWithPopup(auth, twitterProvider);
};
