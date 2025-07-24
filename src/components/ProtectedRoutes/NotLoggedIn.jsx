import { useAuth } from '../../contexts/authContext'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function NotLoggedIn({ Component }) {
    const { userData } = useAuth()
    const tokenRef = useRef(localStorage.getItem("token"));
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenRef.current) {
            navigate('/login')
        }
        if (tokenRef.current && !['active', 'inactive'].includes(userData.status)) {
            navigate('/profile-status')
        }
    }, [])

    return <Component />
}

export default NotLoggedIn
