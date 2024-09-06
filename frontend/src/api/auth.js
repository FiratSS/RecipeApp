import { auth, db, googleProvider, twitterProvider } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signOut as firebaseSignOut,
    signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const createUserWithEmailAndPassword = async (email, password, username) => {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username,
    });
    return userCredential;
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

export const getEmailByUsername = async (username) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().email;
    }
    throw new Error('No such user');
};