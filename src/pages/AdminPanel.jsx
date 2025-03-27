import { NavLink, Outlet } from "react-router-dom";

function AdminPanel() {
	function handleSideBar() {
		document.getElementById("my-drawer-2").checked = false;
	}

	return (
		<>
			<main>
				<div className="bg-white py-2">
					<div className="customContainer py-2 flex items-center justify-between lg:justify-center md:justify-between">
						<h1 className="font-semibold text-2xl flex items-center gap-2 text-blueClr text-center">
							<img
								src="/img/logo-vector.svg"
								className="w-10 inline-block"
								alt=""
							/>
							Admin Panel
						</h1>
						<label
							htmlFor="my-drawer-2"
							className="drawer-button lg:hidden w-[30px] cursor-pointer"
						>
							<i className="fa-solid fa-bars text-blueClr text-2xl text-color3 px-2 py-1 rounded-lg"></i>
						</label>
					</div>
				</div>
				<div className="drawer lg:drawer-open">
					<input
						id="my-drawer-2"
						type="checkbox"
						className="drawer-toggle"
					/>
					<div className="drawer-content">
						<Outlet />
					</div>
					<div className="drawer-side h-fit">
						<label
							htmlFor="my-drawer-2"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<ul className="menu p-4 w-80 bg-white h-[100vh] lg:h-[90vh] text-color2 shadow-[1px_1px_8px_0px_rgba(0,0,0,0.5)]">
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"subscribers"}
									onClick={handleSideBar}
									className="text-lg"
								>
									<i className="fa-solid fa-file-import me-1 text-blueClr"></i>Subscribers
								</NavLink>
							</li>
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"plans"}
									onClick={handleSideBar}
									className="text-lg"
								>
									<i className="fa-solid fa-pen-to-square me-1 text-blueClr"></i>Plans
								</NavLink> 
							</li>
							<li className="hover:translate-x-2 duration-200">
								<NavLink
									to={"users"}
									onClick={handleSideBar}
									className="text-lg"
								>
									<i className="fa-solid fa-pen-to-square me-1 text-blueClr"></i>Users
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default AdminPanel;
