import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(token);
        }
    }, []);

    // const loggedIn = (token) => {
    //     localStorage.setItem('token', token);
    //     console.log(token)
    //     setAuth(token);
    // };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth('');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
