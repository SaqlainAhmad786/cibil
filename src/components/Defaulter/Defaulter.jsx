import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Widget from "../Widget/";
import { Graph } from "../Widget/";

function Defaulter() {
    const { defaultersList } = useAuth();
    const { id } = useParams();
    const defaulterData = defaultersList.find(defaulter => defaulter._id === id)

    return (
        <>
            <main>
                {/* <div className="customContainer bg-white lg:p-5 md:p-5 p-3 rounded-lg mx-auto shadow-sm h-[500px]">
                    <div className="flex">
                        <Widget >
                            <Graph percentage={56} options={'Vyapar Score'} />
                        </Widget>
                    </div>
                </div> */}
                <div className="customContainer bg-white rounded-xl shadow-2xl max-w-4xl w-full lg:p-6 md:p-4 p-3 transition-all duration-300 animate-fade-in">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            {/* <img src="https://i.pravatar.cc/300" alt="Profile Picture" className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105" />
                            <h1 className="text-2xl font-bold text-indigo-800 mb-2">John Doe</h1>
                            <p className="text-gray-600">Software Developer</p>
                            <button className="mt-4 bg-indigo-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Edit Profile</button> */}
                            {/* <Widget >
                                <Graph percentage={56} options={'Vyapar Score'} />
                            </Widget> */}
                        </div>
                        <div className="md:w-2/3 md:pl-8">
                            <h1 className="text-xl font-semibold text-blueClr mb-3">About Defaulter</h1>
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
                                        <span className="uppercase">{defaulterData?.aadhar_card}</span>
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
                                        <span className="uppercase">{defaulterData?.pan_card_no}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-xs text-gray-400'>Mobile:</span>
                                    <span>+91 {defaulterData?.mobile_No}</span>
                                </div>
                            </div>
                            <div className="join mb-2">
                                <a href="#" className="btn btn-outline join-item">View Bank Statement</a>
                                <a href="#" className="btn btn-outline join-item">View Other Documents</a>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xs">Added by: <span className="font-semibold">{defaulterData?.added_by}</span> on {new Date(defaulterData?.added_on).toLocaleDateString('en-IN')}</p>
                            </div>
                            {/* <h2 className="text-xl font-semibold text-indigo-800 mb-4">Skills</h2>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">React</span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Python</span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">SQL</span>
                            </div>
                            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Contact Information</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 " viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    john.doe@example.com
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    +1 (555) 123-4567
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                    </svg>
                                    San Francisco, CA
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Defaulter
