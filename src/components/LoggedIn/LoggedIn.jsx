import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

function LoggedIn({ Component }) {
    const { userData } = useAuth()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        console.log(token && ['pending', 'rejected'].includes(userData.status))
        if (token && ['pending', 'rejected'].includes(userData.status)) {
            navigate('/profile-status')
        }
        // if (token) {
        //     navigate('/')
        //     return
        // }
    }, [token, navigate, userData])
    console.log(userData)

    return <Component />
}

export default LoggedIn
