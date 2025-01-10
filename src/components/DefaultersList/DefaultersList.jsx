import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/authContext"

function DefaultersList() {
    const { userDefaultersList } = useAuth()

    return (
        <>
            <section>
                <div className="customContainer bg-white p-5 rounded-lg mx-auto my-5 shadow-sm">
                    <h3 className="text-lg font-semibold col-span-2 border-neutral-200 mb-3">Defaulters added by you:</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {userDefaultersList.length === 0
                            ? <p className="text-sm text-neutral-400 flex justify-center items-center my-5 h-[500px]">No defaulters added by you!</p>
                            : userDefaultersList.map((item, index) => {
                                return (
                                    <div key={index} className="border rounded-lg shadow-md lg:p-4 p-3 flex lg:flex-row md:flex-col flex-col lg:justify-between justify-start lg:*:items-center">
                                        <Link to={`/overview/defaulter/${item._id}`} className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-0 lg:place-items-center'>
                                            <div>
                                                <p><span className="font-medium text-neutral-400 me-2">Name: </span>{item.defaulter_name}</p>
                                                <p><span className="font-medium text-neutral-400 me-2">Mobile: </span>+91 {item.mobile_No}</p>
                                            </div>
                                            <div>
                                                <p><span className="font-medium text-neutral-400 me-2">Company name: </span>{item.firm_name}</p>
                                                <p><span className="font-medium text-neutral-400 me-2">GST: </span>{item.gst_no}</p>
                                            </div>
                                        </Link>
                                        <div className=' lg:col-span-1 md:col-span-2 mt-2'>
                                            <button className="btn w-full" onClick={() => document.getElementById('my_modal_1').showModal()}>CLEARED!</button>
                                            <dialog id="my_modal_1" className="modal">
                                                <div className="modal-box p-4 roun">
                                                    <h3 className="font-bold text-lg">Are you sure?</h3>
                                                    <p className="py-4">You want to state this defaulter as cleared?</p>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn mr-1 bg-white">Cancel</button>
                                                            <button className="btn">Confirm</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default DefaultersList
