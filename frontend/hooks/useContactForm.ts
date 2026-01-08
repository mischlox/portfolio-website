import { useState, useCallback } from 'react';
import { EmailStr } from 'pydantic/EmailStr'; // Assuming Pydantic EmailStr is used on the backend

// Define the shape of the form data
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

// Define the possible submission states
export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

// --- Configuration ---
// Note: Use a relative path or proxied path, as discussed previously, 
// rather than hardcoding 'http://localhost:8000' unless necessary.
// Assuming your Next.js dev environment is configured to proxy /api/ to 8000, 
// or you use the absolute URL if no proxy is set up.
const API_ENDPOINT = 'http://localhost:8000/submit-contact'; 
// If using the Next.js rewrite proxy:
// const API_ENDPOINT = '/api/submit-contact'; 


export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'loading') return;

        setStatus('loading');
        setErrorMsg(null);
        
        try {
            const response = await fetch(API_ENDPOINT, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Success
                await response.json(); // Consume successful response body
                setStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                // Server returned an error (4xx or 5xx)
                let detail = 'Server responded with an unknown error.';
                
                // Attempt to parse JSON error response (Standard FastAPI behavior)
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    try {
                        const errorData = await response.json();
                        detail = errorData.detail || `Status ${response.status}: ${JSON.stringify(errorData)}`;
                    } catch (e) {
                        // Failed to parse JSON, fall through to default error
                        detail = `Status ${response.status}: Could not read error response.`;
                    }
                } else {
                    // Server returned non-JSON (HTML/Text) - the likely source of the JSON.parse error
                    detail = await response.text();
                    detail = detail.substring(0, 100) + (detail.length > 100 ? '...' : ''); // Truncate
                }
                
                setErrorMsg(detail);
                throw new Error(detail); // Throw error to jump to catch block

            }
        } catch (error) {
            console.error("Submission error:", error);
            // Only update status to 'error', errorMsg is already set inside the block
            setStatus('error');
        }
        
        // Reset status after a delay for better UX
        setTimeout(() => setStatus('idle'), 5000); 

    }, [formData, status]);

    return {
        formData,
        status,
        errorMsg,
        handleChange,
        handleSubmit,
    };
};