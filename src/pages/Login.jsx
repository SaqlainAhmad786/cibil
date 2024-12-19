import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { useAuth } from "../contexts/authContext"
import axios from "axios"

function Login() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const location = useLocation();
    const hasRun = useRef(false);
    const navigate = useNavigate()
    const { refreshUserData } = useAuth();

    const newUserSignedUp = location?.state?.signedUp;
    const newUserEmail = location?.state?.email;
    const newPassword = location?.state?.passwordChanged;

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
            navigate(location.pathname, { state: null })
        }

        if (newPassword) {
            toast.success('Password Changed Successfully!', { description: 'Please Log in to continue' }, { richColors: true }, { duration: 3000 })
            navigate(location.pathname, { state: null })
        }
        hasRun.current = true;
    }, [newUserSignedUp, newPassword, location.pathname, navigate, newUserEmail])

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
            await axios.post(`${import.meta.env.VITE_BASE_URL}/login-user`, data).then(res => {
                if (res.data.status) {
                    localStorage.setItem('token', res.data.token_key)
                    localStorage.setItem('userId', res.data.userData._id)
                    setLoading(false)
                    refreshUserData()
                    navigate('/')
                }
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.msg === "user not found") {
                toast.error('User not found',
                    { description: 'Please Sign up to continue' },
                    { duration: 3000 })
                return
            } else if (error.response.data.msg === "password not match") {
                toast.error('Password does not match',
                    { description: 'Please check your password' },
                    { duration: 3000 })
            }
            console.error('Error:', error.response ? error.response.data : error.msg);
        }
    }

    return (
        <>
            <main className="h-[100dvh] flex items-center justify-center bg-[url('/img/login-cover.svg')] bg-cover bg-center px-4 sm:px-6 lg:px-8">
                <Toaster position="top-center" />
                <div className="w-[320px] min-h-96 px-8 py-6 text-left bg-gray-800 border border-gray-700 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col h-full select-none">
                            <div className="mb-3">
                                <div className="mb-2 flex justify-center">
                                    <img src="/img/vyapar-logo.png" className="w-16" />
                                </div>
                                {/* <p className="m-0 text-[16px] font-semibold text-white">LOGIN</p> */}
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold text-xs text-white tracking-wide">Email</label>
                                <input className="border rounded-lg px-3 py-2 mb-5 text-white text-sm w-full outline-none border-gray-600 bg-gray-600 bg-opacity-40 placeholder:text-gray-400" placeholder="example@mail.com" type="email" name="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-white tracking-wide">Password</label>
                            <div className="flex justify-between items-center border-gray-600 bg-gray-600 bg-opacity-40 border rounded-lg px-3 py-2 mb-3">
                                <input type={showPassword ? "text" : "password"} className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-400" placeholder="••••••••" name="password" />
                                <button type="button" className="text-gray-400 text-sm" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <i className="fa-regular fa-eye-slash text-white"></i> : <i className="fa-regular fa-eye text-white"></i>}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-xs text-gray-200">Remember me</label>
                        </div>
                        <div>
                            <button type="submit" className="py-2 text-sm bg-blueClr focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                                {loading ? <l-mirage
                                    size="80"
                                    speed="4"
                                    color="white"
                                ></l-mirage> : 'LOGIN'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <p className="text-xs mb-1 text-center text-gray-400"><Link to="/forgetPassword" className="font-semibold text-gray-300 hover:underline">Forget Password?</Link></p>
                        <p className="text-xs text-center text-gray-100 font-extralight">{`Don't`} have an account? <Link to="/signup" className="font-semibold text-blueClr hover:underline">Sign up</Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
