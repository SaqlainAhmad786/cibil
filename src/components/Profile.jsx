import { Link } from 'react-router-dom'
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
                        <Link to={"/overview/editProfile"} className='bg-blue text-white p-2 rounded-lg font-medium text-sm'><i className="fa-solid fa-pen mr-1"></i>Edit Profile</Link>
                    </div>
                </div>
                <div className="customContainer bg-white p-5 rounded-lg mx-auto mt-5 shadow-sm">
                    <h3 className="text-lg font-semibold col-span-2 border-neutral-200 pb-2">Defaulters data added by you</h3>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="border rounded-lg shadow-md p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Name: </span>John Doe</p>
                                <p><span className="font-medium text-neutral-400 me-2">Mobile: </span>+91 9876543210</p>
                            </div>
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Company name: </span>Example</p>
                                <p><span className="font-medium text-neutral-400 me-2">GST: </span>798797979799789</p>
                            </div>
                            <div className='lg:text-right lg:col-span-1 md:col-span-2'>
                                <button className="lg:w-auto w-full border-2 text-sm border-green-600 text-green-600 rounded-md p-2 h-full font-medium hover:bg-green-600 hover:text-white duration-200">
                                    <i className="fa-solid fa-circle-check mr-1"></i>
                                    CLEARED
                                </button>
                            </div>
                        </div>
                        <div className="border rounded-lg shadow-md p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Name: </span>John Doe</p>
                                <p><span className="font-medium text-neutral-400 me-2">Mobile: </span>+91 9876543210</p>
                            </div>
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Company name: </span>Example</p>
                                <p><span className="font-medium text-neutral-400 me-2">GST: </span>798797979799789</p>
                            </div>
                            <div className='lg:text-right lg:col-span-1 md:col-span-2'>
                                <button className="lg:w-auto w-full border-2 text-sm border-green-600 text-green-600 rounded-md p-2 h-full font-medium hover:bg-green-600 hover:text-white duration-200">
                                    <i className="fa-solid fa-circle-check mr-1"></i>
                                    CLEARED
                                </button>
                            </div>
                        </div>
                        <div className="border rounded-lg shadow-md p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Name: </span>John Doe</p>
                                <p><span className="font-medium text-neutral-400 me-2">Mobile: </span>+91 9876543210</p>
                            </div>
                            <div>
                                <p><span className="font-medium text-neutral-400 me-2">Company name: </span>Example</p>
                                <p><span className="font-medium text-neutral-400 me-2">GST: </span>798797979799789</p>
                            </div>
                            <div className='lg:text-right lg:col-span-1 md:col-span-2'>
                                <button className="lg:w-auto w-full border-2 text-sm border-green-600 text-green-600 rounded-md p-2 h-full font-medium hover:bg-green-600 hover:text-white duration-200">
                                    <i className="fa-solid fa-circle-check mr-1"></i>
                                    CLEARED
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile
