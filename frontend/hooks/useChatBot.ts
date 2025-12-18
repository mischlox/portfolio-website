// hooks/useChatBot.ts

import { useState, useCallback, useRef } from 'react';
import { PROFILE } from '../components/Common/Data'; // Import PROFILE for initial message

// Define the Message type here, or import it if defined globally
export type Message = { role: 'user' | 'ai'; text: string };

export const useChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: `System initialized. I have loaded ${PROFILE.first_name}'s professional vector embeddings. \n\nHow can I assist you today?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { role: 'user', text: input };
        
        // --- 1. Prepare State Updates ---
        // Capture the current history before adding the new message
        const historyForAPI = messages.filter(m => m.role !== 'ai' || !m.text.startsWith('System initialized'));

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