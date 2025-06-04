import axios from "axios"
import { useAuth } from "../contexts/authContext"
import { useEffect, useState } from "react"

function Subscribe() {
    const { userData } = useAuth()
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    const { user_name, mobile_no } = userData

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/admin/plan/${userData.business_type}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                setPlans(response.data.plans)
                console.log(response.data.plans)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlans()
    }, [userData])

    async function handleSubscription(plan) {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/payment/create-order`,
            {
                name: user_name,
                mobile: mobile_no,
                amount: plan.price,
                plan: plan._id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )

        window.location.href = response.data.redirectUrl
        setLoading(false)
    }

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <>
            <section>
                <div className="min-h-[100dvh] py-8 px-4 h-full grid place-content-center gap-4">
                    <div className="text-center">
                        <span className="font-bold tracking-wider uppercase text-blueClr">Pricing</span>
                        <h2 className="text-2xl font-bold">Choose your best plan</h2>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-4 -mx-4">
                        {plans.map((plan, index) => (
                            <div className="flex mb-8 lg:mb-0" key={index}>
                                <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-gray-100 border border-gray-300">
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold uppercase">{plan.name}</h4>
                                        <span className="text-6xl font-bold">
                                            ₹{plan.price}
                                            <span className="text-sm tracking-wide">/{plan.durationType}</span>
                                        </span>
                                    </div>
                                    <p className="mt-3 leading-relaxed text-gray-600">
                                        Etiam ac convallis enim, eget euismod dolor.
                                    </p>
                                    <ul className="flex-1 mb-6 text-gray-500">
                                        <li className="flex items-center mb-2 space-x-2">
                                            <i className="fa-solid fa-circle-check text-blueClr"></i>
                                            <span>Add Defaulters</span>
                                        </li>
                                        {plan.name === "professional" && (
                                            <>
                                                <li className="flex items-center mb-2 space-x-2">
                                                    <i className="fa-solid fa-circle-check text-blueClr"></i>
                                                    <span>Search for Defaulters</span>
                                                </li>
                                                <li className="flex items-center mb-2 space-x-2">
                                                    <i className="fa-solid fa-circle-check text-blueClr"></i>
                                                    <span>24/7 Support</span>
                                                </li>
                                            </>
                                        )}
                                        {plan.name === "advance" && (
                                            <>
                                                <li className="flex items-center mb-2 space-x-2">
                                                    <i className="fa-solid fa-circle-check text-blueClr"></i>
                                                    <span>Search for Defaulters</span>
                                                </li>
                                                <li className="flex items-center mb-2 space-x-2">
                                                    <i className="fa-solid fa-circle-check text-blueClr"></i>
                                                    <span>24/7 Support</span>
                                                </li>
                                                <li className="flex items-center mb-2 space-x-2">
                                                    <i className="fa-solid fa-circle-check text-blueClr"></i>
                                                    <span>Super saving plan</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                    <button
                                        type="button"
                                        className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-blueClr text-white"
                                        onClick={() => handleSubscription(plan)}
                                    >
                                        SUBSCRIBE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Subscribe
