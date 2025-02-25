import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [defaultersList, setDefaultersList] = useState([]);
    const [userDefaultersList, setUserDefaultersList] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [defaultersLoading, setDefaultersLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            refreshUserData();
            getDefaultersList();
            getUserDefaultersList();
        }
    }, [token]);

    async function getDefaultersList() {
        setDefaultersLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/defaulter`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
                setDefaultersList(res.data.allDefaulter);
                setDefaultersLoading(false);
            })
        } catch (error) {
            console.error('Error fetching defaulter list:', error);
            setDefaultersLoading(false);
        }
    }

    async function getUserData(token) {
        setUserLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/user/current-user`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
                setUserData(res.data.user);
                setUserLoading(false);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserLoading(false);
        }
    }

    async function getUserDefaultersList() {
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/defaulter/defaulter-by-current-user`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
                setUserDefaultersList(res.data);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const refreshUserData = () => {
        if (!token) return;
        getUserData(token);
    };

    const refreshDefaultersList = () => {
        getDefaultersList();
        // getUserDefaultersList();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserData({});
        setDefaultersList([]);
        setUserDefaultersList([]);
    };

    return (
        <AuthContext.Provider value={{ refreshUserData, userDefaultersList, refreshDefaultersList, logout, userData, defaultersList, userLoading, defaultersLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
