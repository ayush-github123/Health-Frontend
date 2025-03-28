import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, User, Bot, LogOut, RefreshCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [currentResponse, setCurrentResponse] = useState('');
    const [typingMessage, setTypingMessage] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('');
    const chatContainerRef = useRef(null);
    const ws = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    const resetChat = () => {
        setMessages([]);
        setCurrentResponse('');
        setTypingMessage(null);
        setIsThinking(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to login page
    };

    useEffect(() => {
        let typingInterval;
        
        if (typingMessage) {
            let index = 0;
            setCurrentResponse(typingMessage[0]);
            setIsThinking(false);
            
            typingInterval = setInterval(() => {
                if (index + 1 < typingMessage.length) {
                    setCurrentResponse(prev => prev + typingMessage[index + 1]);
                    index++;
                } else {
                    clearInterval(typingInterval);
                    setTypingMessage(null);
                }
            }, 20);
        }

        return () => {
            if (typingInterval) clearInterval(typingInterval);
        };
    }, [typingMessage]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessages([{ sender: 'system', text: 'Authentication required!' }]);
            return;
        }

        ws.current = new WebSocket(`wss://health-backend-gjoo.onrender.com/ws/chat/?token=${encodeURIComponent(token)}`);

        ws.current.onopen = () => {
            setConnectionStatus("Connected to AI Assistant");
            setIsConnected(true);
        };
        ws.current.onclose = () => {
            setConnectionStatus("Connection closed");
            setIsConnected(false);
        };
        ws.current.onerror = () => {
            setConnectionStatus("Connection error");
            setIsConnected(false);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            let newMessages = [];
            if (typeof data.previous_messages === 'string') {
                try {
                    data.previous_messages = JSON.parse(data.previous_messages);
                } catch (error) {
                    console.error("Error parsing previous messages:", error);
                }
            }
            
            if (Array.isArray(data.previous_messages)) {
                newMessages = data.previous_messages.flatMap(msg => [
                    { sender: 'user', text: msg.message },
                    { sender: 'bot', text: msg.response }
                ]);
                setMessages(prev => [...prev, ...newMessages]);
            } 
            
            if (data.message) {
                const botMessage = { sender: 'bot', text: data.message };
                setMessages(prev => [...prev, botMessage]);
                setTypingMessage(data.message);
            }
        };

        return () => ws.current?.close();
    }, []);

    const handleSendMessage = () => {
        if (!inputText.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

        const userMessage = { sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMessage]);
        ws.current.send(JSON.stringify({ message: inputText }));
        setInputText('');
        setIsThinking(true);
    };

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, currentResponse]);

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#0E1420] to-[#1A2332] text-gray-200">
            {/* Sidebar */}
            <div className="w-16 bg-[#1A2332] border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
                <div className="p-2 bg-[#2C3E50] rounded-full">
                    <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
                <button 
                    onClick={resetChat}
                    className="hover:bg-[#2C3E50] p-2 rounded-full transition"
                    title="Reset Chat"
                >
                    <RefreshCcw className="h-5 w-5 text-gray-400 hover:text-blue-400" />
                </button>
                <button 
                    onClick={handleLogout}
                    className="hover:bg-[#2C3E50] p-2 rounded-full transition absolute bottom-4"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5 text-gray-400 hover:text-red-400" />
                </button>
            </div>

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col">
                {/* Header */}
                <div className="bg-[#1A2332] p-4 flex items-center justify-between border-b border-gray-800 shadow-lg">
                    <div className="flex items-center space-x-3">
                        <Bot className="h-6 w-6 text-blue-400" />
                        <h1 className="text-xl font-semibold text-gray-300">AI Assistant</h1>
                    </div>
                    <div 
                        className={`px-3 py-1 rounded-full text-sm ${
                            isConnected ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                        }`}
                    >
                        {connectionStatus}
                    </div>
                </div>

                {/* Chat Messages */}
                <div 
                    ref={chatContainerRef} 
                    className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar"
                >
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                max-w-[80%] p-3 rounded-xl shadow-lg 
                                ${message.sender === 'user' 
                                    ? 'bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-gray-200' 
                                    : 'bg-gradient-to-br from-[#1A2332] to-[#253241] text-gray-200'}
                                transition-all duration-300
                            `}>
                                <div className="flex items-center space-x-2 mb-1">
                                    {message.sender === 'user' ? (
                                        <User className="h-4 w-4 text-blue-400" />
                                    ) : (
                                        <Bot className="h-4 w-4 text-green-400" />
                                    )}
                                    <span className="text-xs text-gray-400 capitalize">{message.sender}</span>
                                </div>
                                {message.sender === 'bot' && index === messages.length - 1 && typingMessage
                                    ? <ReactMarkdown>{currentResponse}</ReactMarkdown>
                                    : <ReactMarkdown>{message.text}</ReactMarkdown>
                                }
                            </div>
                        </div>
                    ))}

                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="bg-[#1A2332] text-gray-400 p-3 rounded-xl animate-pulse flex items-center space-x-2">
                                <Bot className="h-5 w-5 text-green-400" />
                                <span>AI is Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <div className="bg-[#1A2332] p-4 border-t border-gray-800 sticky bottom-0">
                    <div className="flex rounded-xl bg-[#2C3E50] overflow-hidden shadow-lg">
                        <input
                            type="text"
                            className="flex-grow bg-transparent text-gray-200 px-4 py-3 focus:outline-none placeholder-gray-500"
                            placeholder="Send a message"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                        />
                        <button
                            className="bg-gradient-to-br from-blue-600 to-blue-800 text-gray-200 px-4 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                            onClick={handleSendMessage}
                            disabled={isThinking}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;