import { Link } from "react-router-dom"

function Login() {
    return (
        <>
            <main className="bg-gray-50 dark:bg-gray-900 grid place-items-center lg:h-screen md:h-screen h-full">
                <div className="lg:w-[50%] md:w-[75%] sm:w-[85%] w-[95%] mx-auto my-5 bg-gray-800 border border-gray-700 p-6 rounded-xl">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        <img className="w-16 h-16 mr-2 object-contain" src="/img/vyapar-logo.png" alt="logo" />
                        Create an account
                    </h1>
                    <form action="">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5" >
                            <div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Full Name</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="John Doe" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Mobile</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="9876543210" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Email</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="example@mail.com" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Password</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="••••••••" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Confirm Password</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="••••••••" />
                                </div>
                            </div>
                            <div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">Firm Name</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="Username" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">GST No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="Username" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-400 ">PAN Card No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-white text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" placeholder="Username" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-start mb-2">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <Link to={'/overview/home'} className="inline-block w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</Link>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                                Already have an account? <Link to="/login" className="font-medium text-blue hover:underline">Login here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login
