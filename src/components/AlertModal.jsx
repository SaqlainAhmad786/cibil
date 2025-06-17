import { Home, IndianRupee } from "lucide-react"
import { Link } from "react-router-dom"

function AlertModal() {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex items-center justify-center z-[60]">
                <div className="sm:max-w-[420px] max-w-[340px] bg-white rounded-lg shadow-xl w-full p-6 text-center space-y-4">
                    <h2 className="text-2xl font-semibold text-red-600">You're Not Subscribed</h2>
                    <p className="text-gray-700">Please subscribe to access this feature.</p>
                    <div className="flex sm:flex-row flex-col justify-center sm:gap-4 gap-2">
                        <Link to="/subscribe" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            <IndianRupee className="inline-block me-1 h-5 w-5" />
                            Subscribe Now
                        </Link>
                        <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                            <Home className="inline-block me-1 h-5 w-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AlertModal
