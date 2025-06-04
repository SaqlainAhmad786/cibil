import { createContext, useContext, useEffect, useMemo, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [defaultersList, setDefaultersList] = useState([])
    const [userDefaultersList, setUserDefaultersList] = useState([])
    const [userLoading, setUserLoading] = useState(false)
    const [plans, setPlans] = useState([])
    const [defaultersLoading, setDefaultersLoading] = useState(false)
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            refreshUserData()
            getDefaultersList()
            getUserDefaultersList()
            loadPlans()
        }
    }, [token])

    const userDataContext = useMemo(() => ({ userData, setUserData }), [userData])

    async function getDefaultersList() {
        setDefaultersLoading(true)
        try {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}/defaulter`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setDefaultersList(res.data.allDefaulter)
                    setDefaultersLoading(false)
                })
        } catch (error) {
            console.error("Error fetching defaulter list:", error)
            setDefaultersLoading(false)
        }
    }

    async function getUserData(token) {
        setUserLoading(true)
        try {
            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}/user/current-user`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((res) => {
                    setUserData(res.data.user)
                    setUserLoading(false)
                })
        } catch (error) {
            console.error("Error fetching user data:", error)
            setUserLoading(false)
        }
    }

    async function getUserDefaultersList() {
        try {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}/defaulter/defaulter-by-current-user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUserDefaultersList(res.data.defaulters)
                })
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    async function loadPlans() {
        try {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}/admin/plan`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setPlans(res.data.plans)
                })
        } catch (error) {
            console.error("Error fetching plans: ", error)
        }
    }

    const refreshUserData = () => {
        if (!token) return
        getUserData(token)
    }

    const refreshDefaultersList = () => {
        getDefaultersList()
        getUserDefaultersList()
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUserData({})
        setDefaultersList([])
        setUserDefaultersList([])
    }

    return (
        <AuthContext.Provider
            value={{
                plans,
                refreshUserData,
                refreshDefaultersList,
                loadPlans,
                logout,
                userDefaultersList,
                userData,
                userDataContext,
                defaultersList,
                userLoading,
                defaultersLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
