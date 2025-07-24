import { useAuth } from "../../contexts/authContext"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

function NotApproved({ Component }) {
    const { userData } = useAuth()
    const tokenRef = useRef(localStorage.getItem("token"));
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenRef.current) {
            navigate('/login')
        }

        if (['active', 'inactive'].includes(userData.status)) {
            navigate('/')
        }
    }, [])

    return <Component />
}

export default NotApproved
