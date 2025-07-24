export default function StatCard({ title, value }) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <dl className="space-y-2">
                <dt className="text-sm capitalize text-gray-500 font-bold">{title}</dt>
                <dd className="text-5xl font-medium md:text-6xl">{value}</dd>
            </dl>
        </div>
    )
}
