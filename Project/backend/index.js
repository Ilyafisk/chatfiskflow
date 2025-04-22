require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");
const connectDB = require("./db");
const router = require("./routes/authRoutes");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 5000;

// WebSocket сервер
const wss = new WebSocket.Server({ port: 8080 });

connectDB();

// Подключаем middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/auth", router);

// Инициализация Kafka
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({
    groupId: "chat-group",
});

// Функция для запуска Kafka
const runKafka = async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({
        topic: process.env.KAFKA_TOPIC,
        fromBeginning: true,
    });
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Получено сообщение: ${message.value.toString()}`);
        },
    });
};

// Запускаем Kafka при старте сервера
runKafka().catch(console.error);

// Обработка WebSocket соединений
wss.on("connection", (ws) => {
    console.log("Новое WebSocket соединение");

    // Получаем имя пользователя от клиента
    ws.on("message", (username) => {
        console.log(`Пользователь ${username} подключен`);

        // Создаем consumer для этого пользователя
        const userConsumer = kafka.consumer({ groupId: `user_${username}` });
        userConsumer.connect().then(() => {
            userConsumer.subscribe({ topic: `user_${username}`, fromBeginning: true });
            userConsumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    // Отправляем сообщение клиенту через WebSocket
                    ws.send(message.value.toString());
                },
            });
        });

        // Обработка закрытия соединения
        ws.on("close", () => {
            console.log(`Пользователь ${username} отключен`);
            userConsumer.disconnect();
        });
    });
});

// Роут для отправки сообщений
app.post("/send", async (req, res) => {
    const { from, to, message, encryptedMessage, keys } = req.body;
    if (!from || !to || !message || !encryptedMessage || !keys) {
        return res.status(400).json({ error: "Необходимо указать все поля сообщения" });
    }
    try {
        await producer.send({
            topic: `user_${to}`,
            messages: [{ 
                value: JSON.stringify({ 
                    from, 
                    message,
                    encryptedMessage,
                    keys,
                    timestamp: new Date().toLocaleTimeString()
                }) 
            }],
        });
        res.json({ success: true, message: "Сообщение отправлено" });
    } catch (error) {
        console.error("Ошибка при отправке сообщения", error);
        res.status(500).json({ error: "Ошибка при отправке сообщения" });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});