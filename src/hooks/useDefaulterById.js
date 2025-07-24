import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useDefaulterById(id) {
	const [defaulter, setDefaulter] = useState(null);
	const [loading, setLoading] = useState(true);
	const tokenRef = useRef(localStorage.getItem("token"));

	useEffect(() => {
		if (!id) return;

		const fetchDefaulter = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/defaulter/${id}`,
					{
						headers: {
							Authorization: `Bearer ${tokenRef.current}`,
						},
					}
				);
				setDefaulter(response.data.defaulter?.[0] || null);
			} catch (error) {
				console.error("Error fetching defaulter:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDefaulter();
	}, [id]);

	return { defaulter, loading };
}
