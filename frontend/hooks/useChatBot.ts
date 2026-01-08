// hooks/useChatBot.ts

import { useState, useCallback, useRef } from 'react';
import { PROFILE } from '../components/Common/Data'; // Import PROFILE for initial message

// Define the Message type here, or import it if defined globally
export type Message = { role: 'user' | 'ai'; text: string; action?: string };

// Define a constant for the delay before action execution (e.g., 1500ms or 1.5 seconds)
const ACTION_DELAY_MS = 1500; 

export const useChatBot = (onAction: (action: string) => void) => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            role: 'ai', 
            text: `Hello! I'm ${PROFILE.first_name}'s AI assistant. 
I can answer detailed questions about his experience, tech stack, and projects using the full RAG-enabled portfolio data. 
I can also navigate this website for you.\n\nHow can I help you today?` 
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
                // Attempt to read error message if available
                const errorDetail = await response.text();
                console.error("API call failed:", response.status, errorDetail);
                throw new Error(`API call failed: ${response.statusText}`);
            }
            
            // EXPECTING: { "response": "text", "action": "SCROLL_TO_CONTACT" }
            const data = await response.json();
            const aiResponseText = data.response;
            const action = data.action; // <-- Extract the action key

            // --- 3. Update with AI response ---
            setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
            
            // --- 4. Execute UI Action with Delay ---
            if (action && action !== 'none') {
                // Wait for ACTION_DELAY_MS before executing the scroll
                setTimeout(() => {
                    onAction(action); 
                }, ACTION_DELAY_MS);
            }

        } catch (error) {
            console.error("Failed to fetch AI response:", error);
            setMessages(prev => [...prev, { role: 'ai', text: 'Error: Could not connect to the FastAPI server. Check console for details.' }]);
        } finally {
            setIsTyping(false);
        }
    }, [input, isTyping, messages, onAction]); // Add onAction dependency

    return {
        messages,
        input,
        isTyping,
        setInput,
        handleSend,
    };
};