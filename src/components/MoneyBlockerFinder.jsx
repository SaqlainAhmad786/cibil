import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Search } from "lucide-react";
import axios from "axios";
import Loader from "./Loader/Loader";
import AlertModal from "./AlertModal";
import { toast, Toaster } from "sonner";

function MoneyBlockerFinder() {
	const { userData } = useAuth();
	const [loading, setLoading] = useState(false);
	const [filteredList, setFilteredList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [searchValues, setSearchValues] = useState({
		name: "",
		pan_no: "",
		aadhar_no: "",
		mobile_no: "",
		gst_no: "",
	});
	const tokenRef = useRef(localStorage.getItem("token"));

	const handleChange = (e) => {
		setFilteredList([]);
		const { name, value } = e.target;
		setSearchValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!userData.isSubscribed) {
			setShowModal(true);
			setLoading(false);
			return
		}

		if (!searchValues.name && !searchValues.pan_no && !searchValues.aadhar_no && !searchValues.mobile_no && !searchValues.gst_no) {
			setLoading(false);
			toast.error("Please fill at least one field to search.", { duration: 3000 });
			return;
		}

		try {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/defaulter/search`, searchValues, {
				headers: {
					Authorization: `Bearer ${tokenRef.current}`,
				},
			});
			if (response.data.defaulter) {
				setFilteredList(response.data.defaulter);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main>
				<Toaster position="top-right" richColors />
				{loading && <Loader />}
				{showModal && <AlertModal />}
				<div className="customContainer bg-white p-3 lg:p-5 md:p-4 rounded-lg mx-auto shadow-sm">
					<h1 className="text-lg font-semibold col-span-2 border-neutral-200 pb-2">Search for Money Blockers (Defaulters)</h1>
					<form
						className="grid grid-cols-2 gap-2"
						onSubmit={handleSubmit}
					>
						<div className="w-full flex flex-col gap-1">
							<label className="font-semibold text-xs text-gray-500">Name</label>
							<input
								type="text"
								className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100"
								placeholder="John Doe"
								name="name"
								value={searchValues.name}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<label className="font-semibold text-xs text-gray-500">PAN Card No.</label>
							<input
								type="text"
								className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100"
								placeholder="DSKPA123456"
								name="pan_no"
								value={searchValues.pan_no}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<label className="font-semibold text-xs text-gray-500">Aadhar Card No.</label>
							<input
								type="text"
								className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100"
								placeholder="12345678905454"
								name="aadhar_no"
								value={searchValues.aadhar_no}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<label className="font-semibold text-xs text-gray-500">Mobile</label>
							<input
								type="text"
								className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100"
								placeholder="9876543210"
								name="mobile_no"
								value={searchValues.mobile_no}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col gap-1 lg:col-span-1 md:col-span-1 col-span-2">
							<label className="font-semibold text-xs text-gray-500">GST No.</label>
							<input
								type="text"
								className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100"
								placeholder="22AAAAA0000A1Z5"
								name="gst_no"
								value={searchValues.gst_no}
								onChange={handleChange}
							/>
						</div>
						<div className="col-span-2">
							<button
								type="submit"
								className="flex justify-center items-center gap-1 w-full border-2 border-blueClr text-blueClr font-bold py-2 px-4 rounded-md hover:bg-blueClr hover:text-white duration-200"
							>
								<Search className="h-5 w-5" /> Search
							</button>
						</div>
					</form>
				</div>
				<div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm my-5">
					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
						{filteredList.length ? (
							filteredList.map((item, index) => (
								<Link
									to={`/overview/defaulter/${item._id}`}
									className="bg-gradient-to-br hover:bg-gradient-to-bl from-white to-blue-50 inline-block border rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-xl duration-200"
									key={index}
								>
									<div className="flex justify-between items-center border-b pb-1">
										<div>
											<p className="text-xl font-semibold">{item.name}</p>
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
							))
						) : (
							<div className="col-span-3 h-[320px] flex flex-col gap-2 items-center justify-center">
								<img
									src="/img/no-data.png"
									className="w-16"
									alt=""
								/>
								<p className="text-sm font-medium">No matching results.</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default MoneyBlockerFinder;
