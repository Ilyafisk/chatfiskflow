import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chat from '../Chat';

const Welcome = () => {
    const location = useLocation();
    const { username } = location.state || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    // Защита маршрута
    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    return (
        <div>
            <h1>Добро пожаловать, {username}!</h1>
            {username ? (
                <div>
                    <Chat username={username} />
                    <button onClick={handleLogout} style={{ marginTop: '20px' }}>Выйти</button>
                </div>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => navigate('/register')}>Регистрация</button>
                    <button onClick={() => navigate('/login')} style={{ marginLeft: '10px' }}>Вход</button>
                </div>
            )}
        </div>
    );
};

export default Welcome;