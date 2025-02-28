import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";

function Home() {
	const { userData, defaultersList, defaultersLoading } = useAuth();

	console.log(defaultersList);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = defaultersList.slice().reverse().slice(indexOfFirstItem, indexOfLastItem);

	const sortedItems = currentItems.slice().sort((a, b) => {
		const distanceA = a.city === userData.city ? 0 : 1;
		const distanceB = b.city === userData.city ? 0 : 1;

		return distanceA - distanceB;
	});

	const totalPages = Math.ceil(defaultersList.length / itemsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
			setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
			setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
		}
	};

	return (
		<>
			<main>
				{defaultersLoading && <Loader />}
				<section className="my-4">
					<div className="customContainer bg-gradient-to-r from-blueClr to-transparent text-white p-5 rounded-lg mx-auto">
						<h2 className="text-2xl font-bold">Welcome,</h2>
						<p className="capitalize text-lg">{userData?.user_name}</p>
					</div>
				</section>
				<section className="my-4">
					<div className="customContainer min-h-[500px] relative bg-white lg:p-5 md:p-5 p-3 rounded-lg mx-auto shadow-sm">
						<p className="text-lg font-semibold">Recently added Defaulters</p>
						<p className="text-xs text-gray-500 font-medium mb-3">The list is already sorted based on your nearest location.</p>
						<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mb-12">
							{sortedItems.map((item) => {
								return (
									<Link
										to={`/overview/defaulter/${item._id}`}
										className="bg-gradient-to-br hover:bg-gradient-to-bl from-white to-blue-50 inline-block border rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-xl duration-200"
										key={item._id}
									>
										<div className="flex justify-between items-center border-b pb-1">
											<div>
												<p className="text-xl font-semibold capitalize">{item.name}</p>
												<p className="text-xs font-semibold text-gray-500 uppercase">{item.firm_name}</p>
											</div>
											<div>
												<img
													src="/img/fraud.png"
													className="h-16 w-16"
													alt=""
												/>
											</div>
										</div>
										<div className="flex flex-col gap-2 py-3 mb-2 border-b">
											<div className="flex items-center gap-2">
												<p className="text-xs text-blueClr font-semibold border rounded-full p-1 py-2">GST</p>
												<p className="font-medium text-sm text-gray-700 uppercase">{item.gst_no}</p>
											</div>
											<div className="flex items-center gap-2">
												<i className="fa-solid fa-phone text-blueClr border p-2 rounded-full"></i>
												<p className="font-medium text-sm text-gray-700">+91 {item.mobile_no}</p>
											</div>
											<div className="flex items-center gap-2">
												<p className="text-sm text-blueClr font-semibold border rounded-full px-[9px] py-[6px]">-₹</p>
												<p className="font-medium text-sm text-gray-700">₹ {new Intl.NumberFormat("en-IN").format(item.pending_amount)}</p>
											</div>
										</div>
										<div>
											<p className="text-[10px] text-gray-700">
												<span className="font-medium">Posted by: </span>
												<span className="capitalize">{item.added_by.firm_name} </span>
												<span>on {new Date(item.createdAt).toLocaleDateString("en-IN")}</span>
											</p>
										</div>
									</Link>
								);
							})}
						</div>
						<div className="absolute bottom-4 right-4 mt-5 flex gap-2 justify-end items-center text-xs">
							<span className="block font-medium">
								Page {currentPage} of {totalPages}
							</span>
							<div className="space-x-1">
								<button
									title="previous"
									type="button"
									onClick={handlePreviousPage}
									disabled={currentPage === 1}
									className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200 disabled:bg-gray-300"
								>
									<i className="fa-solid fa-angle-left"></i>
								</button>
								<button
									title="next"
									type="button"
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
									className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200 disabled:bg-gray-300"
								>
									<i className="fa-solid fa-angle-right"></i>
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default Home;
