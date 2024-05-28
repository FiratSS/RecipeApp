import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithGoogle,
    signInWithTwitter
} from '../api/auth';

function AuthDropdown() {
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(email, password);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(email, password);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTwitterSignIn = async () => {
        setLoading(true);
        try {
            await signInWithTwitter();
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-dropdown">
            {currentUser ? (
                <div>
                    <div>Welcome, {currentUser.email}</div>
                    <button onClick={handleSignOut} disabled={loading}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleSignIn} disabled={loading}>Sign In</button>
                    <button onClick={handleRegister} disabled={loading}>Register</button>
                    <button onClick={handleGoogleSignIn} disabled={loading}>Sign in with Google</button>
                    <button onClick={handleTwitterSignIn} disabled={loading}>Sign in with Twitter</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default AuthDropdown;
