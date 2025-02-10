import React, { useState } from 'react'

const Type2Diabetes = ({ onNext }) => {
    const [activeTab, setActiveTab] = useState("")

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id)
    }

    const handleContinue = () => {
        const data = {
            type_2_diabetes: activeTab
        }
        onNext(data, "diabeticRetinopathy")  // Pass the data and move to the next step
    }

    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full md:w-[500px]">
                <h2 className="text-2xl  mb-6 text-primary">
                    Do you currently have or have you ever been diagnosed with type 2 diabetes?
                </h2>
                <p className='text-zinc-500 font-semibold'>We want to make sure there is a provider overseeing your overall care</p>

                <div onClick={handleTab} id="yes" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "yes" ? "border-primary border-2" : ""}`}>
                    Yes
                </div>
                <div onClick={handleTab} id="no" className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${activeTab === "no" ? "border-primary border-2" : ""}`}>
                    No
                </div>
                
                <button
                    type="button"
                    className={`mt-6 p-3 hover:bg-primary/90   w-full py-3 text-white font-semibold rounded-full bg-primary hover:bg-primary`}
                    onClick={handleContinue}
                    aria-label='continue'
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Type2Diabetes
