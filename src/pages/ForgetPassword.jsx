import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner";

function OtpInputs({ handleOtpForm }) {
    const inputs = useRef([]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) {
            return;
        }

        e.target.value = value;

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text");
        const digits = pasteData.split("").filter((char) => /^\d$/.test(char));
        digits.forEach((digit, idx) => {
            if (inputs.current[idx]) {
                inputs.current[idx].value = digit;
                if (idx < inputs.current.length - 1) {
                    inputs.current[idx + 1].focus();
                }
            }
        });
        e.preventDefault();
    };

    return (
        <>
            <div className="w-[320px] px-8 py-6 mt-4 bg-gray-800 rounded-xl shadow-lg">
                <form onSubmit={handleOtpForm}>
                    <div className="h-full">
                        <p className="mb-4 text-[16px] font-semibold text-white">Enter OTP received on your email</p>
                        <div onPaste={handlePaste} className="grid grid-cols-4 gap-4 mb-4">
                            {Array.from({ length: 4 }, (_, index) => (
                                <input
                                    key={index}
                                    name={`otp${index}`}
                                    ref={(el) => (inputs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="border rounded-lg mx-2 px-3 py-2 text-white text-sm outline-none border-gray-500 bg-gray-900"
                                />
                            ))}
                        </div>
                        <p className="mb-4 text-xs text-gray-400">Please enter the 4-digits one time password (OTP) that we sent to your registered email address</p>
                    </div>
                    <div>
                        <button type="submit" className="py-2 bg-blue focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center text-base font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                            VERIFY
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-xs text-center text-gray-400">Back to <Link to="/login" className="text-blue font-medium">Login!</Link></p>
            </div>
        </>
    )
}

function SetPassword({ handlePasswordForm }) {
    const [showPassword, setShowPassword] = useState(false)

    const handleMouseDown = () => {
        setShowPassword(true);
    };

    const handleMouseUp = () => {
        setShowPassword(false);
    };


    return (
        <>
            <div className="w-[320px] px-8 py-6 mt-4 bg-gray-800 rounded-xl shadow-lg">
                <form onSubmit={handlePasswordForm}>
                    <div className="h-full">
                        <p className="mb-1 text-[16px] font-semibold text-white">Set your New Password</p>
                        <p className="mb-4 text-xs text-gray-400">Please enter your new password and confirm it</p>
                        <div className="flex justify-between items-center border-gray-500 bg-gray-900 border rounded-lg px-3 py-2 mb-3">
                            <input type={showPassword ? "text" : "password"} className="bg-transparent text-white text-sm w-full outline-none" placeholder="••••••••" name="password1" />
                            <button type="button" className="text-gray-400 text-sm" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                                {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                            </button>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">Confirm New Password</label>
                            <input className="border rounded-lg px-3 py-2 mb-5 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="••••••••" type="password" name="password2" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="py-2 bg-blue focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center text-base font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                            CHANGE
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-xs text-center text-gray-400">Back to <Link to="/login" className="text-blue font-medium">Login!</Link></p>
            </div>
        </>
    )
}

function ForgetPassword() {
    const [showEmail, setShowEmail] = useState(true)
    const [showOtp, setShowOtp] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Forgot Password | Vyapar Score"
    })

    function handleEmailForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        if (!email) {
            toast.error('Please enter your email address!', { duration: 3000 })
            return
        }
        setShowEmail(false)
        setShowOtp(true)
    }

    function handleOtpForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const otp0 = formData.get('otp0');
        const otp1 = formData.get('otp1');
        const otp2 = formData.get('otp2');
        const otp3 = formData.get('otp3');
        if (!otp0 || !otp1 || !otp2 || !otp3) {
            toast.error('Please enter your OTP!', { duration: 3000 })
            return
        }
        setShowOtp(false)
        setShowConfirmPassword(true)
    }

    function handlePasswordForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const password1 = formData.get('password1');
        const password2 = formData.get('password2');
        if (!password1 || !password2) {
            toast.error('Both fields are required!', { duration: 3000 })
            return
        }
        if (password1 !== password2) {
            toast.error('Passwords do not match!', { duration: 3000 })
            return
        }
        if (password1.length < 8) {
            toast.error('Password must be at least 8 characters long!', { duration: 3000 })
            return
        }

        navigate('/login', { state: { passwordChanged: true } })
    }

    return (
        <>
            <main className="h-[100dvh] flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
                <Toaster position="top-center" />
                {showEmail && <div className="w-[320px] px-8 py-6 mt-4 bg-gray-800 rounded-xl shadow-lg">
                    <form onSubmit={handleEmailForm}>
                        <div className="h-full">
                            <p className="mb-1 text-[16px] font-semibold text-white">Forgot Password?</p>
                            <p className="mb-4 text-xs text-gray-400">
                                Enter your email address and we will send you a 4 digit code to reset your password
                            </p>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold text-xs text-gray-400 ">Email</label>
                                <input className="border rounded-lg px-3 py-2 mb-5 text-white text-sm w-full outline-none border-gray-500 bg-gray-900" placeholder="example@mail.com" type="email" name="email" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="py-2 bg-blue focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center text-base font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-xs text-center text-gray-400">Back to <Link to="/login" className="text-blue font-medium">Login!</Link></p>
                </div>
                }
                {showOtp && <OtpInputs handleOtpForm={handleOtpForm} />}
                {showConfirmPassword && <SetPassword handlePasswordForm={handlePasswordForm} />}
            </main>
        </>
    )
}

export default ForgetPassword
