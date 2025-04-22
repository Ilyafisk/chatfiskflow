# ChatFiskFlow - Защищённый мессенджер с многоуровневым шифрованием


ChatFiskFlow

## 🛡️ Особенности безопасности

- **Пятикратное шифрование** сообщений с использованием различных алгоритмов:
  - AES (Advanced Encryption Standard)
  - Triple DES (Data Encryption Standard)
  - Rabbit
  - RC4
  - Blowfish
- Уникальные ключи шифрования для каждого сообщения
- Безопасное хранение данных пользователей
- Защищённое соединение через WebSocket

## 🚀 Функциональность

- Регистрация и аутентификация пользователей
- Защищённый обмен сообщениями в реальном времени
- Возможность просмотра зашифрованных сообщений
- Современный и интуитивно понятный интерфейс
- Адаптивный дизайн для всех устройств

## 🛠️ Технологии

### Frontend
- React.js
- WebSocket для реального времени
- CryptoJS для шифрования
- Современный CSS с анимациями

### Backend
- Node.js
- Express.js
- MongoDB
- WebSocket
- Kafka для обработки сообщений

## 📦 Установка и запуск

### Предварительные требования
- Node.js (v14 или выше)
- MongoDB
- Kafka

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/chatfiskflow.git
cd chatfiskflow
```

2. Установите зависимости для backend:
```bash
cd backend
npm install
```

3. Установите зависимости для frontend:
```bash
cd ../frontend
npm install
```

4. Создайте файл .env в папке backend:
```env
MONGO_URL=your_mongodb_url
KAFKA_BROKER=your_kafka_broker
KAFKA_CLIENT_ID=your_client_id
KAFKA_TOPIC=your_topic
PORT=5000
```

### Запуск

1. Запустите backend:
```bash
cd backend
npm start
```

2. Запустите frontend:
```bash
cd frontend
npm start
```

3. Запустите приложение с помощью Docker Compose:
```bash
docker-compose up -d
```

3. Откройте браузер и перейдите по адресу: `http://localhost:3000`

## 🔒 Безопасность

- Все сообщения шифруются перед отправкой
- Ключи шифрования генерируются для каждого сообщения
- Данные пользователей защищены
- Безопасное хранение паролей с использованием bcrypt

## 🤝 Вклад в проект

Я приветствую вклад в развитие проекта! Если вы хотите внести свой вклад:

1. Форкните репозиторий
2. Создайте ветку для ваших изменений
3. Сделайте коммит ваших изменений
4. Отправьте pull request


## 📞 Контакты

По всем вопросам обращайтесь:
- Email: ilyafiskhanov@gmail.com
- Telegram: https://t.me/ilya_fisk
- GitHub: [Ilyafisk](https://github.com/Ilyafisk)

---

Сделано с ❤️ для безопасного общения