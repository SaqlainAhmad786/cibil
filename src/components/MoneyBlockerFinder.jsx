function MoneyBlockerFinder() {
    return (
        <>
            <main>
                <div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
                    <h1 className="text-lg font-semibold col-span-2 border-neutral-200 pb-2">Search for Money Blockers (Defaulters)</h1>
                    <div className='grid grid-cols-6 gap-2'>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="John Doe" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">PAN Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="DSKPA123456" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Aadhar Card No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="12345678905454" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">GST No.</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="22AAAAA0000A1Z5" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-500">Mobile</label>
                            <input type="text" className="border rounded-lg px-3 py-2 text-sm w-full outline-none dark:border-gray-200 dark:bg-gray-100" placeholder="9876543210" />
                        </div>
                        <div className="col-span-5">
                            <button className="h-full border-2 text-gray-400 font-bold py-2 px-4 rounded-md"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                </div>
                <div className="customContainer h-[300px] flex items-center justify-center bg-white p-5 rounded-lg mx-auto shadow-sm mt-5">
                    <p className="text-sm">No data found</p>
                </div>
            </main>
        </>
    )
}

export default MoneyBlockerFinder
