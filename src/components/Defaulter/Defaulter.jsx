import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useRef } from "react";
import Widget from "../Widget/Widget/";
import { Graph } from "../Widget/Widget/";
import { Download, X } from "lucide-react";

function Defaulter() {
    const { defaultersList } = useAuth();
    const { id } = useParams();
    const defaulterData = defaultersList.find(defaulter => defaulter._id === id)
    console.log(defaulterData);
    const componentRef = useRef();
    const navigate = useNavigate();

    const maskedAadhar = String(defaulterData?.aadhar_no).replace(/^(\d{8})(\d{4})$/, '********$2');
    const maskedPan = String(defaulterData?.pan_no)?.slice(-4).padStart(String(defaulterData?.pan_no).length, '*');

    let color;
    let scoreText;

    if (defaulterData?.cibil_score?.cibil_score >= 75) {
        color = '#00FF00';
        scoreText = 'Average Risk';
    } else if (defaulterData?.cibil_score?.cibil_score >= 50) {
        color = '#FF9900';
        scoreText = 'High risk';
    } else {
        color = '#FF0000';
        scoreText = 'Scammer';
    }

    function printPage() {
        navigate('/print', { state: defaulterData });
    }

    return (
        <>
            <main>
                <div className="customContainer mb-5 bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full transition-all duration-300 animate-fade-in">
                    <div className="flex gap-4 flex-col md:flex-row bg-white lg:p-6 md:p-4 p-3" ref={componentRef}>
                        <div className="md:w-1/3">
                            <Widget>
                                <Graph percentage={defaulterData?.cibil_score?.cibil_score} options={scoreText} color={color} />
                            </Widget>
                        </div>
                        <div className="md:w-2/3 md:pl-8">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h1 className="text-xl font-semibold text-blueClr uppercase">About Defaulter</h1>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className='text-xs'>Listed as a defaulter on {new Date(defaulterData?.createdAt).toLocaleDateString('en-IN')} by <strong className="uppercase">{defaulterData?.added_by?.firm_name}</strong></p>
                                    </div>
                                </div>

                                <button onClick={printPage} className="flex items-center gap-1 text-xs border px-3 py-2 rounded-full hover:bg-gray-200 duration-200">
                                    <Download size={18} />
                                    <span className="font-semibold lg:block md:block sm:block hidden">Report</span>
                                </button>
                            </div>
                            <div className="space-y-1 mb-5">
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Due amount:</span>
                                    <span className="font-bold text-lg text-red-600">₹ {defaulterData?.pending_amount}/-</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Name:</span>
                                    <span className="capitalize">{defaulterData?.name}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Address:</span>
                                    <span className="capitalize">{defaulterData?.address?.address}, {defaulterData?.address?.city}, {defaulterData?.address?.state}, {defaulterData?.address?.country}</span>
                                </div>
                            </div>
                            <div className="space-y-1 mb-3">
                                <div className='space-y-1 flex gap-x-8 items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>Firm name:</span>
                                        <span className="uppercase">{defaulterData?.firm_name}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>GST no.:</span>
                                        <span className="uppercase">{defaulterData?.gst_no}</span>
                                    </div>
                                </div>
                                <div className='space-y-1 flex gap-x-8 items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>Aadhar Card no.:</span>
                                        <span className="uppercase">{maskedAadhar}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-xs text-gray-400'>PAN Card no.:</span>
                                        <span className="uppercase">{maskedPan}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Mobile:</span>
                                    <span>+91 {defaulterData?.mobile_no}</span>
                                </div>
                            </div>
                            <div className="join rounded-none mb-3 flex lg:justify-start md:justify-start sm:justify-start justify-center">
                                <label htmlFor="ledgerModal" className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item">View Ledger Statement</label>
                                <input type="checkbox" id="ledgerModal" className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold">Ledger Statement</h3>
                                            <div className="modal-action m-0">
                                                <label htmlFor="ledgerModal" className="btn btn-ghost p-0"><X className="w-5 h-5" /></label>
                                            </div>
                                        </div>
                                        <div>
                                            <img src={defaulterData?.bank_statement} className="w-full object-contain" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="otherModal" className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item" disabled={defaulterData?.otherDocument == "upload/undefined"}>View Other Documents</label>
                                <input type="checkbox" id="otherModal" className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold">Ledger Statement</h3>
                                            <div className="modal-action m-0">
                                                <label htmlFor="otherModal" className="btn btn-ghost p-0"><X className="w-5 h-5" /></label>
                                            </div>
                                        </div>
                                        <div>
                                            <img src={defaulterData?.other_document} className="w-full object-contain" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow border-gray-300 border rounded-lg mb-2">
                                <input type="radio" name="my-accordion-4" className="h-[20px]" />
                                <div className="collapse-title font-medium ">Remark by adder</div>
                                <div className="collapse-content">
                                    <p>{defaulterData?.remark}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-sm mb-1'>Other companies aslo listed as defaulter:</p>
                                <div className="grid grid-cols-2 gap-1">
                                    {defaulterData?.claimers?.map((item, index) => {
                                        return (
                                            <div key={index} className="collapse collapse-arrow border-gray-300 border rounded-lg mb-2">
                                                <input type="radio" name="my-accordion-4" className="h-[20px]" />
                                                <div className="collapse-title font-medium uppercase">{item.firm_name}</div>
                                                <div className="collapse-content">
                                                    <p>{defaulterData?.remark}</p>
                                                    <Link to={`/overview/defaulter/${item._id}`} className="btn btn-outline btn-sm">Visit data</Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Defaulter
