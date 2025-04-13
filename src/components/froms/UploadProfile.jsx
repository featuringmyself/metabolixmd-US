

import React, { useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'

const UploadProfile = ({ onSubmit, loading, img, setImg, onNext }) => {
    const [activeTab, setActiveTab] = useState("")
    const [preUrl, setPreUrl] = useState("")
    const fileInputRef = useRef()
    
    const handleFile = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        if (file) {
            setImg(file)
            const fileURL = URL.createObjectURL(file);
            setPreUrl(fileURL)
        }
    }

    const handleSubmit = async () => {
        // Call the onSubmit function which will handle the upload
        // This function is defined in MultiStepForm.jsx and will call FormService.submitFormWithProfile
        try {
            await onSubmit();
            // After successful upload, navigate to the LicensedProvider component
            // The navigation will happen automatically in the parent component (MultiStepForm.jsx)
            // as it sets the activeForm to "licensedProvider" after successful upload
        } catch (error) {
            console.error("Error uploading profile:", error);
            // Error handling is managed in the parent component
        }
    }

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id)
    }
    
    return (
        <div className="w-full p-4 sm:p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full max-w-full sm:max-w-[450px] md:w-[500px] flex flex-col justify-center items-center">
                <div onClick={() => fileInputRef.current.click()} className="h-[200px] w-full max-w-[250px] sm:max-w-[300px] md:h-[250px] md:w-[350px] cursor-pointer border border-zinc-100 rounded-lg flex items-center justify-center">

                    {
                        preUrl ?
                            <div style={{ backgroundImage: `url(${preUrl})` }} className="w-full min-h-full cursor-pointer bg-cover bg-no-repeat bg-center ">

                            </div>
                            :
                            <div className="flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#365d56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                <p className="text-gray-500">
                                    <span className="text-primary">jpg, png</span>
                                </p>
                            </div>
                    }
                    <input disabled={loading} type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleFile(e)} hidden />
                </div>
                <p className='mt-4 sm:mt-5 text-sm sm:text-base text-center px-2 sm:px-0'>
                    Kindly provide your clear picture to meet telehealth guidelines and ensure secure identity verification at MetabolixMD.
                </p>

                {/* <div onClick={handleTab} id="yes" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}>
                    Proceed
                </div>
                <div onClick={handleTab} id="no" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}>
                    No
                </div> */}
                <button
                    type="button"
                    className={`mt-6 hover:bg-primary/90  p-3 text-white w-full py-3text-white font-semibold rounded-full bg-primary hover:bg-primary`}
                    onClick={handleSubmit}
                    disabled={loading || (img === "")}
                >
                    {loading ? <ClipLoader size={24} color="white" /> : "Continue"}
                </button>
            </div>
        </div>
    )
}

export default UploadProfile