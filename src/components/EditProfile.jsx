import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Loader from "./Loader/Loader";

function EditProfile() {
    const { userData, refreshUserData, userLoading } = useAuth();
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        mobile_no: '',
        firm_name: '',
        gst_no: '',
        pan_no: '',
    });
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            user_name: userData.user_name,
            mobile_no: userData.mobile_no,
            firm_name: userData.firm_name,
            gst_no: userData.gst_no,
            pan_no: userData.pan_no,
        });
        setInitialValues({
            user_name: userData.user_name,
            mobile_no: userData.mobile_no,
            firm_name: userData.firm_name,
            gst_no: userData.gst_no,
            pan_no: userData.pan_no,
        });
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

    return (
        <>
            <section className="my-4">
                <Toaster position="top-right" />
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
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="John Doe" name="user_name" onChange={e => handleInputChange(e)} value={formData.user_name} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                            <input type="number" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="9876543210" name="mobile_no" onChange={e => handleInputChange(e)} value={formData.mobile_no} />
                        </div>
                    </div>
                    <hr />
                    <div className='space-y-3 my-4'>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="Company name" name="firm_name" onChange={e => handleInputChange(e)} value={formData.firm_name} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="789456123456" name="gst_no" onChange={e => handleInputChange(e)} value={formData.gst_no} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="DSKPA123456" name="pan_no" onChange={e => handleInputChange(e)} value={formData.pan_no} />
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
