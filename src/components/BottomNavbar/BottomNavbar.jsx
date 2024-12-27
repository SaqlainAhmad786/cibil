import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { BadgePlus, House, IndianRupee, Search, User } from "lucide-react"

function BottomNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight; // Includes visible height
        const documentHeight = document.documentElement.scrollHeight; // Full page height

        // Add offset (5px) for better precision due to dynamic height changes
        const atBottom = scrollPosition + windowHeight >= documentHeight - 5;

        setIsVisible(!atBottom); // Hide navbar if at the bottom
    };

    useEffect(() => {
        // Scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll); // For mobile dynamic resizing

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []); // Attach listener once

    useEffect(() => {
        // Force scroll to top on route change
        window.scrollTo(0, 0);

        // Delay ensures correct height calculation after DOM updates
        setTimeout(() => {
            handleScroll();
        }, 100); // Increased delay for mobile rendering

    }, [location]);

    return (
        <>
            <div className={`customContainer z-10 lg:hidden md:hidden sm:hidden block fixed bottom-2 left-[50%] translate-x-[-50%] z-5 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-[100%]'}`}>
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
