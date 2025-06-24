import { useEffect, useState } from "react";
import { City, State } from "country-state-city";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { toast, Toaster } from "sonner"
import AlertModal from "./AlertModal";

function AddDefaulter() {
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobNumber, setMobNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { userData, refreshDefaultersList } = useAuth();

    useEffect(() => {
        const fetchStates = () => {
            const statesList = State.getStatesOfCountry("IN")
            setStates(statesList);
        };
        fetchStates()
    }, [])

    const handleMobNumber = (e) => {
        const input = e.target.value;
        if (/^\d{0,10}$/.test(input)) {
            setMobNumber(input);
        }
    };
    const handleAadharNumber = (e) => {
        const input = e.target.value;
        if (/^\d{0,12}$/.test(input)) {
            setAadharNumber(input);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        if (aadharNumber.length < 12) {
            toast.error("Please enter a valid Aadhar number", { description: "Aadhar number must be 12 digits long" }, { duration: 3000 });
            setLoading(false);
            return
        }

        if (mobNumber.length < 10) {
            toast.error("Please enter a valid mobile number", { description: "Mobile number must be 10 digits long" }, { duration: 3000 });
            setLoading(false);
            return
        }

        if (!userData.isSubscribed) {
            setShowModal(true);
            setLoading(false);
            return
        }

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/defaulter/add-defaulter`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
                if (res.data.status == 200) {
                    toast.success("Defaulter added successfully", { duration: 3000 });
                    setMobNumber("");
                    setAadharNumber("");
                    setLoading(false);
                    refreshDefaultersList();
                    e.target.reset();
                    toast.success("Defaulter added successfully", { duration: 3000 });
                }
            })
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error("Failed to add defaulter", { duration: 3000 });
            setLoading(false);
        }
    };

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        const stateData = states.find((state) => state.name === stateName);
        const stateCode = stateData.isoCode;
        fetchCities(stateCode);
    };

    const fetchCities = (stateCode) => {
        const citiesList = City.getCitiesOfState("IN", stateCode);
        setCities(citiesList);
    };

    return (
        <>
            <section className="customContainer bg-white p-5 rounded-lg mb-5 shadow-sm">
                <Toaster position="top-right" richColors />
                {showModal && <AlertModal />}
                <div className="rounded-xl">
                    <img src="/img/fraud.png" alt="" className="w-20" />
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                        Report a Defaulter
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5" >
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="John Doe" name="name" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                                    <input type="number" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="9876543210" name="mobile_no" value={mobNumber} onChange={handleMobNumber} maxLength="10" />
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                                        <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase" placeholder="" name="pan_no" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">Aadhar Card No.</label>
                                        <input type="number" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="" name="aadhar_no" value={aadharNumber} onChange={handleAadharNumber} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Address</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="" name="address" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Country</label>
                                    <select className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full" name="country">
                                        <option value={"India"} selected>India</option>
                                    </select>
                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-3 gap-0">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">State</label>
                                        <select className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full" name="state" onChange={(e) => handleStateChange(e)}>
                                            <option hidden>Select State</option>
                                            {states.map((state, index) => <option value={state.name} key={index}>{state.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-xs text-gray-500 ">City/District</label>
                                        <select className="border rounded-lg px-3 py-2 mb-4 text-black text-sm outline-none border-gray-300 bg-gray-100 w-full" name="city">
                                            <option hidden>Select City</option>
                                            {cities.length === 0
                                                ? <option disabled>Select State first</option>
                                                : cities.map((city, index) => <option value={city.name} key={index}>{city.name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="Company" name="firm_name" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100 uppercase" placeholder="" name="gst_no" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Pending Amount</label>
                                    <input type="number" className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="₹" name="pending_amount" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Remark</label>
                                    <textarea rows={5} className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none border-gray-300 bg-gray-100" placeholder="Message" name="remark" />
                                </div>
                                <div className="mb-5 space-y-2">
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-xs text-gray-500 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Upload Ledger Statement</label>
                                        <input name="bank_statement" type="file" className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-gray-100 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-xs text-gray-500 font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Upload Notice or other documents <span className="font-normal">(optional)</span></label>
                                        <input name="other_document" type="file" className="flex h-10 w-full rounded-md border border-gray-300 border-input bg-gray-100 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center items-center text-white bg-blueClr hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">
                                {loading
                                    ? <l-mirage size="86" speed="4" color="white"></l-mirage>
                                    : "POST"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddDefaulter
