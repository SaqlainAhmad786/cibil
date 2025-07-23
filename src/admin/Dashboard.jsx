import useAllUsers from '../hooks/useAllUsers'
import StatCard from '../components/StatCard'
import TrafficStats from '../components/TrafficStats'
import { useAuth } from '../contexts/authContext'

export default function Dashboard() {
    const { users, subscribers } = useAllUsers()
    const { defaultersList } = useAuth()

    const statsList = [
        {
            title: 'Active User',
            value: users?.filter((u) => u.status === 'active').length || 0,
        },
        {
            title: 'Inactive User',
            value: users?.filter((u) => u.status === 'inactive').length || 0,
        },
        {
            title: 'Pending Users',
            value: users?.filter((u) => u.status === 'pending').length || 0,
        },
        {
            title: 'Total Users',
            value: users?.length || 0,
        },
        {
            title: 'Total Subscriptions',
            value: users?.filter((u) => u.isSubscribed).length || 0,
        },
        {
            title: 'total non-subscribed',
            value: users?.filter((u) => !u.isSubscribed).length || 0,
        },
    ]
    return (
        <>
            <section className="p-8 space-y-4">
                <div>
                    <h1 className="font-bold text-2xl bg-blueClr text-white px-4 py-2 rounded">
                        Stats
                    </h1>
                </div>
                <TrafficStats
                    users={users}
                    subscribers={subscribers}
                    defaultersList={defaultersList}
                />
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {statsList.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
