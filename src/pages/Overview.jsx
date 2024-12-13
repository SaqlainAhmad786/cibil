import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext";

function Overview() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleSideBar() {
        document.getElementById("my-drawer-2").checked = false
    }

    function handleLogout() {
        logout();
        handleSideBar();
        navigate('/login');
    }

    return (
        <>
            <main>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className="lg:pt-5 md:pt-5 sm:pt-5 pt-3 mb-3">
                            <div className="customContainer py-2 flex items-center lg:justify-end justify-between">
                                <div className="flex gap-4 items-center">
                                    <Link to={'/overview/editProfile'} className="lg:block hidden text-gray-600 text-md lg:order-1 order-2">
                                        <i className="fa-solid fa-gear"></i>
                                    </Link>
                                    <Link to={'/overview/searchDefaulter'} className="lg:block hidden text-gray-600 text-lg lg:order-1 order-2 border-r pr-3">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </Link>
                                    <Link to={'/overview/profile'} className="lg:block hidden h-12 w-12 rounded-[100vh] overflow-hidden lg:order-2 order-1">
                                        <img className="w-full h-full object-cover" src="https://www.paraglidingassociationofindia.org/wp-content/uploads/2022/02/passport-size.png" alt="" />
                                    </Link>
                                    <Link to={'/'} className="lg:hidden block bg-white p-1 h-14 w-14 rounded-[100vh] overflow-hidden lg:order-2 order-1">
                                        <img className="w-full h-full object-cover" src="/img/logo-vector.svg" alt="" />
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
                            <li className="hover:translate-x-2 duration-200 "><NavLink to={'/overview/home'} onClick={handleSideBar} className="text-md">
                                <i className="fa-solid fa-home me-1 font-sm text-gray-100"></i>Home</NavLink>
                            </li>
                            <li className="hover:translate-x-2 duration-200 "><NavLink to={'/overview/searchDefaulter'} onClick={handleSideBar} className="text-md">
                                <img src="/img/fraud-icon.png" className="h-5" alt="" />
                                Money Blocker Finder</NavLink>
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
                            <li className="hover:translate-x-2 duration-200"><button onClick={handleLogout} className="text-md font-semibold">
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
