import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Payment() {
	const navigate = useNavigate();
	const handlePayment = async () => {
		const data = {
			name: "saqlain",
			mobile: 7309943815,
			amount: 1023,
		};
		try {
			const response = await axios.post("http://localhost:8000/api/v1/payment/create-order", data);
			sessionStorage.setItem("merchantTransactionId", response.data.data.merchantTransactionId);
			window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
		} catch (error) {
			console.log("error in payment", error);
		}
	};

	const handleStatusCheck = async () => {
		const transactionID = sessionStorage.getItem("merchantTransactionId");
		const response = await axios.post(`http://localhost:8000/api/v1/payment/payment-status`, {
			transactionID,
		});

		console.log(response);
	};

	return (
		<>
			<div>
				<button
					className="bg-red-300 px-6 py-2 rounded-md"
					onClick={handlePayment}
				>
					Pay
				</button>
				<button
					className="bg-red-300 px-6 py-2 rounded-md"
					onClick={handleStatusCheck}
				>
					Status
				</button>
			</div>
		</>
	);
}
