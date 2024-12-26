import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { handleRegister } from '../../services/Auth';  // Importar la función handleRegister desde Auth.ts

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [generalError, setGeneralError] = useState<string>('');
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const onRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        // Clear errors before making a new request
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setGeneralError('');

        // Validar datos y delegar a la función handleRegister
        const registrationData = {
            email,
            username,
            password,
            confirmPassword,
            recaptchaToken,
        };

        handleRegister(
            registrationData,
            setEmailError,
            setUsernameError,
            setPasswordError,
            setConfirmPasswordError,
            setGeneralError,
            recaptchaRef
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111827]">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-800 shadow-lg">
                <h2 className="text-center text-2xl font-semibold text-gray-300">Sign Up</h2>
                <form id="registerForm" onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            className={`block w-full px-4 py-2 mt-1 text-white bg-[#111827] rounded-md focus:outline-none focus:ring focus:ring-purple-400 ${emailError ? 'border-red-500' : ''}`}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            className={`block w-full px-4 py-2 mt-1 text-white bg-[#111827] rounded-md focus:outline-none focus:ring focus:ring-purple-400 ${usernameError ? 'border-red-500' : ''}`}
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className={`block w-full px-4 py-2 mt-1 text-white bg-[#111827] rounded-md focus:outline-none focus:ring focus:ring-purple-400 ${passwordError ? 'border-red-500' : ''}`}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            className={`block w-full px-4 py-2 mt-1 rounded-md text-white bg-[#111827] focus:outline-none focus:ring focus:ring-purple-400 ${confirmPasswordError ? 'border-red-500' : ''}`}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                    </div>
                    <ReCAPTCHA
                        sitekey="6Le7JFYqAAAAAHYhlaFSM-wPV-nZUalamkrYH7fy" // Make sure to use your public key
                        onChange={onRecaptchaChange}
                        className="flex items-center justify-center"
                        ref={recaptchaRef}
                    />
                    {generalError && <p className="text-red-500 text-sm text-center">{generalError}</p>}
                    <button 
                        type="submit" 
                        className="w-full py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
                    >
                        Sign up
                    </button>
                </form>
                <p className="mt-3 text-center text-gray-300">
                    Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
