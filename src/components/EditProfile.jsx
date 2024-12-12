import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

function EditProfile() {
    const { userData } = useAuth();
    const [formData, setFormData] = useState({});

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
            <section className="py-4">
                <form className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
                    <h2 className="text-2xl font-semibold border-b border-neutral-200 pb-3">Edit Profile</h2>
                    <div className='space-y-3 my-4'>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Full Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="John Doe" name="user_name" onChange={e => handleInputChange(e)} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                            <input type="number" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="9876543210" name="mobile_no" onChange={e => handleInputChange(e)} />
                        </div>
                    </div>
                    <hr />
                    <div className='space-y-3 my-4'>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="Company name" name="firm_name" onChange={e => handleInputChange(e)} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                            <input type="number" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="789456123456" name="gst_no" onChange={e => handleInputChange(e)} />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="DSKPA123456" name="pan_no" onChange={e => handleInputChange(e)} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <button className='bg-blue text-white p-2 px-5 rounded-lg font-semibold text-sm'>SUBMIT</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditProfile
