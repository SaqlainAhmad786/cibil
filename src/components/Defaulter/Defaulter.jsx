import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Widget from "../Widget/Widget/";
import { Graph } from "../Widget/Widget/";

function Defaulter() {
    const { defaultersList } = useAuth();
    const { id } = useParams();
    const defaulterData = defaultersList.find(defaulter => defaulter._id === id)

    const maskedAadhar = String(defaulterData?.aadhar_card).replace(/^(\d{8})(\d{4})$/, '********$2');
    const maskedPan = String(defaulterData?.pan_card_no)?.slice(-4).padStart(String(defaulterData?.pan_card_no).length, '*');

    return (
        <>
            <main>
                <div className="customContainer mb-5 bg-white rounded-xl shadow-2xl max-w-4xl w-full lg:p-6 md:p-4 p-3 transition-all duration-300 animate-fade-in">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <Widget >
                                <Graph percentage={56} options={'Vyapar Score'} />
                            </Widget>
                        </div>
                        <div className="md:w-2/3 md:pl-8">
                            <h1 className="text-xl font-semibold text-blueClr mb-3 uppercase">About Defaulter</h1>
                            <div className="space-y-1 mb-5">
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Dues:</span>
                                    <span className="font-semibold text-lg">₹ {defaulterData?.pending_amount}/-</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Name:</span>
                                    <span>{defaulterData?.defaulter_name}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Address:</span>
                                    <span>{defaulterData?.address}, {defaulterData?.city}, {defaulterData?.state}, {defaulterData?.country}</span>
                                </div>
                                <div className='space-y-1 flex gap-x-8 items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>GST no.:</span>
                                        <span className="uppercase">{defaulterData?.gst_no}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>Aadhar Card no.:</span>
                                        <span className="uppercase">{maskedAadhar}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1 mb-3">
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Firm name:</span>
                                    <span>{defaulterData?.firm_name}</span>
                                </div>
                                <div className='space-y-1 flex gap-x-8 items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>GST no.:</span>
                                        <span className="uppercase">{defaulterData?.gst_no}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>PAN Card no.:</span>
                                        <span className="uppercase">{maskedPan}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Mobile:</span>
                                    <span>+91 {defaulterData?.mobile_No}</span>
                                </div>
                            </div>
                            <div className="join mb-3 flex lg:justify-start md:justify-start sm:justify-start justify-center">
                                <a href="#" className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item">View Bank Statement</a>
                                <a href="#" className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item" disabled={!defaulterData?.otherDocument}>View Other Documents</a>
                            </div>
                            <div className="collapse collapse-arrow border-gray-300 border rounded-lg mb-2">
                                <input type="radio" name="my-accordion-4" className="h-[20px]" />
                                <div className="collapse-title font-medium ">Remark by adder</div>
                                <div className="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p className='text-xs'>Added on <span className="font-semibold">{new Date(defaulterData?.added_on).toLocaleDateString('en-IN')}</span> by:</p>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{defaulterData?.added_by}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="customContainer mb-5 bg-white rounded-xl shadow-2xl max-w-4xl w-full lg:p-6 md:p-4 p-3 transition-all duration-300 animate-fade-in">
                    <p className="text-lg font-semibold col-span-2 mb-3">Recently added Defaulters</p>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        {defaultersList.slice().reverse().slice(0, 3).map((item) => {
                            return (
                                <Link to={`/overview/defaulter/${item._id}`} className="bg-gradient-to-br hover:bg-gradient-to-bl from-white to-blue-50 inline-block border rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-xl duration-200" key={item._id}>
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
                                            <p className="font-medium text-sm text-gray-700 uppercase">{item.gst_no}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-phone text-blueClr border p-2 rounded-full"></i>
                                            <p className="font-medium text-sm text-gray-700">+91 {item.mobile_No}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-blueClr font-semibold border rounded-full px-[9px] py-[6px]">-₹</p>
                                            <p className="font-medium text-sm text-gray-700">₹ {new Intl.NumberFormat('en-IN').format(item.pending_amount)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-700">
                                            <span className="font-medium">Posted by: </span>
                                            <span className="capitalize">{item.firm_name} </span>
                                            <span>on {new Date(item.added_on).toLocaleDateString('en-IN')}</span>
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Defaulter
