import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import Loader from "../components/Loader/Loader"
import axios from "axios"
import { useAuth } from "../contexts/authContext"

function Login() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const navigate = useNavigate()
    const location = useLocation();
    const hasRun = useRef(false);
    const { login } = useAuth();

    const newUserSignedUp = location?.state?.signedUp;
    const newUserEmail = location?.state?.email;

    useEffect(() => {
        document.title = "Login | Vyapar Score"
        if (hasRun.current) return;

        if (newUserSignedUp) {
            toast.success('Account Created Successfully!',
                { description: 'Please Log in to continue' }, { duration: 3000 })
            navigate(location.pathname, { state: null })
        }

        if (newUserEmail) {
            setEmailValue(newUserEmail)
        }
        hasRun.current = true;
    }, [newUserSignedUp, location.pathname, navigate])

    const handleMouseDown = () => {
        setShowPassword(true);
    };

    const handleMouseUp = () => {
        setShowPassword(false);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        if (!data.email || !data.password) {
            setLoading(false)
            toast.error('Please enter your credentials', { duration: 3000 })
            return
        }
        try {
            await axios.post('https://back-end-civil.onrender.com/login-user', data).then(res => {
                console.log(res.data)
                if (res.data.status) {
                    setLoading(false)
                    login(res.data.token_key);
                    navigate('/overview')
                }
            })
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.msg)
            if (error.response.data.msg === "User Not Found") {
                toast.error('User not found',
                    { description: 'Please Sign up to continue' },
                    { duration: 3000 })
                return
            } else if (error.response.data.msg === "Password Not match ") {
                toast.error('Password does not match',
                    { description: 'Please check your password' },
                    { duration: 3000 })
            }
            console.error('Error:', error.response ? error.response.data : error.msg);
        }
    }

    return (
        <>
            <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
                <Toaster position="top-center" />
                <div className="relative ">
                    <div className="w-[320px] min-h-96 px-8 py-6 mt-4 text-left bg-gray-800 rounded-xl shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col justify-center items-center h-full select-none">
                                <div className="flex flex-col items-center justify-center gap-2 mb-8">
                                    <a href="" target="_blank">
                                        <img src="/img/vyapar-logo.png" className="w-16" />
                                    </a>
                                    <p className="m-0 text-[16px] font-semibold text-white">Login to your Account</p>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Email</label>
                                    <input className="border rounded-lg px-3 py-2 mb-5 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="example@mail.com" type="email" name="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold text-xs text-gray-400 ">Password</label>
                                <div className="flex justify-between items-center border-gray-500 bg-gray-900 border rounded-lg px-3 py-2 mb-3">
                                    <input type={showPassword ? "text" : "password"} className="bg-transparent text-white text-sm w-full outline-none" placeholder="••••••••" name="password" />
                                    <button type="button" className="text-gray-400 text-sm" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                                        {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember" className="text-xs text-gray-400">Remember me</label>
                            </div>
                            <div>
                                <button type="submit" className="py-[7px] px-8 bg-blue focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center text-base font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                                    {loading ? <Loader /> : 'LOGIN'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-4">
                            <p className="text-xs text-center text-gray-400">{`Don't`} have an account? <Link to="/signup" className="font-medium text-blue hover:underline">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
