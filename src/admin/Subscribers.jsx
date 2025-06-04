import useAllUsers from "../hooks/useAllUsers";

export default function Subscribers() {
	const { subscribers } = useAllUsers();

	return (
		<>
			<section className="sm:p-4 p-2 space-y-4">
				<div className="overflow-x-auto rounded-xl shadow-md border">
					<table className="min-w-[800px] w-full divide-y divide-gray-200 bg-white text-sm">
						<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
							<tr>
								<th className="px-6 py-3 text-left">#</th>
								<th className="px-6 py-3 text-left">Name</th>
								<th className="px-6 py-3 text-left">Plan details</th>
								<th className="px-6 py-3 text-left">Tranasction details</th>
								<th className="px-6 py-3 text-left">User details</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 text-gray-700">
							{subscribers?.map((user, index) => (
								<tr key={user._id}>
									<td className="px-6 py-4">{index + 1}</td>
									<td className="px-6 py-4 capitalize">{user.user.user_name}</td>
									<td className="px-6 py-4">
										<label htmlFor={`plan_modal_${index}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer">Plan detail</label>
										<input type="checkbox" id={`plan_modal_${index}`} className="modal-toggle" />
										<div className="modal" role="dialog">
											<div className="modal-box">
												<h3 className="text-lg font-bold">Plan detail!</h3>
												<div className="py-4 space-y-2 text-[16px]">
													<p>Business type: {user.plan.businessType}</p>
													<p>Plan name: {user.plan.name}</p>
													<p>Plan duration: {user.plan.duration} days ({user.plan.durationType})</p>
													<p>Plan price: ₹{user.plan.price}</p>
												</div>
											</div>
											<label className="modal-backdrop" htmlFor={`plan_modal_${index}`}>Close</label>
										</div>
									</td>
									<td className="px-6 py-4">
										<label htmlFor={`transaction_modal_${index}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer">Transaction detail</label>
										<input type="checkbox" id={`transaction_modal_${index}`} className="modal-toggle" />
										<div className="modal" role="dialog">
											<div className="modal-box">
												<h3 className="text-lg font-bold">Transaction detail!</h3>
												<div className="py-4 space-y-2 text-[16px]">
													<p><span className="font-semibold">Merchant order ID:</span> {user.transactionDetail.merchant_order_id}</p>
													<p><span className="font-semibold">Transaction amount:</span> {user.transactionDetail.response.amount / 100}</p>
													<p><span className="font-semibold">Status:</span> {user.transactionDetail.response.state}</p>
													<p><span className="font-semibold">Payment mode:</span> {user.transactionDetail.response.paymentDetails[0].paymentMode}</p>
												</div>
											</div>
											<label className="modal-backdrop" htmlFor={`transaction_modal_${index}`}>Close</label>
										</div>
									</td>
									<td className="px-6 py-4">
										<label htmlFor={`user_modal_${index}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer">User detail</label>
										<input type="checkbox" id={`user_modal_${index}`} className="modal-toggle" />
										<div className="modal" role="dialog">
											<div className="modal-box">
												<h3 className="text-lg font-bold">Hello!</h3>
												<div className="py-4 space-y-2 text-[16px]">
													<p><span className="font-semibold">Name:</span> {user.user.user_name}</p>
													<p><span className="font-semibold">Mobile:</span> {user.user.mobile_no}</p>
													<p><span className="font-semibold">Email:</span> {user.user.email}</p>
												</div>
											</div>
											<label className="modal-backdrop" htmlFor={`user_modal_${index}`}>Close</label>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<ul className="space-y-2"></ul>
			</section>
		</>
	);
}
