import axios from "axios";
import { useEffect, useState } from "react";

export default function useAllUsers(id) {
	const token = localStorage.getItem("token");
	const [users, setUsers] = useState(null);
	const [singleUser, setSingleUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			fetchUser();
		}
		fetchUsers();
	}, [id]);

	async function fetchUsers() {
		try {
			setLoading(true);
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user?limit=20`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(response.data.users);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function fetchUser() {
		try {
			setLoading(true);
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSingleUser(response.data.user);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return { users, singleUser, loading };
}
