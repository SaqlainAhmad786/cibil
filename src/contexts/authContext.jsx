import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [defaultersList, setDefaultersList] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [defaultersLoading, setDefaultersLoading] = useState(false);
    const uid = localStorage.getItem('userId');

    useEffect(() => {
        if (uid) {
            refreshUserData();
            getDefaultersList();
        }
    }, [uid]);

    async function getUserData(uid) {
        setUserLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/userdataById/${uid}`).then(res => {
                setUserData(res.data.userData);
                setUserLoading(false);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserLoading(false);
        }
    }

    async function getDefaultersList() {
        setDefaultersLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/defaluterlist`).then(res => {
                setDefaultersList(res.data.list);
                setDefaultersLoading(false);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
            setDefaultersLoading(false);
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
        <AuthContext.Provider value={{ refreshUserData, logout, userData, defaultersList, userLoading, defaultersLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
