import React, { useState, useEffect, useRef } from 'react';
import { encryptMessage, decryptMessage } from './utils/encryption';

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [showEncrypted, setShowEncrypted] = useState(false);
    const ws = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            console.log('WebSocket подключен');
            ws.current.send(username);
        };
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const decryptedMessage = decryptMessage(message.encryptedMessage, message.keys);
            setMessages((prevMessages) => [...prevMessages, {
                ...message,
                message: decryptedMessage
            }]);
        };
        return () => {
            ws.current.close();
        };
    }, [username]);

    const sendMessage = () => {
        if (inputMessage && recipient) {
            const { encryptedMessage, keys } = encryptMessage(inputMessage);
            
            const messageData = {
                from: username,
                to: recipient,
                message: inputMessage,
                encryptedMessage,
                keys,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prevMessages) => [...prevMessages, messageData]);
            setInputMessage('');

            fetch('http://localhost:5000/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data.success) {
                        console.error("Ошибка при отправке сообщения");
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при отправке сообщения:", error);
                });
        }
    };

    return (
        <div className="chat-container fade-in">
            <h2>Защищённый чат: {username}</h2>
            <div className="checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        checked={showEncrypted}
                        onChange={(e) => setShowEncrypted(e.target.checked)}
                    />
                    Показать зашифрованные сообщения
                </label>
            </div>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from === username ? 'self' : 'other'} fade-in`}>
                        <div className="message-header">
                            <strong>{msg.from}</strong> <small>({msg.timestamp})</small>
                        </div>
                        <div className="message-content">
                            <div>{msg.message}</div>
                            {showEncrypted && msg.encryptedMessage && (
                                <div className="encrypted-message">
                                    <small>Зашифрованное сообщение:</small>
                                    <div className="encrypted-text">{msg.encryptedMessage}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Кому"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Chat;  