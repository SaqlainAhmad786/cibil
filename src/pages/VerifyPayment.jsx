import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyPayment() {
	const { transactionId } = useParams();
	const navigate = useNavigate();

	async function verifyPayment() {
		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}/payment/payment-status/${transactionId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		if (response.data.state === "COMPLETED") {
			navigate("/");
		}
		if (response.data.state === "PENDING") {
			navigate("/subscribe");
		}
		if (response.data.state === "FAILED") {
			navigate("/subscribe");
		}
	}

	useEffect(() => {
		verifyPayment();
	}, []);

	return <div className="w-screen h-screen grid place-items-center">Verifying Your Payment...</div>;
}
