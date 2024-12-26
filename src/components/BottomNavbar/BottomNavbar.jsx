import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { BadgePlus, House, IndianRupee, Search, User } from "lucide-react"

function BottomNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    const handleScroll = () => {
        const isBottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10; // Add tolerance
        setIsVisible(!isBottom); // Show/hide navbar based on scroll position
    };

    useEffect(() => {
        // Attach scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Attach listener only once

    useEffect(() => {
        // Scroll to top when route changes
        window.scrollTo(0, 0);

        // Trigger scroll check after DOM update (important for dynamic pages)
        setTimeout(() => {
            handleScroll(); // Force a scroll check on route change
        }, 50); // Delay ensures the DOM is rendered before calculating height
    }, [location]); // React on route changes

    return (
        <>
            <div className={`customContainer lg:hidden md:hidden sm:hidden block fixed bottom-2 left-[50%] translate-x-[-50%] z-5 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                <div className="border border-gray-300 bg-white py-3 flex items-center justify-between shadow-xl rounded-md bottomNavbar">
                    <NavLink to="/overview/home" className="relative px-4 cursor-pointer">
                        <House />
                    </NavLink>
                    <NavLink to="/overview/subscribe" className="relative px-4 cursor-pointer">
                        <IndianRupee />
                    </NavLink>
                    <NavLink to="/overview/addDefaulter" className="relative px-4 cursor-pointer">
                        <BadgePlus />
                    </NavLink>
                    <NavLink to="/overview/searchDefaulter" className="relative px-4 cursor-pointer">
                        <Search />
                    </NavLink>
                    <NavLink to="/overview/profile" className="relative px-4 cursor-pointer">
                        <User />
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default BottomNavbar
