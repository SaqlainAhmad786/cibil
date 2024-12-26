import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { useState } from "react";
import Loader from "./Loader/Loader";

function Home() {
    const { userData, defaultersList, defaultersLoading } = useAuth()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = defaultersList.slice().reverse().slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(defaultersList.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        }
    };

    return (
        <>
            <main>
                {defaultersLoading && <Loader />}
                <section className="my-4">
                    <div className="customContainer bg-gradient-to-r from-blueClr to-transparent text-white p-5 rounded-lg mx-auto">
                        <h2 className="text-2xl font-bold">Welcome,</h2>
                        <p>{userData?.user_name}</p>
                    </div>
                </section>
                <section className="my-4">
                    {/* <div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 col-span-2 border-b border-neutral-200 pb-3">Defaulter data</h3>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p><span className="font-medium text-neutral-500 me-2">Name: </span>John Doe</p>
                                    <p><span className="font-medium text-neutral-500 me-2">Mobile: </span>+91 9876543210</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-medium text-neutral-500 me-2">Firm Name: </span>Company name</p>
                                    <p><span className="font-medium text-neutral-500 me-2">GST: </span>9876543216560</p>
                                    <p><span className="font-medium text-neutral-500 me-2">PAN No.: </span>DSKPA123456</p>
                                    <p><span className="font-medium text-neutral-500 me-2">Aadhar No.: </span>**** **** 1234</p>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <a href="#" target="_blank" className="border text-center shadow-sm rounded-lg py-3 font-medium text-[14px] hover:bg-gray-300 duration-200">Show Bank Statement</a>
                                    <a href="#" target="_blank" className="border text-center shadow-sm rounded-lg py-3 font-medium text-[14px] hover:bg-gray-300 duration-200">Show Aadhar Card</a>
                                    <a href="#" target="_blank" className="border text-center shadow-sm rounded-lg py-3 font-medium text-[14px] hover:bg-gray-300 duration-200">Show PAN Card</a>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Widget >
                                    <Graph percentage={56} options={'Vyapar Score'} />
                                </Widget>
                            </div>
                        </div>
                    </div> */}
                    <div className="customContainer bg-white lg:p-5 md:p-5 p-3 rounded-lg mx-auto shadow-sm">
                        <p className="text-lg font-semibold mb-3 col-span-2">Recently added Defaulters</p>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                            {currentItems.map((item) => {
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
                                                <span className="capitalize">{item.firm_name} </span>
                                                <span>on {new Date(item.added_on).toLocaleDateString('en-IN')}</span>
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* <Link to={'#'} className="relative text-sm border rounded-lg shadow-md p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 hover:translate-x-2 duration-200">
                                <div className="space-y-1">
                                    <p><span className="font-medium text-neutral-400 me-2">Name: </span>John Doe</p>
                                    <p><span className="font-medium text-neutral-400 me-2">Mobile: </span>+91 9876543210</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-medium text-neutral-400 me-2">Company name: </span>Example</p>
                                    <p><span className="font-medium text-neutral-400 me-2">GST: </span>798797979799789</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-medium text-neutral-400 me-2">Pending Amt.: </span>Rs. 100</p>
                                    <p><span className="font-medium text-neutral-400 me-2">Posted on: </span>12/12/2022</p>
                                </div>
                                <span className="absolute top-[50%] translate-y-[-50%] right-3 text-gray-500"><i className="fa-solid fa-angles-right"></i> </span>
                            </Link> */}
                        </div>
                        <div className="mt-5 flex gap-2 justify-end items-center text-xs">
                            <span className="block font-medium">Page {currentPage} of {totalPages}</span>
                            <div className="space-x-1">
                                <button title="previous" type="button" onClick={handlePreviousPage}
                                    disabled={currentPage === 1} className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200 disabled:bg-gray-300">
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button title="next" type="button" onClick={handleNextPage}
                                    disabled={currentPage === totalPages} className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200 disabled:bg-gray-300">
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default Home