import React from 'react';
import {useLocation} from "react-router-dom";
const Welcome = () => {
    const location = useLocation();
    const{username} = location.state || {username:"Гость"};

    return <div>Добро пожаловать {username}</div>;
};

export default Welcome;