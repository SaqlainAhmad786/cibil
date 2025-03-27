import { Link } from "react-router-dom";
import useAllUsers from "../hooks/useAllUsers";

export default function Users() {
	const { users } = useAllUsers();
	console.log(users);

	return (
		<section>
			<ul>
				{users?.map((user, index) => (
					<li key={user._id}>
						<Link to={`/admin/user/${user._id}`}>
							{index + 1}. {user.user_name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
