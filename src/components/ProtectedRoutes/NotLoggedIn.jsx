import { useAuth } from '../../contexts/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotLoggedIn({ Component }) {
    const { userData } = useAuth()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        if (token && !['active', 'inactive'].includes(userData.status)) {
            navigate('/profile-status')
        }
    }, [token, navigate])

    return <Component />
}

export default NotLoggedIn
