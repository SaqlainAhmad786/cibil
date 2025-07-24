import { useAuth } from '../../contexts/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoggedIn({ Component }) {
    const { userData } = useAuth()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate('/')
            return
        }
    }, [token, navigate, userData])

    return <Component />
}

export default LoggedIn
