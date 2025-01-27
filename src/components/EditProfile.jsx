import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { City, State } from "country-state-city";
import Loader from "./Loader/Loader";
import axios from "axios";
import { toast, Toaster } from "sonner";

function EditProfile() {
    const { userData, refreshUserData, userLoading } = useAuth();
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([]);
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        mobile_no: '',
        address: '',
        state: '',
        city: '',
        firm_name: '',
        gst_no: '',
        pan_no: '',
    });
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            const statesList = await State.getStatesOfCountry("IN");
            setStates(statesList);

            const stateData = statesList.find((state) => state.name === userData?.state);
            if (stateData) {
                const stateCode = stateData.isoCode;
                fetchCities(stateCode);
            }
        };

        if (userData) {
            setFormData({
                user_name: userData?.user_name,
                mobile_no: userData?.mobile_no,
                address: userData?.address,
                state: userData?.state,
                city: userData?.city,
                firm_name: userData?.firm_name,
                gst_no: userData?.gst_no,
                pan_no: userData?.pan_no,
            });
            setInitialValues({
                user_name: userData?.user_name,
                mobile_no: userData?.mobile_no,
                address: userData?.address,
                state: userData?.state,
                city: userData?.city,
                firm_name: userData?.firm_name,
                gst_no: userData?.gst_no,
                pan_no: userData?.pan_no,
            });

            fetchStates();
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const isFormChanged = JSON.stringify(initialValues) == JSON.stringify(formData);
    const finalData = { ...formData, user_id: id };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (isFormChanged) {
            toast.error("No changes made", { description: "Please make changes before saving" }, { duration: 3000 });
            setLoading(false);
            return
        }
        if (formData.city == '') {
            toast.error("Please select a city", { duration: 3000 });
            setLoading(false);
            return
        }
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/userEditById/${id}`, finalData).then(res => {
                if (res.data.status) {
                    toast.success("Profile updated successfully", { duration: 3000 });
                    setLoading(false);
                    navigate('/overview/profile')
                    refreshUserData();
                }
            })
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };

    const handleStateChange = (event) => {
        const stateName = event.target.value;
        const stateData = states.find((state) => state.name === stateName);

        if (stateData) {
            const stateCode = stateData.isoCode;
            fetchCities(stateCode);
        }

        setFormData(prev => ({ ...prev, state: stateName, city: '' })); // Clear city on state change
    };

    const fetchCities = async (stateCode) => {
        if (!stateCode) return;
        const citiesList = await City.getCitiesOfState("IN", stateCode);
        setCities(citiesList);
    };

    return (
        <>
            <section className="my-4">
                <Toaster position="top-right" richColors />
                {userLoading && <Loader />}
                <form className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm" >
                    <div className="flex items-center gap-2 border-b pb-3">
                        <button type="button" onClick={() => navigate('/overview/profile')}><i className="fa-solid fa-angle-left text-sm"></i></button>
                        <h2 className="flex items-center gap-2 text-2xl font-semibold border-neutral-200">
                            Edit Profile
                        </h2>
                    </div>
                    <div className='space-y-3 my-4'>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Full Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100 capitalize" placeholder="Sunil Kumar" name="user_name" onChange={e => handleInputChange(e)} value={formData.user_name} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                            <input type="number" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100" placeholder="9876543210" name="mobile_no" onChange={e => handleInputChange(e)} value={formData.mobile_no} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Address</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100" name="address" onChange={(e) => handleInputChange(e)} value={formData.address} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">State</label>
                            <select className="border rounded-lg px-3 py-2 text-black text-sm outline-none border-gray-200 bg-gray-100 w-full" name="state" onChange={(e) => {
                                handleStateChange(e);
                                handleInputChange(e);
                            }}>
                                <option hidden>Select State</option>
                                {states.map((state, index) => <option value={state.name} key={index} selected={state.name === formData.state}>{state.name}</option>)}
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">City</label>
                            <select className="border rounded-lg px-3 py-2 text-black text-sm outline-none border-gray-200 bg-gray-100 w-full" name="city" onChange={(e) => handleInputChange(e)}>
                                <option hidden>Select City</option>
                                {
                                    cities.map((city, index) => <option value={city.name} key={index} selected={city.name === formData.city}>{city.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className='space-y-3 my-4'>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 capitalize">Firm Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100" placeholder="Company name" name="firm_name" onChange={e => handleInputChange(e)} value={formData.firm_name} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100 uppercase" placeholder="789456123456" name="gst_no" onChange={e => handleInputChange(e)} value={formData.gst_no} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none border-gray-200 bg-gray-100 uppercase" placeholder="DSKPA123456" name="pan_no" onChange={e => handleInputChange(e)} value={formData.pan_no} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <button type="submit" className='lg:w-auto md:w-auto w-full flex items-center justify-center bg-blueClr text-white p-2 px-5 rounded-lg font-semibold text-sm' disabled={loading} onClick={handleSubmit}>
                            {loading
                                ? <l-mirage size="86" speed="4" color="white"></l-mirage>
                                : "SAVE & UPDATE"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditProfile
