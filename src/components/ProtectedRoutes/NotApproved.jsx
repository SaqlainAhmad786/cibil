import { useAuth } from "../../contexts/authContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotApproved({ Component }) {
    const { userData } = useAuth()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    console.log(['active', 'inactive'].includes(userData.status))

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        if (['active', 'inactive'].includes(userData.status)) {
            console.log('not approved')
            navigate('/')
        }
    }, [token, navigate])

    return <Component />
}

export default NotApproved
