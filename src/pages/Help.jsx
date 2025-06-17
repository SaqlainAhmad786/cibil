import { useState } from "react";
import { toast, Toaster } from "sonner";

function Help() {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);

        formData.append("access_key", "723893dd-551b-4542-8d62-66f3dcdcee4b");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Message sent successfully!", { description: "We will get back to you soon!" }, { duration: 3000 });
            event.target.reset();
            setLoading(false);
        } else {
            toast.error('Message not sent', { description: "Please try again later" }, { duration: 3000 });
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster richColors position="top-right" />
            <section className="py-6">
                <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                    <div>
                        <h1 className="text-4xl font-bold">Get in touch</h1>
                        <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>+91 9905777922</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>vyaparscore@gmail.com</span>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                        <label className="block">
                            <span className="mb-1">Full name</span>
                            <input type="text" placeholder="Leroy Jenkins" name="fullname" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-blueClr border p-2" />
                        </label>
                        <label className="block">
                            <span className="mb-1">Email address</span>
                            <input type="email" placeholder="leroy@jenkins.com" name="email" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-blueClr border p-2" />
                        </label>
                        <label className="block">
                            <span className="mb-1">Mobile</span>
                            <input type="number" placeholder="9876543210" name="mobile" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-blueClr border p-2" />
                        </label>
                        <label className="block">
                            <span className="mb-1">Message</span>
                            <textarea rows="3" name="message" className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blueClr border p-2"></textarea>
                        </label>
                        <button type="submit" className="flex items-center justify-center px-8 py-3 rounded focus:ring hover:ring focus:ring-opacity-75 bg-blueClr text-white focus:ring-blueClr hover:ring-blueClr">
                            {loading ? <l-mirage size="80" speed="4" color="white"></l-mirage> : "Submit"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Help
