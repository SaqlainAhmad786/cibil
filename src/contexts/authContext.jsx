import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [defaultersList, setDefaultersList] = useState([]);
    const [userDefaultersList, setUserDefaultersList] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [defaultersLoading, setDefaultersLoading] = useState(false);
    const [staticPath, setStaticPath] = useState('');
    const uid = localStorage.getItem('userId');

    useEffect(() => {
        if (uid) {
            refreshUserData();
            getDefaultersList();
            getUserDefaultersList();
        }
    }, [uid]);

    async function getUserData(uid) {
        setUserLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/userdataById/${uid}`).then(res => {
                setUserData(res.data.userData);
                setStaticPath(res.data.staticPath)
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

    async function getUserDefaultersList() {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/listOfDefaulterById`, { user_id: uid }).then(res => {
                setUserDefaultersList(res.data.data);
            })
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const refreshUserData = async () => {
        if (uid) {
            await getUserData(uid);
        }
    };

    const refreshDefaultersList = async () => {
        await getDefaultersList();
        await getUserDefaultersList();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserData({});
        setDefaultersList([]);
        setUserDefaultersList([]);
    };

    return (
        <AuthContext.Provider value={{ refreshUserData, refreshDefaultersList, logout, userData, defaultersList, userDefaultersList, userLoading, defaultersLoading, staticPath }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
