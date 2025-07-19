import { useEffect, useState } from "react"
import { City, State } from "country-state-city"
import { useAuth } from "../contexts/authContext"
import axios from "axios"
import { toast, Toaster } from "sonner"
import AlertModal from "./AlertModal"

function AddDefaulter() {
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false)
    const [mobNumber, setMobNumber] = useState(sessionStorage.getItem("mobNumber") || "")
    const [aadharNumber, setAadharNumber] = useState(sessionStorage.getItem("aadharNumber") || "")
    const [showModal, setShowModal] = useState(false)
    const { userData, refreshDefaultersList } = useAuth()

    useEffect(() => {
        const fetchStates = () => {
            const statesList = State.getStatesOfCountry("IN")
            setStates(statesList)
        }
        fetchStates()
    }, [])

    const handleMobNumber = (e) => {
        const input = e.target.value
        if (/^\d{0,10}$/.test(input)) {
            setMobNumber(input)
        }
        sessionStorage.setItem("mobNumber", input)
    }
    const handleAadharNumber = (e) => {
        const input = e.target.value
        if (/^\d{0,12}$/.test(input)) {
            setAadharNumber(input)
        }
        sessionStorage.setItem("aadharNumber", input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const formData = new FormData(form)

        if (mobNumber.length < 10) {
            toast.error("Please enter a valid mobile number", { description: "Mobile number must be 10 digits long" }, { duration: 3000 })
            setLoading(false)
            return
        }

        if (!userData.isSubscribed) {
            setShowModal(true)
            setLoading(false)
            return
        }

        try {
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}/defaulter/add-defaulter`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
                .then((res) => {
                    if (res.data.status == 200) {
                        toast.success("Defaulter added successfully", { duration: 3000 })
                        setMobNumber("")
                        setAadharNumber("")
                        setLoading(false)
                        refreshDefaultersList()
                        e.target.reset()
                        sessionStorage.clear()
                        toast.success("Defaulter added successfully", { duration: 3000 })
                    }
                })
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message)
            toast.error("Failed to add defaulter", { duration: 3000 })
            setLoading(false)
        }
    }

    const handleStateChange = (event) => {
        const stateName = event.target.value
        const stateData = states.find((state) => state.name === stateName)
        const stateCode = stateData.isoCode
        fetchCities(stateCode)
    }

    const fetchCities = (stateCode) => {
        const citiesList = City.getCitiesOfState("IN", stateCode)
        setCities(citiesList)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        sessionStorage.setItem(name, value)
    }

    return (
        <>
            <section className="customContainer bg-white p-5 rounded-lg mb-5 shadow-sm">
                <Toaster position="top-right" richColors />
                {showModal && <AlertModal />}
                <div className="rounded-xl">
                    <img src="/img/fraud.png" alt="" className="w-20" />
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">Report a Defaulter</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5">
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Name</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        name="name"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("name") || ""}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                                    <input
                                        type="number"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        name="mobile_no"
                                        value={mobNumber}
                                        onChange={handleMobNumber}
                                        maxLength="10"
                                        required
                                    />
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">
                                            PAN Card No. <span className="text-xs font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                            name="pan_no"
                                            onChange={handleInputChange}
                                            defaultValue={sessionStorage.getItem("pan_no") || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">
                                            Aadhar Card No. <span className="text-xs font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                            name="aadhar_no"
                                            value={aadharNumber}
                                            onChange={handleAadharNumber}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Address</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        name="address"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("address") || ""}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Country</label>
                                    <select className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full" name="country">
                                        <option value={"India"} selected>
                                            India
                                        </option>
                                    </select>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">State</label>
                                        <select
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full"
                                            name="state"
                                            onChange={(e) => handleStateChange(e)}
                                        >
                                            <option hidden>Select State</option>
                                            {states.map((state, index) => (
                                                <option value={state.name} key={index}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">City/District</label>
                                        <select className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full" name="city">
                                            <option hidden>Select City</option>
                                            {cities.length === 0 ? (
                                                <option disabled>Select State first</option>
                                            ) : (
                                                cities.map((city, index) => (
                                                    <option value={city.name} key={index}>
                                                        {city.name}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        name="firm_name"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("firm_name") || ""}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Select Industry</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                        name="sector"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("sector") || ""}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Pending From</label>
                                    <input
                                        type="date"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                        name="pending_from"
                                        onChange={handleInputChange}
                                        defaultValue={(() => {
                                            const savedDate = sessionStorage.getItem("pending_from")
                                            const today = new Date().toISOString().split("T")[0]
                                            return savedDate && savedDate <= today ? savedDate : ""
                                        })()}
                                        max={new Date().toISOString().split("T")[0]}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">
                                        GST No. <span className="text-xs font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                        name="gst_no"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("gst_no") || ""}
                                    />
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">Pending Amount</label>
                                        <input
                                            type="number"
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                            placeholder="₹"
                                            name="pending_amount"
                                            onChange={handleInputChange}
                                            defaultValue={sessionStorage.getItem("pending_amount") || ""}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">Amount Pending </label>
                                        <input
                                            type="date"
                                            className="border rounded-lg px-3 py-[7px] mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                            name="pending_amount_date"
                                            onChange={handleInputChange}
                                            defaultValue={sessionStorage.getItem("pending_amount_date") || ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Remark</label>
                                    <textarea
                                        rows={5}
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        placeholder="Message"
                                        name="remark"
                                        onChange={handleInputChange}
                                        defaultValue={sessionStorage.getItem("remark") || ""}
                                    />
                                </div>
                                <div className="mb-5 space-y-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-xs text-gray-500 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Upload Ledger Statement
                                        </label>
                                        <input
                                            name="bank_statement"
                                            type="file"
                                            className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-gray-100 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                                            required
                                            accept="image/*,application/pdf"
                                        />
                                        <span className="text-xs text-gray-600">*Images & PDFs only.</span>
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-xs text-gray-500 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Upload Notice or other documents <span className="font-normal">(optional)</span>
                                        </label>
                                        <input
                                            name="other_document"
                                            type="file"
                                            className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-gray-100 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                                            accept="image/*,application/pdf"
                                        />
                                        <span className="text-xs text-gray-600">*Images & PDFs only.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center text-white bg-blueClr hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                            >
                                {loading ? <l-mirage size="86" speed="4" color="white"></l-mirage> : "POST"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddDefaulter
