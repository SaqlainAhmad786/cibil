import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [defaultersList, setDefaultersList] = useState([])
    const [userDefaultersList, setUserDefaultersList] = useState([])
    const [userLoading, setUserLoading] = useState(false)
    const [defaultersLoading, setDefaultersLoading] = useState(false)
    const tokenRef = useRef(localStorage.getItem("token"))

    useEffect(() => {
        if (tokenRef.current) {
            refreshUserData()
            getDefaultersList()
            getUserDefaultersList()
        }
    }, [])

    const userDataContext = useMemo(() => ({ userData, setUserData }), [userData])

    async function getDefaultersList() {
        setDefaultersLoading(true)
        try {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}/defaulter`, {
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
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

    async function getUserData() {
        setUserLoading(true)
        try {
            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}/user/current-user`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${tokenRef.current}` },
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
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
                })
                .then((res) => {
                    setUserDefaultersList(res.data.defaulters)
                })
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    // async function loadPlans() {
    //     try {
    //         await axios
    //             .get(`${import.meta.env.VITE_BASE_URL}/admin/plan`, {
    //                 headers: { Authorization: `Bearer ${tokenRef.current}` },
    //             })
    //             .then((res) => {
    //                 setPlans(res.data.plans)
    //             })
    //     } catch (error) {
    //         console.error("Error fetching plans: ", error)
    //     }
    // }

    const refreshUserData = () => {
        if (!tokenRef.current) return
        getUserData(tokenRef.current)
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
                refreshUserData,
                refreshDefaultersList,
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
