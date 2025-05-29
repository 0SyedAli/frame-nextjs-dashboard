import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired } from '../utils/auth';
import { useRouter } from 'next/router';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Load token from localStorage on initial render
        const storedToken = localStorage.getItem('accessToken');
        setToken(storedToken);

        const checkTokenValidity = () => {
            if (storedToken && isTokenExpired(storedToken)) {
                setModalOpen(true);
                localStorage.removeItem('accessToken');
            }
        };

        // Check token validity periodically (every minute)
        const interval = setInterval(checkTokenValidity, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        router.push('/login?message=TokenExpired'); // Redirect to login
    };

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Your session has expired. Please log in again.</p>
                        <button onClick={handleModalClose}>OK</button>
                    </div>
                </div>
            )}
        </TokenContext.Provider>
    );
};

export default TokenProvider;