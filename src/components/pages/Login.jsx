import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../modals/ModalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showModal } = useModal();

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const openModal = () => {
        showModal('forgetPassword');
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const remember = formData.get('remember') === 'on';

        setUsername(username);
        setPassword(password);
        setRemember(remember);
        setErrorMessage('');
        console.log('Login attempt:', { username, password, remember });
        navigate('/dashboard');
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen bg-[url(/public/assets/images/login/login-background-image.jpg)] bg-cover bg-center">
                <div>
                    <img src="/assets/images/login/login-logo.png" alt="Logo" />
                </div>
                <div className="bg-white m-4 p-8 border border-[#1E3E55] rounded-lg shadow-xl w-96 text-black min-h-[300px]">
                    <form className="flex flex-col justify-evenly h-full gap-4" action="/login" method="POST" onSubmit={ handleLogin }>
                        <div className="flex flex-col w-full">
                            <label htmlFor="username" className="mb-2">Identifiant ou email:</label>
                            <input type="text" id="username" name="username" className="border border-black p-2" autoComplete='on' required />
                        </div>
                        <div className="flex flex-col w-full relative">
                            <label htmlFor="password" className="mb-2">Mot de passe:</label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                name="password" 
                                className="border border-black p-2 pr-[35px]" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={ togglePasswordVisibility }
                                className="absolute right-2 bottom-2 text-black cursor-pointer hover:text-[#1E3E55]"
                            >
                                <FontAwesomeIcon icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                        {errorMessage && (
                            <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                                {errorMessage}
                            </div>
                        )}
                        <div>
                            <label htmlFor='remember' className="inline-flex items-center">
                                <input type="checkbox" id='remember' name="remember" />
                                <span className="ml-2">Se souvenir de moi</span>
                            </label>
                        </div>
                        <button type="submit" className="cursor-pointer border rounded-md border-[#1E3E55] bg-[#306285] text-lg text-white font-semibold p-2 hover:bg-[#1E3E55] transition duration-200 ease-in-out">Se connecter</button>
                    </form>
                </div>
                <div className="w-96">
                    <button className="text-white text-sm font-thin italic cursor-pointer hover:underline" onClick={ openModal }>Mot de passe oublié ?</button>
                </div>
            </div>
        </>
    );
}
export default Login;