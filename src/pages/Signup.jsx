import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import Loader from "../components/Loader/Loader"

function Signup() {
    const [loading, setLoading] = useState(false)
    const [number, setNumber] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Signup | Vyapar Score"
    }, [])


    const handleNumber = (e) => {
        const input = e.target.value;
        if (/^\d{0,10}$/.test(input)) {
            setNumber(input);
        }
    };

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
        console.log(data)
        if (data.mobile_no.length !== 10) {
            setLoading(false)
            toast.error('Please enter a valid mobile number!', { duration: 3000 })
            return
        }

        if (data.password !== confirmPassword) {
            setLoading(false)
            toast.error('Password does not match!', { description: 'Please type your password correctly' }, { duration: 3000 })
            return
        }

        try {
            await axios.post('https://back-end-civil.onrender.com/register', data).then(res => {
                console.log(res.data)
                if (res.data.status) {
                    setLoading(false)
                    navigate('/login', { state: { signedUp: 1, email: data.email } })
                }
            })
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response.data.msg === "All field are Required") {
                setLoading(false)
                toast.error('All fields are required!', { description: 'Please fill up all the related fields' }, { duration: 3000 })
            } else if (error.response.data.msg === "Email already Exists Please Try another email") {
                setLoading(false)
                toast.error('User Already Exists!', { description: 'Please Log in to continue or try another email' }, { duration: 3000 })
            }
        }
    }

    return (
        <>
            <main className="bg-gray-900 grid place-items-center lg:h-screen md:h-screen h-full">
                <Toaster position="top-center" />
                <div className="lg:w-[50%] md:w-[75%] sm:w-[85%] w-[95%] mx-auto my-5 bg-gray-800 p-6 rounded-xl">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        <img className="w-16 h-16 mr-2 object-contain" src="/img/vyapar-logo.png" alt="logo" />
                        Create an account
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5" >
                            <div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Full Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="John Doe" name="user_name" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Mobile</label>
                                    <input type="number" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="9876543210" name="mobile_no" value={number} onChange={handleNumber} maxLength="10" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Email</label>
                                    <input type="email" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="example@mail.com" name="email" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Password</label>
                                    <div className="flex items-center w-full mb-4 border border-gray-500 bg-gray-900 rounded-lg px-3 py-2">
                                        <input type={showPassword ? "text" : "password"} className="bg-transparent text-white text-sm outline-none flex-1" placeholder="••••••••" name="password" />
                                        <button type="button" className="text-gray-400 text-sm" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                                            {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Confirm Password</label>
                                    <input type="password" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="••••••••" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Firm Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="Organization" name="firm_name" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">GST No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="" name="gst_no" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">PAN Card No.</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="" name="pan_no" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-start mb-2">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" required className="w-3 h-3 border rounded bg-gray-700 border-gray-600" />
                                </div>
                                <div className="ml-2 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="flex justify-center w-full text-white bg-blue hover:bg-primary-700 focus:outline-none font-medium rounded-lg px-5 py-2 text-center hover:bg-primary-700">
                                {loading ? <Loader /> : 'SIGN UP'}
                            </button>
                            <p className="text-xs font-light text-gray-400 mt-3">
                                Already have an account? <Link to="/login" className="font-medium text-blue hover:underline">Login </Link>
                                here!
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Signup
