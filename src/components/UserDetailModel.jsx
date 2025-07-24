export default function UserDetailModel({ user }) {
    return (
        <>
            <label
                htmlFor={`my_modal_${user._id}`}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer"
            >
                View Details
            </label>

            <input
                type="checkbox"
                id={`my_modal_${user._id}`}
                className="modal-toggle"
            />
            <div
                className="modal"
                role="dialog"
            >
                <div className="modal-box max-w-2xl">
                    <h3 className="text-lg font-bold mb-4">User Details</h3>
                    <div className="py-2 space-y-2">
                        <img
                            src={user?.avatar}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full mb-4"
                        />
                        <p className="text-[16px]">
                            <strong>Name:</strong> {user?.user_name}
                        </p>
                        <p className="text-[16px]">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-[16px]">
                            <strong>Mobile:</strong> {user.mobile_no}
                        </p>
                        <p className="text-[16px]">
                            <strong>Firm Name:</strong> {user.firm_name}
                        </p>
                        <p className="text-[16px]">
                            <strong>Business Type:</strong> {user.business_type}
                        </p>
                        <p className="text-[16px]">
                            <strong>GST No:</strong> {user.gst_no}
                        </p>
                        <p className="text-[16px]">
                            <strong>PAN No:</strong> {user.pan_no}
                        </p>
                        <p className="text-[16px]">
                            <strong>Address:</strong> {user.address?.address}, {user.address?.city},{' '}
                            {user.address?.state}
                        </p>
                        <p className="text-[16px]">
                            <strong>Role:</strong> {user.role}
                        </p>
                        <p className="text-[16px]">
                            <strong>Subscribed:</strong> {user.isSubscribed ? 'Yes' : 'No'}
                        </p>
                        <p className="text-[16px]">
                            <strong>Created At:</strong>{' '}
                            {new Date(user.createdAt).toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
                <label
                    className="modal-backdrop"
                    htmlFor={`my_modal_${user._id}`}
                >
                    Close
                </label>
            </div>
        </>
    )
}
