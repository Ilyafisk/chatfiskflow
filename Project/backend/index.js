require("dotenv").config();
const express= require("express")
const cors= require("cors")
const bodyParser= require("body-parser")
const {Kafka}= require("kafkajs")
const connectDB = require("./db")
const router = require("./routes/authRoutes")


const app = express();
const PORT = process.env.PORT||5000


connectDB()
// подключаем middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json())

app.use("/auth", router);

// иницализация Kafka 

const kafka= new Kafka({

    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer ({
    groupId : "chat-group"
});

//функция для запуска kafka

const runKafka = async()=>{
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({
        topic:process.env.KAFKA_TOPIC,
        fromBeginning:true
    })
    consumer.run({
        eachMessage:async({topic,partition, message})=>{
            console.log(`Полученно сообщение: ${message.value.toString()}`);
        },
    });
};

// запускаем kafka при старте сервера

runKafka().catch(console.error);


app.get("/",(req,res)=>{
    res.send("СЕРВЕР РАБОТАЕТ!")
})

app.listen(PORT,()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`)
});

app.post("/send", async(req,res)=>{
    const{message}=req.body;
    if(!message){
        return res.status(400).json({error:"Сообщение не может быть пустым"})
    }
    try{
        await producer.send({
            topic:process.env.KAFKA_TOPIC,
            messages: [{value:message}],
        });
        res.json({success:true, message:"Сообщение отправлено в Kafka"});
    }catch(error){
        console.error("Ошибка при отправки",error);
        res.status(500).json({error:"Ошибка при отправки сообщения(сервер)"})
    }

});
