import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{

            const response = await axios.post('http://localhost:5000/auth/login',{username,password});
            alert(response.data.message);
            navigate('/welcome', {state:{username}})
        }catch(error){
           alert(error.response.data.error) 
        }
    };

    return(
        <form onSubmit= {handleSubmit}>
            <input type="text" value ={username} onChange={(e)=>setUsername(e.target.value)} placeholder = "Имя пользователя" required/>
            <input type="password" value ={password} onChange={(e)=>setPassword(e.target.value)} placeholder = "Пароль" required/>
            <button type="submit"> Вход</button>
        </form>

    );

};

export default Login;