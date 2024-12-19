import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

function Home() {
    const { userData, defaultersList } = useAuth()

    return (
        <>
            <main>
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
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                            {defaultersList.map((item, index) => {
                                // console.log(item)
                                if (index == 0) return (
                                    <>
                                        <p>No Defaulters data</p>
                                    </>
                                )
                                return (
                                    <>
                                        <Link className="bg-gradient-to-br hover:bg-gradient-to-bl from-white to-blue-50 inline-block border rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-xl duration-200">
                                            <div className="flex justify-between items-center border-b pb-1">
                                                <div>
                                                    <p className="text-xl font-semibold">{item.defaulter_name}</p>
                                                    <p className="text-xs font-semibold text-gray-500">{item.firm_name}</p>
                                                </div>
                                                <div>
                                                    <img src="/img/fraud.png" className="h-16 w-16" alt="" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 py-2 mb-3 border-b" >
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-blueClr font-semibold border rounded-full p-1 py-2">GST</p>
                                                    <p className="font-medium text-sm text-gray-700">{item.gst_no}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-phone text-blueClr border p-2 rounded-full"></i>
                                                    <p className="font-medium text-sm text-gray-700">+91 {item.mobile_No}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm    text-blueClr font-semibold border rounded-full px-[9px] py-[6px]">-₹</p>
                                                    <p className="font-medium text-sm text-gray-700">₹ 1,00,000</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-700 text-center mb-2">Posted by: John Doe on 01/01/2023</p>
                                                <button className="block text-center w-full rounded-md py-2 font-semibold text-sm text-blueClr border border-blueClr hover:bg-blueClr hover:text-white duration-200">View Details <i className="fa-solid fa-arrow-right"></i></button>
                                            </div>
                                        </Link>
                                    </>
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
                            <span className="block font-medium">Page 1 of 1</span>
                            <div className="space-x-1">
                                <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200">
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-blueClr hover:text-white duration-200">
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