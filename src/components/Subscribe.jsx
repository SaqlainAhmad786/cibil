import axios from "axios";
import { useAuth } from "../contexts/authContext";

function Subscribe() {
	const { userData } = useAuth();

	const { user_name, mobile_no } = userData;

	async function handleSubscription(amount) {
		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}/payment/create-order`,
			{
				name: user_name,
				mobile: mobile_no,
				amount,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(response.data);
		window.location.href = response.data.redirectUrl;
	}

	return (
		<>
			<section>
				<div className="h-screen grid place-content-center gap-4">
					<div className="text-center">
						<span className="font-bold tracking-wider uppercase text-blueClr">Pricing</span>
						<h2 className="text-2xl font-bold">Choose your best plan</h2>
					</div>
					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-4 -mx-4">
						<div className="flex mb-8 lg:mb-0">
							<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-gray-100 border border-gray-300">
								<div className="space-y-2">
									<h4 className="text-2xl font-bold">Beginner</h4>
									<span className="text-6xl font-bold">
										₹199
										<span className="text-sm tracking-wide">/month</span>
									</span>
								</div>
								<p className="mt-3 leading-relaxed text-gray-600">
									Etiam ac convallis enim, eget euismod dolor.
								</p>
								<ul className="flex-1 mb-6 text-gray-500">
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-blueClr"></i>
										<span>Add Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-xmark"></i>
										<span className="line-through">Search for Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-xmark"></i>
										<span className="line-through">24/7 Support</span>
									</li>
								</ul>
								<button
									type="button"
									className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-blueClr text-white"
									onClick={() => handleSubscription(199)}
								>
									SUBSCRIBE
								</button>
							</div>
						</div>
						<div className="flex mb-8 lg:mb-0">
							<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-blueClr text-white">
								<div className="space-y-2">
									<h4 className="text-2xl font-bold">Pro</h4>
									<span className="text-6xl font-bold">
										₹499
										<span className="text-sm tracking-wide">/3months</span>
									</span>
								</div>
								<p className="leading-relaxed">Morbi cursus ut sapien sit amet consectetur.</p>
								<ul className="flex-1 space-y-2">
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-white"></i>
										<span>Add Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-white"></i>
										<span>Search for Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-xmark text-white"></i>
										<span className="line-through">24/7 Support</span>
									</li>
								</ul>
								<button
									type="button"
									className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded bg-white text-blueClr"
									onClick={() => handleSubscription(499)}
								>
									SUBSCRIBE
								</button>
							</div>
						</div>
						<div className="flex mb-8 lg:mb-0">
							<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-gray-100 border border-gray-300">
								<div className="space-y-2">
									<h4 className="text-2xl font-bold">Advance</h4>
									<span className="text-6xl font-bold">
										₹999
										<span className="text-sm tracking-wide">/12months</span>
									</span>
								</div>
								<p className="leading-relaxed text-gray-600">
									Phasellus ultrices bibendum nibh in vehicula.
								</p>
								<ul className="space-y-2 text-gray-500">
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-blueClr"></i>
										<span>Add Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-blueClr"></i>
										<span>Search for Defaulters</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-blueClr"></i>
										<span>24/7 Support</span>
									</li>
									<li className="flex items-center mb-2 space-x-2">
										<i className="fa-solid fa-circle-check text-blueClr"></i>
										<span>Super saving plan</span>
									</li>
								</ul>
								<button
									type="button"
									className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-blueClr text-white"
									onClick={() => handleSubscription(999)}
								>
									SUBSCRIBE
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Subscribe;
