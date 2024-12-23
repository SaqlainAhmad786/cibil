import { useRef } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext';
import styles from './Profile.module.css'
import ProfileUpload from './ProfileUpload/ProfileUpload';
import Loader from './Loader/Loader';

function Profile() {
    const { userData, userLoading, userDefaultersList } = useAuth();
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <section className="my-4">
                {userLoading && <Loader />}
                <div className="customContainer bg-white p-5 rounded-lg mx-auto shadow-sm">
                    <div className="w-32 h-32 relative rounded-full">
                        <div className="grid place-items-center aspect-square h-32 border-4 border-blueClr rounded-[100vh] overflow-hidden">
                            <img
                                className="object-cover h-full w-full"
                                src='/img/default-avatar.jpg'
                            />
                        </div>
                        <button htmlFor='profile' className={styles.browse} onClick={handleClick}>
                            <div className={styles.browseFileImg}>
                                <i className="fa-solid fa-pen"></i>
                            </div>
                        </button>
                    </div>
                    <ProfileUpload fileInputRef={fileInputRef} />
                    <div className='space-y-2 mt-4'>
                        <div className='flex gap-4'>
                            <div className='lg:text-left md:text-left text-right'>
                                <p><span className='font-medium text-gray-500'>Full Name:</span></p>
                                <p><span className='font-medium text-gray-500'>Mobile:</span></p>
                                <p><span className='font-medium text-gray-500'>Email address:</span></p>
                            </div>
                            <div>
                                <p>{userData?.user_name}</p>
                                <p>+91 {userData?.mobile_no}</p>
                                <p>{userData?.email}</p>
                            </div>
                        </div>
                        <hr />
                        <p><span className='font-medium text-gray-500'>Firm Name:</span> {userData?.firm_name}</p>
                        <p><span className='font-medium text-gray-500'>GST No.:</span> +91 {userData?.gst_no}</p>
                        <p><span className='font-medium text-gray-500'>PAN Card No.:</span> {userData?.pan_no}</p>
                    </div>
                    <div className='mt-4'>
                        <Link to={"/overview/editProfile"} className='bg-blueClr text-white py-2 px-4 rounded-lg font-semibold text-sm'><i className="fa-solid fa-pen mr-1"></i>Edit Profile</Link>
                    </div>
                </div>
                <div className="customContainer bg-white p-5 rounded-lg mx-auto mt-5 shadow-sm">
                    <h3 className="text-lg font-semibold col-span-2 border-neutral-200 pb-2">Defaulters data added by you</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {userDefaultersList.map((item, index) => {
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
                                        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>CLEARED!</button>
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

export default Profile
