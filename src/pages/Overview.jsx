import { Link, NavLink, Outlet } from "react-router-dom"

function Overview() {
    function handleSideBar() {
        document.getElementById("my-drawer-2").checked = false
    }
    return (
        <>
            <main>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className="lg:pt-5 md:pt-5 sm:pt-5 pt-3 pb-3">
                            <div className="customContainer py-2 flex items-center lg:justify-end justify-between">
                                <div className="flex gap-4 items-center">
                                    <div className='w-[240px] mx-auto lg:order-1 order-2'>
                                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden duration-200">
                                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                className="peer h-full w-full outline-none text-sm text-inherit text-gray-700 pr-2"
                                                type="text"
                                                id="search"
                                                placeholder="Search someone..." />
                                        </div>
                                    </div>

                                    <Link className="inline-block h-12 w-12 rounded-[100vh] overflow-hidden lg:order-2 order-1">
                                        <img className="w-full h-full object-cover" src="https://www.paraglidingassociationofindia.org/wp-content/uploads/2022/02/passport-size.png" alt="" />
                                    </Link>
                                </div>
                                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden w-[36px] cursor-pointer">
                                    <img src="/img/bars.svg" alt="" />
                                </label>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                    <div className="drawer-side h-fit">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu py-4 px-2 w-80 bg-gray-800 h-[100dvh] lg:h-[100dvh] text-gray-100">
                            <li>
                                <img src="/img/vyapar-logo.png" className="w-32 h-32 object-contain" alt="" />
                            </li>
                            <div className="ml-4">
                                <p className="font-semibold text-md tracking-widest mb-2">OVERVIEW</p>
                            </div>
                            <li className="hover:translate-x-2 duration-200 "><NavLink to={'/'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-home me-1 font-sm text-gray-100"></i>Home</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200 "><NavLink to={'/overview/addDefaulter'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-plus me-1 font-sm text-gray-100"></i>Add Defaulter</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200"><NavLink to={'/overview/subscribe'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-bell me-1 font-sm text-gray-100"></i>Subscribe</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200"><NavLink to={'/overview/profile'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-user me-1 font-sm text-gray-100"></i>Profile</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200"><NavLink to={'/overview/help'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-question me-1 font-sm text-gray-100"></i>Help</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200"><button className="text-md font-semibold">
                                <i className="fa-solid fa-right-from-bracket me-1 font-sm text-gray-100"></i>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Overview
