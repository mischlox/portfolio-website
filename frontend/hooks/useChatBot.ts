// hooks/useChatBot.ts

import { useState, useCallback, useRef } from 'react';
import { PROFILE } from '../components/Common/Data'; // Import PROFILE for initial message

// Define the Message type here, or import it if defined globally
export type Message = { role: 'user' | 'ai'; text: string };

export const useChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            role: 'ai', 
            text: `Hello! I'm the portfolio assistant for ${PROFILE.first_name}. 
I can answer detailed questions about his experience, tech stack, and projects using the full RAG-enabled portfolio data. 
I can also generate tailored emails to directly contact him. How can I help you today?` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { role: 'user', text: input };
        
        // --- 1. Prepare State Updates ---
        // Filter out the initial AI message from history for the API call
        const historyForAPI = messages.filter(m => m.role !== 'ai' || !m.text.startsWith('Hello! I\'m the portfolio assistant'));

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // --- 2. API Call to FastAPI Backend ---
            const response = await fetch('http://localhost:8000/chat', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    history: historyForAPI.map(m => ({ role: m.role, text: m.text })),
                }),
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            const aiResponseText = data.response;

            // --- 3. Update with AI response ---
            setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);

        } catch (error) {
            console.error("Failed to fetch AI response:", error);
            setMessages(prev => [...prev, { role: 'ai', text: 'Error: Could not connect to the FastAPI server. Check console for details.' }]);
        } finally {
            setIsTyping(false);
        }
    }, [input, isTyping, messages]); // Dependencies for useCallback

    return {
        messages,
        input,
        isTyping,
        setInput,
        handleSend,
    };
};