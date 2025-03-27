import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

export default function EditPlan({ plan, toast }) {
	const { loadPlans } = useAuth();
	const [price, editPrice] = useState(plan.price);

	const handleForm = async (e) => {
		e.preventDefault();
		await axios
			.patch(
				`${import.meta.env.VITE_BASE_URL}/admin/plan/${plan._id}`,
				{ price },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			)
			.then((res) => {
				loadPlans();
				toast.success(res.data.message, { position: "top-center", duration: 2000 });
			})
			.catch((err) => {
				toast.success(err.message, { position: "top-center", duration: 2000 });
			});
	};

	return (
		<form className="space-y-4">
			<div className="flex flex-col gap-2">
				<label htmlFor="price">Price:</label>
				<input
					type="number"
					id="price"
					name="price"
					className="border outline-none rounded-md px-2 py-1"
					value={price}
					onChange={(e) => editPrice(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-2">
				<button
					className="btn bg-blue-400 hover:bg-blue-500 text-white"
					onClick={(e) => {
						handleForm(e);
					}}
				>
					Update price
				</button>
				<label
					htmlFor={plan._id}
					className="cursor-pointer btn bg-red-400 hover:bg-red-500 text-white"
					title="close"
				>
					Cancel
				</label>
			</div>
		</form>
	);
}
