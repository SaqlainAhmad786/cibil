import { useCallback, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../contexts/authContext";

async function getCroppedImg(imageSrc, crop) {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = crop.width;
            canvas.height = crop.height;

            ctx.drawImage(
                image,
                crop.x, crop.y, crop.width, crop.height,
                0, 0, canvas.width, canvas.height
            );

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(URL.createObjectURL(blob)); // Returns the cropped image as a Blob
                } else {
                    reject(new Error('Canvas is empty'));
                }
            }, 'image/jpeg');
        };

        image.onerror = () => reject(new Error('Failed to load image'));
    });
}


function ProfileUpload({ fileInputRef }) {
    const { refreshUserData } = useAuth();
    const [image, setImage] = useState(null); // Stores uploaded image
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop position
    const [zoom, setZoom] = useState(1); // Zoom level
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Stores crop coordinates
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const uid = localStorage.getItem('userId');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 1000000) {
            toast.error("Image size should be less than 1MB", { duration: 3000 });
            setImage(null);
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                event.target.value = null;
                setIsDialogOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);

            const blob = await fetch(croppedImage).then((res) => res.blob())
            const file = new File([blob], 'image.jpg', { type: blob.type });

            const formData = new FormData();
            formData.append('avatar', file);
            await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update-avatar`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
                if (res.data.status) {
                    setIsDialogOpen(false);
                    toast.success("Profile picture uploaded successfully", { duration: 3000 });
                    refreshUserData()
                }
            });
        } catch (e) {
            setLoading(false);
            setIsDialogOpen(false);
            toast.error("Something went wrong", { description: "Please try again" }, { duration: 3000 });
            console.error('Error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toaster position="top-right" richColors />
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            {isDialogOpen && (
                <div className="cropDialogCont">
                    <div className="crop-dialog">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                        <div className="controls">
                            {!loading
                                ? <>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
                                </>
                                : <button className="col-span-2 flex justify-center items-center">
                                    <l-mirage
                                        size="80"
                                        speed="4"
                                        color="white"
                                    ></l-mirage>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileUpload
