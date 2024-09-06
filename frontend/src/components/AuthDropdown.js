import React, { useState, useEffect, useContext } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

function AuthDropdown() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log("Redirect sign-in successful:", result);
                }
            } catch (error) {
                console.error("Redirect sign-in error:", error);
            }
        };
        checkRedirectResult();
    }, []);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            console.log("Attempting to sign in with:", email, password);
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Sign In successful");
            setError('');
        } catch (err) {
            console.error("Sign In error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            console.log("Attempting to register with:", email, password);
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account creation successful");
            setError('');
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        console.log("Attempting to sign in with Google");
        signInWithRedirect(auth, googleProvider);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sign Out successful");
        } catch (err) {
            console.error("Sign Out error:", err);
            setError(err.message);
        }
    };

    return (
        <div>
            {!currentUser ? (
                <>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                    {isRegistering && (
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                            style={{ display: 'block', marginBottom: '10px' }}
                        />
                    )}
                    {isRegistering ? (
                        <button onClick={handleRegister} disabled={loading} style={{ display: 'block', marginBottom: '10px' }}>
                            {loading ? "Registering..." : "Create an account"}
                        </button>
                    ) : (
                        <button onClick={handleSignIn} disabled={loading} style={{ display: 'block', marginBottom: '10px' }}>
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    )}
                    <button onClick={() => setIsRegistering(!isRegistering)} style={{ display: 'block', marginBottom: '10px' }}>
                        {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Create one"}
                    </button>
                    <button onClick={handleGoogleSignIn} style={{ display: 'block', marginBottom: '10px' }}>Sign in with Google</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <button onClick={handleSignOut} style={{ display: 'block', marginBottom: '10px' }}>Sign Out</button>
            )}
        </div>
    );
}

export default AuthDropdown;
