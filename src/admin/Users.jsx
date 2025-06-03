import { Link } from "react-router-dom"
import useAllUsers from "../hooks/useAllUsers"
import { useState } from "react"

export default function Users() {
    const { users } = useAllUsers()
    const [filter, setFilter] = useState("all")
    const filteredData = users?.filter((user) => {
        if (filter === "all") return true
        if (filter === "subscribed") return user.isSubscribed
        if (filter === "not-subscribed") return !user.isSubscribed
        return true
    })

    return (
        <section className="p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-md bg-white border px-4 py-2">Total Users: {users?.length || 0}</div>
                <div className="rounded-md bg-white border px-4 py-2">
                    Total Subscribers: {users?.filter((user) => user?.isSubscribed).length || 0}
                </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-md border">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">#</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex flex-col space-y-1">
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="mt-1 block w-32 text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="subscribed">Subscribed users</option>
                                        <option value="not-subscribed">Not Subscribed users</option>
                                    </select>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {filteredData?.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{user.user_name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            user.isSubscribed
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {user.isSubscribed ? "Subscribed" : "Not Subscribed"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/admin/user/${user._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                    >
                                        View Profile
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className="space-y-2"></ul>
        </section>
    )
}
