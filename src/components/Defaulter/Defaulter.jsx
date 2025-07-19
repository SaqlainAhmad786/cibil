import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../contexts/authContext"
import useDefaulterById from "../../hooks/useDefaulterById"
import Loader from "../Loader/Loader"
import Widget from "../Widget/Widget/"
import { Graph } from "../Widget/Widget/"
import { ChevronDown, Download, MoveUpRight, X } from "lucide-react"

function Defaulter() {
    const { id } = useParams()
    const { defaultersList } = useAuth()
    const [filteredDefaulter, setFilteredDefaulter] = useState([])
    const { loading, defaulter } = useDefaulterById(id)
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        const defaulterData = defaultersList.filter((el) => el.gst_no == defaulter?.gst_no || el.pan_no == defaulter?.pan_no)
        const otherList = defaulterData.filter((el) => el.gst_no != defaulter?.gst_no || el.pan_no != defaulter?.pan_no)
        setFilteredDefaulter(otherList)
    }, [defaulter, defaultersList])

    const componentRef = useRef()
    const navigate = useNavigate()

    const maskedAadhar = String(defaulter?.aadhar_no).replace(/^(\d{8})(\d{4})$/, "********$2")
    const maskedPan = String(defaulter?.pan_no)?.slice(-4).padStart(String(defaulter?.pan_no).length, "*")

    let color
    let scoreText

    if (defaulter?.cibil_score?.cibil_score >= 75) {
        color = "#00FF00"
        scoreText = "Average Risk"
    } else if (defaulter?.cibil_score?.cibil_score >= 50) {
        color = "#FF9900"
        scoreText = "High risk"
    } else {
        color = "#FF0000"
        scoreText = "Scammer"
    }

    function printPage() {
        navigate("/print", { state: { defaulter, filteredDefaulter } })
    }

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <main>
                <div className="customContainer mb-5 bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full transition-all duration-300 animate-fade-in">
                    <div className="flex gap-4 flex-col md:flex-row bg-white lg:p-6 md:p-4 p-3" ref={componentRef}>
                        <div className="max-w-[400px] flex flex-col gap-4">
                            <Widget>
                                <Graph percentage={defaulter?.cibil_score?.cibil_score} options={scoreText} color={color} />
                            </Widget>
                            <div className="lg:block md:block hidden">
                                <div className="text-lg font-semibold">Remark:</div>
                                <p>{defaulter?.remark || "No remark"}</p>
                            </div>
                        </div>
                        <div className="flex-grow md:pl-8">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h1 className="text-xl font-semibold text-blueClr uppercase">About Defaulter</h1>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-xs">
                                            Listed as a defaulter on {new Date(defaulter?.createdAt).toLocaleDateString("en-IN")} by{" "}
                                            <strong className="uppercase">{defaulter?.added_by?.firm_name}</strong>
                                        </p>
                                    </div>
                                </div>

                                <button onClick={printPage} className="flex items-center gap-1 text-xs border px-3 py-2 rounded-full hover:bg-gray-200 duration-200">
                                    <Download size={18} />
                                    <span className="font-semibold lg:block md:block sm:block hidden">Report</span>
                                </button>
                            </div>
                            <div className="space-y-1 mb-5">
                                <div className="flex gap-8">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">Due amount:</span>
                                        <span className={`font-bold text-lg ${defaulter?.is_cleared ? "text-green-600" : "text-red-600"}`}>
                                            <span>₹ {defaulter?.pending_amount}/-</span>
                                            <span className="ml-2">
                                                {defaulter?.is_cleared && <span className="text-white font-semibold text-sm bg-green-600 px-2 py-1 rounded-lg">cleared</span>}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">Pending from:</span>
                                        <span className="font-semibold">
                                            <span> {defaulter?.pending_from ? new Date(defaulter?.pending_from).toLocaleDateString("en-IN") : "-"}</span>
                                            <span className="ml-2">
                                                {defaulter?.is_cleared && <span className="text-white font-semibold text-sm bg-green-600 px-2 py-1 rounded-lg">cleared</span>}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-400">Name:</span>
                                    <span className="capitalize">{defaulter?.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-400">Address:</span>
                                    <span className="capitalize">
                                        {defaulter?.address?.address}, {defaulter?.address?.city}, {defaulter?.address?.state}, {defaulter?.address?.country}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1 mb-3">
                                <div className="space-y-1 flex gap-x-8 items-center">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">Firm name:</span>
                                        <span className="uppercase">{defaulter?.firm_name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">GST no.:</span>
                                        <span className="uppercase">{defaulter?.gst_no}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 flex gap-x-8 items-center">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">Aadhar Card no.:</span>
                                        <span className="uppercase">{maskedAadhar}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-gray-400">PAN Card no.:</span>
                                        <span className="uppercase">{maskedPan}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-400">Mobile:</span>
                                    <span>+91 {defaulter?.mobile_no}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-400">Sector:</span>
                                    <span>{defaulter?.sector ? defaulter?.sector : "-"}</span>
                                </div>
                            </div>
                            <div className="join rounded-none mb-3 flex lg:justify-start md:justify-start sm:justify-start justify-center">
                                {defaulter?.bank_statement?.endsWith(".pdf") ? (
                                    <Link
                                        className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item"
                                        to={`/view-resume?resume=${defaulter?.bank_statement}`}
                                        target="_blank"
                                    >
                                        View Ledger Statement
                                    </Link>
                                ) : (
                                    <>
                                        <label htmlFor="ledgerModal" className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item">
                                            View Ledger Statement
                                        </label>
                                        <input type="checkbox" id="ledgerModal" className="modal-toggle" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-bold">Ledger Statement</h3>
                                                    <div className="modal-action m-0">
                                                        <label htmlFor="ledgerModal" className="btn btn-ghost p-0">
                                                            <X className="w-5 h-5" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={defaulter?.bank_statement} className="w-full object-contain" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {defaulter?.other_document?.endsWith(".pdf") ? (
                                    <Link
                                        className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item"
                                        to={`/view-resume?resume=${defaulter?.other_document}`}
                                        target="_blank"
                                    >
                                        View Other Documents
                                    </Link>
                                ) : (
                                    <>
                                        <label
                                            htmlFor="otherModal"
                                            className="bg-gray-100 border-gray-300 btn btn-outline btn-sm lg:text-xs md:text-xs text-[10px] join-item"
                                            disabled={defaulter?.other_document == "upload/undefined"}
                                        >
                                            View Other Documents
                                        </label>
                                        <input type="checkbox" id="otherModal" className="modal-toggle" />
                                        <div className="modal" role="dialog">
                                            <div className="modal-box">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-bold">Other Documents</h3>
                                                    <div className="modal-action m-0">
                                                        <label htmlFor="otherModal" className="btn btn-ghost p-0">
                                                            <X className="w-5 h-5" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={defaulter?.other_document} className="w-full object-contain" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="lg:hidden md:hidden block border-b-2 pb-2">
                                <div className="text-lg font-semibold">Remark:</div>
                                <p>{defaulter.remark}</p>
                            </div>
                            {filteredDefaulter.length > 0 && (
                                <div className="my-3">
                                    <p className="text-sm mb-2">Other firms also listed as defaulter:</p>
                                    <div className="grid gap-1">
                                        {filteredDefaulter.map((data, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="p-3 border border-blue-500 rounded-lg cursor-pointer mb-2" onClick={() => toggleOpen(index)}>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-medium uppercase text-sm">{data.added_by.firm_name}</p>
                                                            <ChevronDown
                                                                className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`overflow-hidden transition-all duration-300 ${
                                                                openIndex === index ? "h-auto opacity-100 mt-2" : "h-0 opacity-0"
                                                            }`}
                                                        >
                                                            <div>
                                                                <div>
                                                                    Added By: <span className="font-semibold capitalize">{data.added_by.user_name}</span>
                                                                </div>
                                                                <div>
                                                                    {data?.is_cleared ? "Dues cleared:" : "Amount Due:"}{" "}
                                                                    <span className="font-semibold capitalize">₹ {data.pending_amount}</span>
                                                                </div>
                                                                <div>
                                                                    Listed On: <span className="font-semibold ">{new Date(data.createdAt).toLocaleDateString("en-IN")}</span>
                                                                </div>
                                                                <div className="text-[0.8em] flex justify-end">
                                                                    <Link to={`/overview/defaulter/${data._id}`} className="text-blueClr hover:underline flex items-center">
                                                                        <span>Show Details</span>
                                                                        <MoveUpRight className="w-4 h-4" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Defaulter
