const express = require("express")
const User = require("../models/User")


const router = express.Router();

//регистрация пользователя

router.post("/register",async (req,res)=>{

    const{username,password}= req.body;
    if (!username || !password) return res.status(400).json({error:"Все поля обязательные"});

    try{
        const userExists = await User.findOne({username});
        if (userExists) return res.status(400).json({error:"Пользователь существует"});

        const user = await User.create({username,password});
        res.json({success:true,message: "пользователь зарегистрирован",userId:user._id});
    }catch(error){
        res.status(500).json({error:"ошибка сервера(регистрации)"})
    }
});

router.post("/login",async(req,res)=>{
    const{username,password}= req.body;
    if (!username || !password) return res.status(400).json({error:"Все поля обязательные"});
    try{
        const user = await User.findOne({username});
        if(!user || !(await user.matchPassword(password))){
           return res.status(400).json({error:" неверные данные"});
        }
        res.json({success:true,message:"Вход выполнен" ,userId:user._id})
    }catch(error){
        console.error(error);  // Добавьте логирование ошибки
        res.status(500).json({error: "ошибка сервера(входа)"})
    }
});
module.exports = router;