import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

function MoneyBlockerFinder() {
    const { defaultersList } = useAuth();
    const [searchValues, setSearchValues] = useState({
        username: "",
        pan: "",
        aadhar: "",
        mobile: "",
        gst: "",
    });
    const [filteredList, setFilteredList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const inputs = Object.values(searchValues).filter(Boolean);

        const filtered = defaultersList.filter((item) =>
            inputs.some((input) =>
                Object.values(item)
                    .join(" ")
                    .toLowerCase()
                    .includes(input.toLowerCase())
            )
        );

        setFilteredList(filtered);
    };

    return (
        <>
            <main>
                <div className="customContainer bg-white p-3 lg:p-5 md:p-4 rounded-lg mx-auto shadow-sm">
                    <h1 className="text-lg font-semibold col-span-2 border-neutral-200 pb-2">Search for Money Blockers (Defaulters)</h1>
                    <form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="John Doe" name="username" value={searchValues.username} onChange={handleChange} />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">PAN Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="DSKPA123456" name="pan" value={searchValues.pan} onChange={handleChange} />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Aadhar Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="12345678905454" name="aadhar" value={searchValues.aadhar} onChange={handleChange} />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Mobile</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="9876543210" name="mobile" value={searchValues.mobile} onChange={handleChange} />
                        </div>
                        <div className="w-full flex flex-col gap-1 lg:col-span-1 md:col-span-1 col-span-2">
                            <label className="font-semibold text-xs text-gray-500">GST No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="22AAAAA0000A1Z5" name="gst" value={searchValues.gst} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="h-full w-full border-2 border-blueClr text-blueClr font-bold py-2 px-4 rounded-md hover:bg-blueClr hover:text-white duration-200"><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                        </div>
                    </form>
                </div>
                <div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm my-5">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {filteredList.length > 0 ? (
                            filteredList.map((item, index) => (
                                <Link to={`/overview/defaulter/${item._id}`} className="bg-gradient-to-br hover:bg-gradient-to-bl from-white to-blue-50 inline-block border rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-xl duration-200" key={index}>
                                    <div className="flex justify-between items-center border-b pb-1">
                                        <div>
                                            <p className="text-xl font-semibold">{item.defaulter_name}</p>
                                            <p className="text-xs font-semibold text-gray-500">{item.firm_name}</p>
                                        </div>
                                        <div>
                                            <img src="/img/fraud.png" className="h-16 w-16" alt="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 py-3 mb-2 border-b" >
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-blueClr font-semibold border rounded-full p-1 py-2">GST</p>
                                            <p className="font-medium text-sm text-gray-700 capitalize">{item.gst_no}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-phone text-blueClr border p-2 rounded-full"></i>
                                            <p className="font-medium text-sm text-gray-700">+91 {item.mobile_No}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-blueClr font-semibold border rounded-full px-[9px] py-[6px]">-₹</p>
                                            <p className="font-medium text-sm text-gray-700">₹ {item.pending_amount}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-700">
                                            <span className="font-medium">Posted by: </span>
                                            <span className="capitalize">{item.added_by} </span>
                                            <span>on {new Date(item.added_on).toLocaleDateString('en-IN')}</span>
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 h-[220px] flex flex-col gap-2 items-center justify-center">
                                <img src="/img/no-data.png" className="w-16" alt="" />
                                <p className="text-sm font-medium">No matching results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default MoneyBlockerFinder
