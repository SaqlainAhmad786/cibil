import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../contexts/authContext'

function ProfileStatus() {
    const { userData } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Profile Status | Vyapar Score'
        if (userData.status === 'active') navigate('/')
    }, [userData, navigate])

    return (
        <>
            <main className="h-[100dvh] flex items-center justify-center bg-[url('/img/login-cover.svg')] bg-cover bg-center px-4 sm:px-6 lg:px-8">
                <div className="w-[320px] px-8 py-6 text-left bg-gray-800 border border-gray-700 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-lg">
                    <div className="flex flex-col h-full items-center select-none">
                        <div className="mb-5">
                            <img
                                src="/img/vyapar-logo.png"
                                className="w-20"
                                alt="Logo"
                            />
                        </div>

                        <div className="space-y-4">
                            {userData?.status === 'pending'
                                ? <div className="text-sm text-yellow-200 text-center bg-yellow-900 bg-opacity-40 px-4 py-3 rounded-md border border-yellow-600 leading-relaxed">
                                    Your account is currently pending approval. <br />
                                    Once the verification process is complete and your profile is
                                    approved, a confirmation message will be sent to your registered
                                    email address.
                                </div>
                                : <div className="text-sm text-red-200 text-center bg-red-900 bg-opacity-40 px-4 py-3 rounded-md border border-red-600 leading-relaxed">
                                    We regret to inform you that your account has not been approved. <br />
                                    Please review the information submitted and contact support if you believe this decision was made in error.
                                </div>}
                            <div>
                                <button
                                    onClick={() => {
                                        localStorage.clear()
                                        navigate('/login')
                                    }}
                                    type="submit"
                                    className="py-2 px-4 text-sm bg-blueClr focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 flex justify-center text-center font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none"
                                >
                                    Logout <LogOut className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfileStatus
