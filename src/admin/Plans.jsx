import { useEffect, useRef, useState } from "react";
import EditPlan from "./EditPlan";
import { Toaster } from "sonner";
import axios from "axios";

export default function Plans() {
	const [plans, setPlans] = useState([]);
	const tokenRef = useRef(localStorage.getItem("token"));

	useEffect(() => {
		loadPlans();
	}, []);

	async function loadPlans() {
		try {
			await axios
				.get(`${import.meta.env.VITE_BASE_URL}/admin/plan`, {
					headers: { Authorization: `Bearer ${tokenRef.current}` },
				})
				.then((res) => {
					setPlans(res.data.plans)
				})
		} catch (error) {
			console.error("Error fetching plans: ", error)
		}
	}

	return (
		<>
			<Toaster />
			<section className="p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{plans.map((plan) => (
						<div key={plan._id} className="relative bg-white px-6 py-4 shadow-lg rounded-lg">
							<span className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap">
								{plan.name}
							</span>

							<h3 className="mt-4 text-lg font-medium text-gray-900">
								business type : {plan.businessType}
							</h3>

							<p className="mt-1.5 text-sm text-gray-700">
								Price : {plan.price}/{plan.durationType}
							</p>

							<label htmlFor={plan._id} className="btn mt-4">
								Edit Plan
							</label>

							<input type="checkbox" id={plan._id} className="modal-toggle" />
							<div className="modal" role="dialog">
								<div className="modal-box">
									<EditPlan plan={plan} />
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
