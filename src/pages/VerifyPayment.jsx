import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

export default function VerifyPayment() {
	const { refreshUserData } = useAuth()
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
			refreshUserData()
			navigate("/", { state: { paymentCompleted: true } });
		}
		if (response.data.state === "PENDING") {
			refreshUserData()
			navigate("/subscribe", { state: { paymentPending: true } });
		}
		if (response.data.state === "FAILED") {
			refreshUserData()
			navigate("/subscribe", { state: { paymentFailed: true } });
		}
	}

	useEffect(() => {
		verifyPayment();
	}, []);

	return <div className="w-screen h-screen grid place-items-center">Verifying Your Payment...</div>;
}
