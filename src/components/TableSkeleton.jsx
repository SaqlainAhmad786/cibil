
export default function TableSkeleton() {
    return (
        <section className="sm:p-4 p-2 space-y-4">
            <div className="overflow-x-auto rounded-xl shadow-md border">
                <table className="min-w-[800px] w-full divide-y divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">#</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Plan details</th>
                            <th className="px-6 py-3 text-left">Transaction details</th>
                            <th className="px-6 py-3 text-left">User details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                {[...Array(5)].map((_, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
