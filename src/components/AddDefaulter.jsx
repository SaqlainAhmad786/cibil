import axios from "axios";

 function AddDefaulter() {

       let handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form Data:', formData); // Log the form data

    try {
        const response = await axios.post('http://localhost:8000/addDefaulter', formData);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }


    }

    return (
        <>
            <section className="customContainer bg-white p-5 rounded-lg mb-5 shadow-sm">
                <div className="rounded-xl">
                    <img src="/img/fraud.png" alt="" className="w-24" />
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                        Report a Defaulter
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 mt-5" >
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Name</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="John Doe" name="userName" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Mobile</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="9876543210" name="mobileNo" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">PAN Card No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="pan_card" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Aadhar Card No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="addharcard" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Address</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="address" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">City</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="cityName" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">State</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="stateName" />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Firm Name</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="Company" name="firmName" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">GST No.</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="" name="gstNo" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Pending Amount</label>
                                    <input className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="₹" name="pendingAmount" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-500 ">Remark</label>
                                    <textarea rows={5} className="border rounded-lg px-3 py-2 mb-4 text-black text-sm w-full outline-none dark:border-gray-300 dark:bg-gray-100" placeholder="Message" name="remark" />
                                </div>
                                <div className="mb-5">
                                    <p className="font-semibold text-xs text-gray-500 mb-2">Upload Documents</p>
                                    <div className="space-y-3">
                                        <label className="container-btn-file text-sm flex-grow">
                                            <img src="/img/bank-statement.png" className="w-6 mr-1" alt="" />
                                            Upload Bank Statement
                                            <input className="file" name="bankStatement" type="file" />
                                        </label>
                                        <label className="container-btn-file text-sm aadharBtn flex-grow">
                                            <img src="/img/aadharCard.png" className="w-6 mr-1" alt="" />
                                            Upload Notice or other documents
                                            <input className="file" name="otherDocs" type="file" />
                                        </label>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue dark:hover:bg-primary-700 dark:focus:ring-primary-800">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddDefaulter
