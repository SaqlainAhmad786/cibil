import { useAuth } from '../contexts/authContext'
import useAllUsers from '../hooks/useAllUsers'
import StatCard from '../components/StatCard'
import TrafficStats from '../components/TrafficStats'

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
            <section className="sm:p-8 p-4 space-y-4">
                <TrafficStats
                    users={users}
                    subscribers={subscribers}
                    defaultersList={defaultersList}
                />
                <div className="border-t border-gray-400 pt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
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
