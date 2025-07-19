import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import Widget from "../components/Widget/Widget/"
import { Graph } from "../components/Widget/Widget/"
import { toJpeg, toPng, toSvg } from "html-to-image"

function PrintDetails() {
    const data = useLocation().state.defaulter
    const otherData = useLocation().state.filteredDefaulter

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const maskedAadhar = String(data?.aadhar_no).replace(/^(\d{8})(\d{4})$/, "********$2")
    const maskedPan = String(data?.pan_no)?.slice(-4).padStart(String(data?.pan_no).length, "*")

    let color
    let scoreText

    if (data?.cibil_score?.cibil_score >= 75) {
        color = "#00FF00"
        scoreText = "Average Risk"
    } else if (data?.cibil_score?.cibil_score >= 50) {
        color = "#FF9900"
        scoreText = "High risk"
    } else {
        color = "#FF0000"
        scoreText = "Scammer"
    }

    const componentRef = useRef()

    const downloadImage = async (format) => {
        if (!componentRef.current) return

        try {
            let dataUrl
            const options = { quality: 0.95, pixelRatio: 3 } // Increase pixel ratio for better quality

            if (format === "png") {
                dataUrl = await toPng(componentRef.current, options)
            } else if (format === "jpeg") {
                dataUrl = await toJpeg(componentRef.current, options)
            } else if (format === "svg") {
                dataUrl = await toSvg(componentRef.current)
            }

            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `${data?.firm_name}_report_(www.vyaparscore.com).${format}`
            link.click()
        } catch (err) {
            console.error("Could not generate image:", err)
        }
    }

    return (
        <>
            <main>
                <div className="bg-white p-8 w-[800px] min-w-[800px]" ref={componentRef}>
                    <div className="flex justify-between items-end border-b-2 pb-4 mb-6">
                        <div className="flex items-center gap-2">
                            <img src="/img/logo-vector.svg" alt="Logo" className="h-12" />
                            <p className="text-2xl font-bold text-center">Vyapar Score</p>
                        </div>
                        <p className="text-sm text-gray-500">www.vyaparscore.com</p>
                    </div>
                    <div className="mb-6">
                        <p className="text-lg font-semibold">Current Application Information</p>
                        <p className="text-xs italic font-light mb-3">
                            <span className="text-red-500">*</span>These are the details of an individual you provide when reporting him/her as a defaulter.
                        </p>
                        <table className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Name:</td>
                                    <td className="px-3 py-2 border border-gray-300 capitalize">{data?.name}</td>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Mobile:</td>
                                    <td className="px-3 py-2 border border-gray-300">{data?.mobile_no}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">PAN:</td>
                                    <td className="px-3 py-2 border border-gray-300 uppercase">{maskedPan}</td>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Aadhar card:</td>
                                    <td className="px-3 py-2 border border-gray-300">{maskedAadhar}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">GST:</td>
                                    <td className="px-3 py-2 border border-gray-300 uppercase">{data?.gst_no}</td>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Firm Name:</td>
                                    <td className="px-3 py-2 border border-gray-300 uppercase">{data?.firm_name}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Pending from:</td>
                                    <td className="px-3 py-2 border border-gray-300 capitalize" colSpan="3">
                                        {data?.pending_from ? new Date(data?.pending_from).toLocaleDateString("en-IN") : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Sector:</td>
                                    <td className="px-3 py-2 border border-gray-300 capitalize" colSpan="3">
                                        {data?.sector ? data?.sector : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 border border-gray-300 font-medium">Address:</td>
                                    <td className="px-3 py-2 border border-gray-300 capitalize" colSpan="3">
                                        {data?.address?.address}, {data?.address?.city}, {data?.address?.state}, {data?.address?.pincode}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <p className="text-lg font-semibold">Vyapar Credit Score</p>
                            <p className="text-xs italic font-light mb-3">
                                <span className="text-red-500">*</span>Your Vyapar Credit Report is summarized as a Vyapar Credit Score, which ranges from 1 to 100.
                            </p>
                            <Widget>
                                <Graph percentage={data?.cibil_score?.cibil_score} options={scoreText} color={color} />
                            </Widget>
                            <div className="w-full mt-2">
                                <p className="text-sm font-medium">Vyapar score categorization:</p>
                                <div className="mt-1">
                                    <p className="text-[10px]">
                                        - Scored between 75-100 <span className="text-green-600 font-semibold">Average Risk</span>.
                                    </p>
                                    <p className="text-[10px]">
                                        - Scored between 50-75 <span className="text-yellow-600 font-semibold">High Risk</span>.
                                    </p>
                                    <p className="text-[10px]">
                                        - Scored below 50 <span className="text-red-600 font-semibold">Scammer</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg font-semibold">Summary: CREDIT ACCOUNT INFORMATION</p>
                            <p className="text-xs italic font-light mb-3">
                                <span className="text-red-500">*</span>This section displays a summary of all your reported credit accounts found in the Vyapar Score Credit Bureau
                                database.
                            </p>
                            <table className="w-full border-collapse border border-gray-300 mb-3">
                                <tbody>
                                    <tr>
                                        <td className="px-3 py-2 border text-sm border-gray-300 font-medium">Lender Firm Name:</td>
                                        <td className="px-3 py-2 border border-gray-300 capitalize" colSpan={5}>
                                            {data?.added_by?.firm_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 border border-gray-300 font-medium">{data?.is_cleared ? "Dues cleared:" : "Amount Due:"}</td>
                                        <td
                                            className={`px-3 py-2 border border-gray-300 capitalize font-semibold ${data?.is_cleared ? "text-green-600" : "text-red-600"}`}
                                            colSpan={3}
                                        >
                                            {data?.pending_amount}/-
                                        </td>
                                        <td className="px-3 py-2 border border-gray-300 font-medium">Due Date:</td>
                                        <td className="px-3 py-2 border border-gray-300">{new Date(data?.createdAt).toLocaleDateString("en-IN")}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {data?.remark && (
                                <div>
                                    <div className="text-lg font-semibold">Remark:</div>
                                    <p className="">{data.remark}</p>
                                </div>
                            )}
                            {otherData.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="text-sm border border-gray-300 p-4 rounded-lg shadow mb-3">
                                            <div className="mb-1">
                                                <span className="font-medium">Lender Firm Name:</span>
                                                <span className="capitalize ml-2">{item?.added_by?.firm_name}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="font-medium">Firm Owner Name:</span>
                                                <span className="capitalize ml-2">{item?.name}</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <div>
                                                    <span className="font-medium">GST No.:</span>
                                                    <span className="capitalize ml-2">{item?.gst_no}</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium">PAN No.:</span>
                                                    <span className="uppercase ml-2">{maskedPan}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <div>
                                                    <span className="font-medium">{item?.is_cleared ? "Dues cleared:" : "Amount Due:"}</span>
                                                    <span className={`font-semibold ml-2 ${item?.is_cleared ? "text-green-600" : "text-red-600"}`}>{item?.pending_amount}/-</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Due Date:</span>
                                                    <span className="ml-2">{new Date(item?.createdAt).toLocaleDateString("en-IN")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className="border-t mt-6">
                        <p className="text-[8px] pt-3 leading-[10px] italic">
                            <span className="font-semibold text-red-500">Note: </span>If you find a discrepancy in your report, it is important to promptly raise it with your
                            lender. Under the Credit Information Companies regulations, Vyapar Score or any Credit Information Company is not authorized to modify any data in your
                            credit report without authorization from your lender. However, we can assist you in raising a dispute with the lender to help resolve the issue.
                        </p>
                    </div>
                </div>
                <div className="py-3 ml-3 flex justify-center">
                    <button
                        className="cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[140px]"
                        onClick={() => downloadImage("png")}
                    >
                        Download
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 animate-bounce">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                        </svg>
                    </button>
                </div>
            </main>
        </>
    )
}

export default PrintDetails
