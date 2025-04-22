import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { username, password });
            alert(response.data.message);
            navigate('/welcome', { state: { username } });
        } catch (error) {
            alert(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container fade-in">
            <h1>Вход в систему</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Имя пользователя"
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
                <button
                    type="button"
                    className="secondary"
                    onClick={() => navigate('/register')}
                    disabled={loading}
                >
                    Регистрация
                </button>
            </form>
        </div>
    );
};

export default Login;