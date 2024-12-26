import ReCAPTCHA from 'react-google-recaptcha';

// --- Definición de la interfaz de datos de autenticación ---
export interface AuthData {
    email: string;
    username?: string;
    password: string;
    confirmPassword?: string;
    recaptchaToken: string | null;
}

// --- Validación de email ---
const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// --- Función para enviar datos de login ---
export const loginUser = async (email: string, password: string, recaptchaToken: string | null) => {
    if (!recaptchaToken) {
        throw new Error('Please complete the reCAPTCHA.');
    }

    const response = await fetch('/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            email: email,
            password: password,
            recaptcha: recaptchaToken,
        }).toString(),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Unknown error');
    }

    return await response.json();
};

// --- Función para manejar la lógica de registro ---
export const handleRegister = (
    data: AuthData,
    setEmailError: React.Dispatch<React.SetStateAction<string>>,
    setUsernameError: React.Dispatch<React.SetStateAction<string>>,
    setPasswordError: React.Dispatch<React.SetStateAction<string>>,
    setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>,
    setGeneralError: React.Dispatch<React.SetStateAction<string>>,
    recaptchaRef: React.RefObject<ReCAPTCHA>
) => {
    const { email, username, password, confirmPassword, recaptchaToken } = data;

    // Limpiar errores previos
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    // Validar email
    if (!validateEmail(email)) {
        setEmailError('The email format is invalid.');
        recaptchaRef.current?.reset(); // Restablecer reCAPTCHA
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        recaptchaRef.current?.reset(); // Restablecer reCAPTCHA
        return;
    }

    // Verificar que se haya completado el reCAPTCHA
    if (!recaptchaToken) {
        setGeneralError('Please complete the reCAPTCHA.');
        return;
    }

    // Enviar datos al backend
    return submitRegisterData({ email, username, password, recaptchaToken, recaptchaRef, setEmailError, setUsernameError, setPasswordError, setConfirmPasswordError, setGeneralError });
};

// --- Función para enviar los datos de registro ---
const submitRegisterData = async (
    data: AuthData & {
        recaptchaRef: React.RefObject<ReCAPTCHA>;
        setEmailError: React.Dispatch<React.SetStateAction<string>>;
        setUsernameError: React.Dispatch<React.SetStateAction<string>>;
        setPasswordError: React.Dispatch<React.SetStateAction<string>>;
        setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>;
        setGeneralError: React.Dispatch<React.SetStateAction<string>>;
    }
) => {
    const { email, username, password, recaptchaToken, recaptchaRef, setEmailError, setUsernameError, setPasswordError, setConfirmPasswordError, setGeneralError } = data;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: email,
                username: username || '',
                password: password,
                recaptcha: recaptchaToken || '',  // Usamos una cadena vacía en lugar de null
            }).toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            handleApiErrors(errorData, setEmailError, setUsernameError, setPasswordError, setConfirmPasswordError);
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        alert(data.message);
        window.location.href = '/login'; // Redirigir a login
    } catch (error) {
        if (error instanceof Error) {
            // Ahora TypeScript sabe que `error` es de tipo `Error`
            console.error('Registration error:', error.message);
            setGeneralError(error.message || 'Error connecting to the server.');
        } else {
            // Si `error` no es un `Error` tradicional
            console.error('Registration error: Unknown error');
            setGeneralError('Error connecting to the server.');
        }
    } finally {
        recaptchaRef.current?.reset(); // Reset reCAPTCHA después de enviar
    }
};

// --- Función para manejar errores del API ---
const handleApiErrors = (
    data: { error: string },
    setEmailError: React.Dispatch<React.SetStateAction<string>>,
    setUsernameError: React.Dispatch<React.SetStateAction<string>>,
    setPasswordError: React.Dispatch<React.SetStateAction<string>>,
    setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>
) => {
    if (data.error.includes('email')) setEmailError(data.error);
    if (data.error.includes('username')) setUsernameError(data.error);
    if (data.error.includes('password')) setPasswordError(data.error);
    if (data.error.includes('confirmPassword')) setConfirmPasswordError(data.error);
};

// --- Exportar las funciones de utilidad ---
export default { loginUser, handleRegister };
