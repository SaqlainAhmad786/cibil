import useAllUsers from '../hooks/useAllUsers'
import { useState } from 'react'
import TableSkeleton from '../components/TableSkeleton'
import { Eye } from 'lucide-react'
import UserDetailModel from '../components/UserDetailModel'

export default function Users() {
    const { users, loading, usersTotalPages, setUserPage, userPage, limit } = useAllUsers()

    const [subscriptionFilter, setSubscriptionFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredData = users?.filter((user) => {
        const matchesSubscription =
            subscriptionFilter === 'all' ||
            (subscriptionFilter === 'subscribed' && user.isSubscribed) ||
            (subscriptionFilter === 'not-subscribed' && !user.isSubscribed)

        const matchesStatus = statusFilter === 'all' || user.status === statusFilter

        return matchesSubscription && matchesStatus
    })

    if (loading) {
        return (
            <>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-md bg-white border px-4 py-2 w-48 h-10 animate-pulse">
                        <div className="bg-gray-200 rounded w-full h-full"></div>
                    </div>
                    <div className="rounded-md bg-white border px-4 py-2 w-60 h-10 animate-pulse">
                        <div className="bg-gray-200 rounded w-full h-full"></div>
                    </div>
                </div>
                <TableSkeleton />
            </>
        )
    }

    if (!users?.length)
        return (
            <p className="h-full w-full flex items-center justify-center font-semibold text-xl">
                No Users
            </p>
        )

    return (
        <section className="sm:p-4 p-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-md bg-white border px-4 py-2">
                    Total Users: {users?.length || 0}
                </div>
                <div className="rounded-md bg-white border px-4 py-2">
                    Total Subscribers: {users?.filter((user) => user?.isSubscribed)?.length || 0}
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md border">
                <table className="min-w-[800px] w-full divide-y divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">#</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex flex-col space-y-1">
                                    <select
                                        value={subscriptionFilter}
                                        onChange={(e) => setSubscriptionFilter(e.target.value)}
                                        className="mt-1 block w-32 text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="subscribed">Subscribed</option>
                                        <option value="not-subscribed">Not Subscribed</option>
                                    </select>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">
                                <div className="flex flex-col space-y-1">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="mt-1 block w-32 text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {filteredData?.length === 0 && (
                            <tr className="text-center">
                                <td colSpan="6">No users found</td>
                            </tr>
                        )}
                        {filteredData?.map((user, index) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4">{(userPage - 1) * limit + index + 1}</td>
                                <td className="px-6 py-4 capitalize">{user.user_name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            user.isSubscribed
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {user.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`capitalize inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            user.status === 'active' &&
                                            'bg-green-100 text-green-700'
                                        } ${
                                            user.status === 'inactive' && 'bg-red-100 text-red-700'
                                        } ${
                                            user.status === 'pending' &&
                                            'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <UserDetailModel user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="join flex justify-center">
                <button
                    className="join-item btn bg-white"
                    onClick={() => setUserPage(userPage - 1)}
                    disabled={userPage === 1}
                >
                    «
                </button>
                <button className="join-item btn bg-white">Page {userPage}</button>
                <button
                    className="join-item btn bg-white"
                    onClick={() => setUserPage(userPage + 1)}
                    disabled={userPage === usersTotalPages}
                >
                    »
                </button>
            </div>
        </section>
    )
}
