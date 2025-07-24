import axios from 'axios'
import UserDetailModel from '../components/UserDetailModel'
import useAllUsers from '../hooks/useAllUsers'
import { useState } from 'react'

function PendingUsers() {
    const { pendingUsers, refetchPendingUsers } = useAllUsers()
    const token = localStorage.getItem('token')
    const [loader, setLoader] = useState(false)

    const handleApprove = async (id, type) => {
        try {
            setLoader(true)
            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/admin/user-status?id=${id}&action=${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            await refetchPendingUsers()
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <section className="sm:p-4 p-2 space-y-4">
                <div className="overflow-x-auto rounded-xl shadow-md border">
                    <table className="min-w-[800px] w-full divide-y divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 text-left">#</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Joined on</th>
                                <th className="px-6 py-3 text-left">Details</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {pendingUsers?.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4">{index}</td>
                                    <td className="px-6 py-4">{user.user_name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {new Date(user.createdAt).toDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <UserDetailModel user={user} />
                                    </td>
                                    <td className="px-6 py-4 space-x-1">
                                        <button
                                            className="btn btn-success text-white "
                                            onClick={() => handleApprove(user._id, 'approve')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-error text-white "
                                            onClick={() => handleApprove(user._id, 'reject')}
                                        >
                                            Decline
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!pendingUsers?.length && (
                        <h1 className="text-center bg-white">No Pending Users</h1>
                    )}
                </div>
            </section>
        </>
    )
}

export default PendingUsers
