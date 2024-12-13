import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const uid = localStorage.getItem('userId');

    useEffect(() => {
        if (uid) {
            refreshUserData();
        }
    }, [uid]);

    async function getUserData(uid) {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/userdataById/${uid}`).then(res => {
                setUserData(res.data.userData);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const refreshUserData = async () => {
        const uid = localStorage.getItem('userId');
        if (uid) {
            await getUserData(uid);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserData({});
    };

    return (
        <AuthContext.Provider value={{ refreshUserData, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
