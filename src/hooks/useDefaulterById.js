import axios from "axios";
import { useEffect, useState } from "react";

export default function useDefaulterById(id) {
	const token = localStorage.getItem("token");
	const [defaulter, setDefaulter] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDefaulter() {
			try {
				setLoading(true);
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/defaulter/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setDefaulter(response.data.defaulter[0]);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		fetchDefaulter();
	}, [id]);

	return { defaulter, loading };
}
