import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        mobile_no: '',
        firm_name: '',
        gst_no: '',
        pan_no: '',
    });

    useEffect(() => {
        setFormData({
            user_name: userData.user_name,
            mobile_no: userData.mobile_no,
            firm_name: userData.firm_name,
            gst_no: userData.gst_no,
            pan_no: userData.pan_no,
        });
        console.log(userData)
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <section className="my-4">
                <form className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
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
                        <button className='bg-blueClr text-white p-2 px-5 rounded-lg font-semibold text-sm'>SUBMIT</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditProfile
