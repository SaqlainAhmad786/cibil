import styles from './Profile.module.css'

function Profile() {
    return (
        <>
            <section className="py-4">
                <div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
                    <div className="w-32 h-32 relative rounded-full ">
                        <div className="grid place-items-center aspect-square h-32 border-4 border-blue rounded-[100vh] overflow-hidden">
                            <img
                                className="object-cover h-full w-full"
                                src='/img/default-avatar.jpg'
                            // onError={(e) => (e.currentTarget.src = "/images/default-avatar.jpg")}
                            />
                        </div>
                        <label htmlFor='profile' className={styles.browse}>
                            <div className={styles.browseFileImg}>
                                <i className="fa-solid fa-pen"></i>
                            </div>
                            <input type="file" className='hidden' name="" id="profile" />
                        </label>
                    </div>
                    <div className='space-y-2 mt-4'>
                        <p><span className='font-medium text-gray-500'>Full Name:</span> John Doe</p>
                        <p><span className='font-medium text-gray-500'>Mobile:</span> +91 9876543210</p>
                        <p><span className='font-medium text-gray-500'>Email address:</span> hD6dI@example.com</p>
                        <hr />
                        <p><span className='font-medium text-gray-500'>Firm Name:</span> John Doe</p>
                        <p><span className='font-medium text-gray-500'>GST No.:</span> +91 9876543210</p>
                        <p><span className='font-medium text-gray-500'>PAN Card No.:</span> hD6dI@example.com</p>
                    </div>
                    <div className='mt-4'>
                        <button className='bg-blue text-white p-2 rounded-lg font-medium text-sm'><i className="fa-solid fa-pen mr-1"></i>Edit Profile</button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Profile
