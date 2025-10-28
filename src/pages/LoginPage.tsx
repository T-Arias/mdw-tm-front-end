import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { login } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    useEffect(() => {
        console.log('Auth state changed:', auth);
    }, [auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await authService.login({ email, password });
        if (response) {
            dispatch(login(response));
            navigator('/home');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <h2>Login</h2>
            <input
                autoComplete='email'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '8px' }}
            />
            <input
                autoComplete='current-password'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '8px' }}
            />
            <button type="submit">
                Iniciar Sesión
            </button>
        </form>
    );
};

export default Login;