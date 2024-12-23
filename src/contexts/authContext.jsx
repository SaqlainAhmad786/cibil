import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [defaultersList, setDefaultersList] = useState([]);
    const [userDefaultersList, setUserDefaultersList] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [defaultersLoading, setDefaultersLoading] = useState(false);
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
        const uid = localStorage.getItem('userId');
        if (uid) {
            await getUserData(uid);
        }
    };

    const indianStates = [
        { code: 'AP', name: 'Andhra Pradesh' },
        { code: 'AR', name: 'Arunachal Pradesh' },
        { code: 'AS', name: 'Assam' },
        { code: 'BR', name: 'Bihar' },
        { code: 'CT', name: 'Chhattisgarh' },
        { code: 'GA', name: 'Goa' },
        { code: 'GJ', name: 'Gujarat' },
        { code: 'HR', name: 'Haryana' },
        { code: 'HP', name: 'Himachal Pradesh' },
        { code: 'JH', name: 'Jharkhand' },
        { code: 'KA', name: 'Karnataka' },
        { code: 'KL', name: 'Kerala' },
        { code: 'MP', name: 'Madhya Pradesh' },
        { code: 'MH', name: 'Maharashtra' },
        { code: 'MN', name: 'Manipur' },
        { code: 'ML', name: 'Meghalaya' },
        { code: 'MZ', name: 'Mizoram' },
        { code: 'NL', name: 'Nagaland' },
        { code: 'OR', name: 'Odisha' },
        { code: 'PB', name: 'Punjab' },
        { code: 'RJ', name: 'Rajasthan' },
        { code: 'SK', name: 'Sikkim' },
        { code: 'TN', name: 'Tamil Nadu' },
        { code: 'TG', name: 'Telangana' },
        { code: 'TR', name: 'Tripura' },
        { code: 'UP', name: 'Uttar Pradesh' },
        { code: 'UT', name: 'Uttarakhand' },
        { code: 'WB', name: 'West Bengal' }
    ];

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserData({});
        setDefaultersList([]);
        setUserDefaultersList([]);
    };

    return (
        <AuthContext.Provider value={{ refreshUserData, logout, userData, defaultersList, userDefaultersList, userLoading, defaultersLoading, indianStates }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
