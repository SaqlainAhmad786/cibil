import axios from 'axios'
import { useMemo } from 'react'
import { useEffect, useState } from 'react'

export default function useAllUsers(id) {
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null)
    const [subscribers, setSubscribers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [usersTotalPages, setUsersTotalPages] = useState(1)
    const [userPage, setUserPage] = useState(1)
    const limit = 10
    const memoizedUsers = useMemo(() => users, [users])

    useEffect(() => {
        if (id) {
            fetchUser()
        }
        getAllSubscribers()
        fetchUsers()
    }, [id, userPage])

    async function fetchUsers() {
        try {
            if (userPage < 1) setUserPage(1)
            if (userPage > usersTotalPages) setUserPage(usersTotalPages)
            setLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/user?limit=${limit}&page=${userPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            setUsers(response.data.users)
            setUsersTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchUser() {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSingleUser(response.data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function getAllSubscribers() {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/subscribers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSubscribers(response.data.subscriptions)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return {
        users: memoizedUsers,
        singleUser,
        loading,
        subscribers,
        usersTotalPages,
        setUserPage,
        userPage,
        limit,
    }
}
