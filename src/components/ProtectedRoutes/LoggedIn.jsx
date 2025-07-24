import { useAuth } from '../../contexts/authContext'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function LoggedIn({ Component }) {
    const { userData } = useAuth()
    const tokenRef = useRef(localStorage.getItem("token"));
    const navigate = useNavigate()

    useEffect(() => {
        if (tokenRef.current) {
            navigate('/')
            return
        }
    }, [])

    return <Component />
}

export default LoggedIn
