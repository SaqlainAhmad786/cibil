import { useMemo, useState } from 'react'
import StatCard from './StatCard'

export default function TrafficStats({ users, defaultersList, subscribers }) {
    const now = new Date()
    const [selectedRange, setSelectedRange] = useState('weekly')

    const counts = useMemo(() => {
        let weekly = 0
        let monthly = 0
        let halfYearly = 0
        let yearly = 0

        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 6)

        for (const user of users || []) {
            const createdAt = new Date(user.createdAt)
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24)

            if (diffInDays <= 7) weekly++
            if (
                createdAt.getMonth() === now.getMonth() &&
                createdAt.getFullYear() === now.getFullYear()
            )
                monthly++
            if (createdAt >= sixMonthsAgo) halfYearly++
            if (createdAt.getFullYear() === now.getFullYear()) yearly++
        }

        return { weekly, monthly, halfYearly, yearly }
    }, [users])

    const defaulters = useMemo(() => {
        let weekly = 0
        let monthly = 0
        let halfYearly = 0
        let yearly = 0

        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 6)

        for (const defaulter of defaultersList || []) {
            const createdAt = new Date(defaulter.createdAt)
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24)

            if (diffInDays <= 7) weekly++
            if (
                createdAt.getMonth() === now.getMonth() &&
                createdAt.getFullYear() === now.getFullYear()
            )
                monthly++
            if (createdAt >= sixMonthsAgo) halfYearly++
            if (createdAt.getFullYear() === now.getFullYear()) yearly++
        }

        return { weekly, monthly, halfYearly, yearly }
    }, [defaultersList])

    const subs = useMemo(() => {
        let weekly = 0
        let monthly = 0
        let halfYearly = 0
        let yearly = 0

        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(now.getMonth() - 6)

        for (const subscriber of subscribers || []) {
            const createdAt = new Date(subscriber.createdAt)
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24)

            if (diffInDays <= 7) weekly++
            if (
                createdAt.getMonth() === now.getMonth() &&
                createdAt.getFullYear() === now.getFullYear()
            )
                monthly++
            if (createdAt >= sixMonthsAgo) halfYearly++
            if (createdAt.getFullYear() === now.getFullYear()) yearly++
        }

        return { weekly, monthly, halfYearly, yearly }
    }, [subscribers])

    const selectedCount = useMemo(() => {
        switch (selectedRange) {
            case 'weekly':
                return counts.weekly
            case 'monthly':
                return counts.monthly
            case 'halfYearly':
                return counts.halfYearly
            case 'yearly':
                return counts.yearly
            default:
                return 0
        }
    }, [selectedRange, counts])
    const selectedDefaulters = useMemo(() => {
        switch (selectedRange) {
            case 'weekly':
                return defaulters.weekly
            case 'monthly':
                return defaulters.monthly
            case 'halfYearly':
                return defaulters.halfYearly
            case 'yearly':
                return defaulters.yearly
            default:
                return 0
        }
    }, [selectedRange, defaulters])

    const selectedSubscribers = useMemo(() => {
        switch (selectedRange) {
            case 'weekly':
                return subs.weekly
            case 'monthly':
                return subs.monthly
            case 'halfYearly':
                return subs.halfYearly
            case 'yearly':
                return subs.yearly
            default:
                return 0
        }
    }, [selectedRange, subs])

    return (
        <div className="bg-white shadow rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">User Registrations</h2>
                <select
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                    <option value="weekly">Last 7 Days</option>
                    <option value="monthly">This Month</option>
                    <option value="halfYearly">Last 6 Months</option>
                    <option value="yearly">This Year</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 ">
                <StatCard
                    title="User registered"
                    value={selectedCount}
                />
                <StatCard
                    title="Defaulter added"
                    value={selectedDefaulters}
                />
                <StatCard
                    title="Users Subscribed"
                    value={selectedSubscribers}
                />
            </div>
        </div>
    )
}
