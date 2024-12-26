import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser } from '../../services/Auth'; // Importar la función

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [generalError, setGeneralError] = useState<string>('');
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const onRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        // Clear errors before making a new request
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        try {
            const data = await loginUser(email, password, recaptchaToken);
            console.log('Respuesta del servidor:', data);

            if (data.username) {
                const auth = {
                    username: data.username,
                    avatar_url: data.avatar_url,
                    banner_url: data.banner_url,
                };
                localStorage.setItem('auth', JSON.stringify(auth));
            }

            window.location.href = '/home'; // Redireccionar a la página principal
        } catch (error: unknown) {
            console.error('Login error:', error);
        
            // Comprobar si el error es una instancia de Error
            if (error instanceof Error) {
                setGeneralError(error.message || 'Error connecting to the server.');
            } else {
                // Si el error no es una instancia de Error, puedes manejarlo de otra forma
                setGeneralError('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111827]">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-800 shadow-lg">
                <h2 className="text-center text-2xl font-semibold text-gray-300">Login</h2>
                <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
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
                    <ReCAPTCHA
                        sitekey="6Le7JFYqAAAAAHYhlaFSM-wPV-nZUalamkrYH7fy" // Make sure to use your public key
                        onChange={onRecaptchaChange}
                        className="flex items-center justify-center"
                    />
                    {generalError && <p className="text-red-500 text-sm text-center">{generalError}</p>}
                    <button 
                        type="submit" 
                        className="w-full py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-3 text-center text-gray-300">
                    Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
