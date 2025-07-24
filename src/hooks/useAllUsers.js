import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function useAllUsers(id) {
    const tokenRef = useRef(localStorage.getItem('token'))
    const [users, setUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null)
    const [subscribers, setSubscribers] = useState(null)
    const [pendingUsers, setPendingUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [usersTotalPages, setUsersTotalPages] = useState(1)
    const [userPage, setUserPage] = useState(1)
    const limit = 10

    useEffect(() => {
        if (id) fetchUser(id)
    }, [id])

    useEffect(() => {
        fetchUsers()
    }, [userPage])

    useEffect(() => {
        getAllSubscribers()
        fetchPendingUsers()
    }, [])

    async function fetchUsers() {
        try {
            setLoading(true)
            const page = Math.max(1, Math.min(userPage, usersTotalPages))
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/user?limit=${limit}&page=${page}`,
                {
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
                }
            )
            setUsers(response.data.users)
            setUsersTotalPages(response.data.totalPages)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchUser(userId) {
        try {
            setLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/user/${userId}`,
                {
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
                }
            )
            setSingleUser(response.data.user)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchPendingUsers() {
        try {
            setLoading(true)
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/user/pending-users`,
                {
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
                }
            )
            setPendingUsers(res.data.users)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function getAllSubscribers() {
        try {
            setLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/admin/subscribers`,
                {
                    headers: { Authorization: `Bearer ${tokenRef.current}` },
                }
            )
            setSubscribers(response.data.subscriptions)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        users,
        singleUser,
        loading,
        subscribers,
        usersTotalPages,
        setUserPage,
        userPage,
        limit,
        pendingUsers,
        refetchPendingUsers: fetchPendingUsers,
    }
}
