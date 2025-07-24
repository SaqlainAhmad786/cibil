import { useParams, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { useAuth } from "../../contexts/authContext"
import { useEffect, useRef, useState } from "react"
import { City, State } from "country-state-city"
import axios from "axios"

function EditDefaulter() {
    const { defaultersList, refreshDefaultersList } = useAuth()
    const { id } = useParams()
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [initialValues, setInitialValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        mobile_no: "",
        aadhar_no: "",
        address: "",
        state: "",
        city: "",
        firm_name: "",
        pending_from: "",
        sector: "",
        pending_amount: "",
        remark: "",
    })
    const navigate = useNavigate()
    const defaulterData = defaultersList.find((defaulter) => defaulter._id === id)
    const tokenRef = useRef(localStorage.getItem("token"));

    useEffect(() => {
        const fetchStates = async () => {
            const statesList = await State.getStatesOfCountry("IN")
            setStates(statesList)

            const stateData = statesList.find((state) => state.name.toLowerCase() === defaulterData?.address?.state)
            if (stateData) {
                const stateCode = stateData.isoCode
                fetchCities(stateCode)
            }
        }

        fetchStates()

        if (defaulterData) {
            setFormData({
                name: defaulterData?.name,
                mobile_no: defaulterData?.mobile_no,
                aadhar_no: defaulterData?.aadhar_no,
                address: defaulterData?.address?.address,
                state: defaulterData?.address?.state,
                city: defaulterData?.address?.city,
                firm_name: defaulterData?.firm_name,
                pending_amount: defaulterData?.pending_amount,
                remark: defaulterData?.remark,
                pending_from: defaulterData?.pending_from, // ✅ added
                sector: defaulterData?.sector,
            })
            setInitialValues({
                name: defaulterData?.name,
                mobile_no: defaulterData?.mobile_no,
                aadhar_no: defaulterData?.aadhar_no,
                address: defaulterData?.address?.address,
                state: defaulterData?.address?.state,
                city: defaulterData?.address?.city,
                firm_name: defaulterData?.firm_name,
                pending_amount: defaulterData?.pending_amount,
                remark: defaulterData?.remark,
                pending_from: defaulterData?.pending_from, // ✅ added
                sector: defaulterData?.sector,
            })
        }
    }, [defaulterData])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleStateChange = (event) => {
        const stateName = event.target.value
        const stateData = states.find((state) => state.name === stateName)
        const stateCode = stateData.isoCode
        fetchCities(stateCode)
        setFormData((prev) => ({ ...prev, city: "" }))
    }

    const fetchCities = async (stateCode) => {
        if (!stateCode) return // Ensure stateCode is valid before proceeding
        const citiesList = await City.getCitiesOfState("IN", stateCode)
        setCities(citiesList)
    }

    const isFormChanged = JSON.stringify(initialValues) == JSON.stringify(formData)
    const finalData = { ...formData, defaulter_id: id }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (isFormChanged) {
            toast.error("No changes made", { description: "Please make changes before saving" }, { duration: 3000 })
            setLoading(false)
            return
        }
        if (formData.city == "") {
            toast.error("Please select a city", { duration: 3000 })
            setLoading(false)
            return
        }
        try {
            await axios
                .put(`${import.meta.env.VITE_BASE_URL}/defaulter/update/${id}`, finalData, { headers: { Authorization: `Bearer ${tokenRef.current}` } })
                .then((res) => {
                    if (res.data.status) {
                        toast.success("Defaulter updated successfully", { duration: 3000 })
                        setLoading(false)
                        navigate("/overview/defaultersList")
                        refreshDefaultersList()
                    }
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    console.log(formData)
    return (
        <>
            <section className="customContainer bg-white p-5 rounded-lg mb-5 shadow-sm">
                <Toaster position="top-right" richColors />
                <div className="rounded-xl">
                    <img src="/img/fraud.png" alt="" className="w-20" />
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">Edit Defaulter data</h1>
                    <form encType="multipart/form-data">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5">
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Name</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 capitalize"
                                        placeholder="John Doe"
                                        name="name"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.name}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                                    <input
                                        type="number"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        placeholder="9876543210"
                                        name="mobile_no"
                                        maxLength="10"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.mobile_no}
                                    />
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                                        <input
                                            type="text"
                                            className="border rounded-lg px-3 py-2 mb-4 text-gray-500 text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase input-disabled"
                                            placeholder=""
                                            value={defaulterData?.pan_no}
                                            name="pan_card_no"
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">Aadhar Card No.</label>
                                        <input
                                            type="number"
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                            placeholder=""
                                            name="aadhar_no"
                                            onChange={(e) => handleInputChange(e)}
                                            value={formData.aadhar_no}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Address</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        placeholder=""
                                        name="address"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.address}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Country</label>
                                    <select
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full input-disabled"
                                        name="country"
                                        disabled
                                    >
                                        <option value={"India"} selected>
                                            {defaulterData?.address?.country}
                                        </option>
                                    </select>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">State</label>
                                        <select
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full"
                                            name="state"
                                            onChange={(e) => {
                                                handleStateChange(e)
                                                handleInputChange(e)
                                            }}
                                        >
                                            <option hidden>Select State</option>
                                            {states.map((state, index) => (
                                                <option value={state.name} key={index} selected={state.name.toLowerCase() === formData.state}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500">City/District</label>
                                        <select
                                            className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full"
                                            name="city"
                                            onChange={(e) => handleInputChange(e)}
                                        >
                                            <option hidden>Select City</option>
                                            {cities.map((city, index) => (
                                                <option value={city.name} key={index} selected={city.name.toLowerCase() === formData.city}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                        placeholder="Company"
                                        name="firm_name"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.firm_name}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-gray-500 text-sm w-full outline-none border-gray-300 bg-gray-100 input-disabled uppercase"
                                        placeholder=""
                                        name="gst_no"
                                        value={defaulterData?.gst_no}
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Pending Amount</label>
                                    <input
                                        type="number"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        placeholder="₹"
                                        name="pending_amount"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.pending_amount}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Sector</label>
                                    <input
                                        type="text"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        name="sector"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.sector}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Pending From</label>
                                    <input
                                        type="date"
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase"
                                        name="pending_from"
                                        onChange={handleInputChange}
                                        value={
                                            formData.pending_from && formData.pending_from.split("T")[0] <= new Date().toISOString().split("T")[0]
                                                ? formData.pending_from.split("T")[0]
                                                : ""
                                        }
                                        max={new Date().toISOString().split("T")[0]}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Remark</label>
                                    <textarea
                                        rows={5}
                                        className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100"
                                        placeholder="Message"
                                        name="remark"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formData.remark}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center text-white bg-blueClr hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? <l-mirage size="86" speed="4" color="white"></l-mirage> : "SAVE CHANGES"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditDefaulter
