import { useParams } from "react-router-dom";
import useAllUsers from "../hooks/useAllUsers";

export default function User() {
	const { id } = useParams();

	const { singleUser } = useAllUsers(id);
	return <div>{singleUser?.user_name}</div>;
}
