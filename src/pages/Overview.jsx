import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import { Binoculars, CircleHelp, CirclePlus, House, IndianRupee, LogOut, Search, Settings, User, Users } from "lucide-react";
import { useEffect } from "react";

function Overview() {
	const { logout, userData } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Vyapar Score";
	});

	function handleSideBar() {
		document.getElementById("my-drawer-2").checked = false;
	}

	function handleLogout() {
		logout();
		handleSideBar();
		navigate("/login");
	}

	return (
		<>
			<main className="min-h-screen">
				<div className="drawer lg:drawer-open">
					<input
						id="my-drawer-2"
						type="checkbox"
						className="drawer-toggle"
					/>
					<BottomNavbar />
					<div className="drawer-content">
						<div className="lg:pt-5 md:pt-5 sm:pt-5 pt-3 mb-3">
							<div className="customContainer flex items-center lg:justify-end justify-between">
								<div className="flex gap-4 items-center">
									<Link
										to={"/overview/editProfile"}
										className="lg:block hidden text-gray-600 text-md lg:order-1 order-2"
									>
										<Settings className="w-5 h-5" />
									</Link>
									<Link
										to={"/overview/searchDefaulter"}
										className="lg:block hidden text-gray-600 text-lg lg:order-1 order-2 border-r pr-3"
									>
										<Search />
									</Link>
									<Link
										to={"/overview/profile"}
										className="lg:block hidden h-12 w-12 rounded-[100vh] overflow-hidden lg:order-2 order-1 border-2 border-blueClr"
									>
										<img
											className="w-full h-full object-cover"
											src={userData?.avatar}
											onError={(e) => (e.target.src = "/img/default-avatar.jpg")}
											alt=""
										/>
									</Link>
									<Link
										to={"/"}
										className="lg:hidden block bg-white m-1 h-14 w-14 rounded-[100vh] overflow-hidden lg:order-2 order-1"
									>
										<img
											className="w-full h-full object-cover"
											src="/img/logo-circle.svg"
											alt=""
										/>
									</Link>
								</div>
								<label
									htmlFor="my-drawer-2"
									className="drawer-button lg:hidden w-[36px] cursor-pointer"
								>
									<img
										src="/img/bars.svg"
										alt="hamburger menu"
									/>
								</label>
							</div>
						</div>
						<Outlet />
					</div>
					<div className="drawer-side h-fit z-50">
						<label
							htmlFor="my-drawer-2"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<ul className="menu py-4 px-2 w-80 z-20 space-y-1 bg-gray-800 h-[100dvh] lg:h-[100dvh] min-h-[90dvh] text-gray-100">
							<li>
								<img
									src="/img/vyapar-logo.png"
									className="w-32 h-32 object-contain"
									alt=""
								/>
							</li>
							<div className="ml-4">
								<p className="font-semibold text-[1.1rem] tracking-widest mb-2">OVERVIEW</p>
							</div>
							<li className="hover:translate-x-2 duration-200 ">
								<NavLink
									to={"/overview/home"}
									onClick={handleSideBar}
									className="text-md"
								>
									<House className="w-5 h-5" />
									Home
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200 ">
								<NavLink
									to={"/overview/searchDefaulter"}
									onClick={handleSideBar}
									className="text-md"
								>
									<Binoculars className="w-5 h-5" />
									Money Blocker Finder
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200 ">
								<NavLink
									to={"/overview/addDefaulter"}
									onClick={handleSideBar}
									className="text-md"
								>
									<CirclePlus className="w-5 h-5" />
									Add Defaulter
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200 ">
								<NavLink
									to={"/overview/defaultersList"}
									onClick={handleSideBar}
									className="text-md"
								>
									<Users className="w-5 h-5" />
									My Defaulters List
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"/overview/subscribe"}
									onClick={handleSideBar}
									className="text-md"
								>
									<IndianRupee className="w-5 h-5" />
									Subscribe
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"/overview/profile"}
									onClick={handleSideBar}
									className="text-md"
								>
									<User className="w-5 h-5" />
									Profile
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"/overview/help"}
									onClick={handleSideBar}
									className="text-md"
								>
									<CircleHelp className="w-5 h-5" />
									Help
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200">
								<button
									onClick={handleLogout}
									className="text-md font-semibold"
								>
									<LogOut className="w-5 h-5" />
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default Overview;
