import { useAuth } from '../../contexts/authContext';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'
import ProfileUpload from '../ProfileUpload/ProfileUpload';
import Loader from '../Loader/Loader';

function Profile() {
    const { userData, userLoading } = useAuth();
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const planExpiry = userData?.subscriptions?.filter((plan) => plan.isActive)[0].expiry;

    return (
        <>
            <section className="my-4">
                {userLoading && <Loader />}
                <div className="customContainer bg-white lg:p-5 md:p-5 p-3 rounded-lg mx-auto shadow-sm">
                    <div className='flex justify-center'>
                        <div className="w-32 h-32 relative rounded-full grid">
                            <div className="grid place-items-center aspect-square h-32 border-4 border-blueClr rounded-[100vh] shadow-[1px_1px_8px_0px_rgba(0,0,0,0.5)]">
                                <img
                                    className="object-cover h-full w-full rounded-[100vh] overflow-hidden"
                                    src={userData?.avatar}
                                    alt="profile"
                                    onError={(e) => (e.target.src = '/img/default-avatar.jpg')}
                                />
                            </div>
                            <button htmlFor='profile' className={styles.browse} onClick={handleClick}>
                                <div className={styles.browseFileImg}>
                                    <i className="fa-solid fa-pen"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                    <ProfileUpload fileInputRef={fileInputRef} />
                    <div className='flex flex-col items-center gap-1 justify-center mt-4'>
                        <p className='text-sm text-gray-600'>SUBSCRIPTION: <span className={userData?.isSubscribed ? "text-white bg-green-600 p-1 rounded-lg font-semibold tracking-wider" : "text-white bg-red-600 p-1 rounded-lg font-semibold tracking-wider"}>{userData?.isSubscribed ? "ACTIVE" : "EXPIRED"}</span></p>
                        <p className='text-sm text-gray-600'>Valid upto:{" "}
                            <span className='text-gray-800 font-semibold'>
                                {new Date(planExpiry).toLocaleDateString('en-IN')}
                            </span>
                        </p>
                    </div>
                    <div className='bg-gradient-to-r from-gray-200 to-white p-3 rounded-lg lg:w-[60%] md:w-[70%] w-full mx-auto mt-4 space-y-2'>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>Full Name:</span>
                            <span className='text-lg text-neutral-800 capitalize'>{userData?.user_name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>Mobile:</span>
                            <span className='text-lg text-neutral-800'>+91 {userData?.mobile_no}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>Address:</span>
                            <span className='text-lg text-neutral-800 capitalize'>{userData?.address?.address}, {userData?.address?.city}, {userData?.address?.state}, {userData?.address?.country}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>Firm Name:</span>
                            <span className='text-lg text-neutral-800 uppercase'>{userData?.firm_name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>Business type:</span>
                            <span className='text-lg text-neutral-800 uppercase'>{userData?.business_type}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>GST no.:</span>
                            <span className='text-lg text-neutral-800 uppercase'>{userData?.gst_no}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-xs text-gray-600'>PAN Card no.:</span>
                            <span className='text-lg text-neutral-800 uppercase'>{userData?.pan_no}</span>
                        </div>
                    </div>
                    <div className='mt-5 mb-1 text-center'>
                        <Link to={"/overview/editProfile"} className='bg-blueClr text-white py-2 px-4 rounded-lg font-semibold text-sm'><i className="fa-solid fa-pen mr-1"></i> Edit Profile</Link>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Profile
