import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false); // State for authentication (user data or JWT token)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(true);
            console.log(auth)   
        }
    }, [auth]);

    const login = (token) => {
        // Store the token or user data when logging in
        localStorage.setItem('token', token);
        // setAuth(true);
    };

    const logout = () => {
        // Remove the token and reset the state when logging out
        localStorage.removeItem('token');
        // setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
