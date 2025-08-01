import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Pencil } from "lucide-react";
import axios from "axios";
import SubscriptionGuard from "../SubscriptionGuard";
import { useRef } from "react";

function DefaultersList() {
    const { userDefaultersList, refreshDefaultersList } = useAuth();
    const tokenRef = useRef(localStorage.getItem("token"));

    async function handleClear(id) {
        try {
            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}/defaulter/clear-score/${id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${tokenRef.current}` },
                    }
                )
                .then((res) => {
                    refreshDefaultersList();
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <SubscriptionGuard>
                <section>
                    <div className="customContainer bg-white p-5 rounded-lg mx-auto my-5 shadow-sm">
                        <h3 className="text-lg font-semibold col-span-2 border-neutral-200 mb-3">Defaulters added by you:</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {userDefaultersList.length === 0 ? (
                                <p className="text-sm text-neutral-400 flex justify-center items-center my-5 h-[500px]">No defaulters added by you!</p>
                            ) : (
                                userDefaultersList.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border rounded-lg shadow-md lg:p-4 p-3 flex lg:flex-row md:flex-col flex-col lg:justify-between justify-start lg:*:items-center"
                                        >
                                            <Link
                                                to={`/overview/defaulter/${item._id}`}
                                                className="flex-1 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-0"
                                            >
                                                <div>
                                                    <p className="capitalize">
                                                        <span className="font-medium text-neutral-400 me-2">Name: </span>
                                                        {item.name}
                                                    </p>
                                                    <p>
                                                        <span className="font-medium text-neutral-400 me-2">Mobile: </span>
                                                        +91 {item.mobile_no}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="uppercase">
                                                        <span className="font-medium text-neutral-400 me-2">Company name: </span>
                                                        {item.firm_name}
                                                    </p>
                                                    <p className="uppercase">
                                                        <span className="font-medium text-neutral-400 me-2">GST: </span>
                                                        {item.gst_no}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="lg:col-span-1 md:col-span-2 mt-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Link
                                                        to={`/overview/editDefaulter/${item._id}`}
                                                        className="btn btn-outline w-full"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        EDIT
                                                    </Link>
                                                    <button
                                                        className="btn btn-outline btn-success w-full"
                                                        onClick={() => document.getElementById(`my_modal_${index}`).showModal()}
                                                        disabled={item.is_cleared}
                                                    >
                                                        {item.is_cleared ? 'CLEARED!' : 'CLEAR'}
                                                    </button>
                                                    <dialog
                                                        id={`my_modal_${index}`}
                                                        className="modal"
                                                    >
                                                        <div className="modal-box p-4 roun">
                                                            <h3 className="font-bold text-lg">Are you sure?</h3>
                                                            <p className="py-4">You want to state this defaulter as cleared?</p>
                                                            <div className="modal-action">
                                                                <form method="dialog">
                                                                    <button className="btn mr-1 bg-white">Cancel</button>
                                                                    <button
                                                                        className="btn"
                                                                        onClick={() => handleClear(item._id)}
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </section>
            </SubscriptionGuard>
        </>
    );
}

export default DefaultersList;
