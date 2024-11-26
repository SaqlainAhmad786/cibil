import { Link } from "react-router-dom"

function Login() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
                <div className="relative ">
                    <div className="w-[320px] min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-lg">
                        <div className="flex flex-col justify-center items-center h-full select-none">
                            <div className="flex flex-col items-center justify-center gap-2 mb-8">
                                <a href="" target="_blank">
                                    <img src="/img/vyapar-logo.png" className="w-16" />
                                </a>
                                <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label className="font-semibold text-xs text-gray-400 ">Username</label>
                                <input className="border rounded-lg px-3 py-2 mb-5 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="Username" />

                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-400 ">Password</label>
                            <input type="password" className="border rounded-lg px-3 py-2 mb-3 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="••••••••" />

                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-xs text-gray-400">Remember me</label>
                        </div>
                        <div>
                            <button className="py-1 px-8 bg-blue focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">LOGIN</button>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-center text-gray-400">{`Don't`} have an account? <Link to="/signup" className="font-medium text-blue hover:underline">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
