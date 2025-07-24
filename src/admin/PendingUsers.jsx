function PendingUsers() {
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
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">John Doe</td>
                                <td className="px-6 py-4">jdoe123</td>
                                <td className="px-6 py-4">2023-02-01</td>
                                <td className="px-6 py-4 space-x-1">
                                    <button className="btn btn-success">
                                        Approve
                                    </button>
                                    <button className="btn btn-error">
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <div className="join flex justify-center">
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
                </div> */}
            </section>
        </>
    )
}

export default PendingUsers
