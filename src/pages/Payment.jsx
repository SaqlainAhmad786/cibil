import axios from "axios";

export default function Payment() {
	const handlePayment = async () => {
		const data = {
			name: "John Doe",
			mobile: 1234567890,
			amount: 500,
		};
		try {
			const response = await axios.post("http://localhost:8000/api/v1/payment/create-order", data);
			console.log(response.data);
			// window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
		} catch (error) {
			console.log("error in payment", error);
		}
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
			</div>
		</>
	);
}
