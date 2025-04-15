import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const BeforeWrapUp = ({ onNext }) => {
    const [activeTab, setActiveTab] = useState('no');
    const [text, setText] = useState('');

    const handleTab = (e) => {
        setActiveTab(e.currentTarget.id);
        setText(''); // Reset text when switching tabs
    };

    const handleContinue = () => {
        if (activeTab === 'yes' && text.trim() === '') {
            toast('Please add details before continuing.');
            return;
        }
        onNext({}, 'uploadProfile');
    };

    return (
        <div className="w-full p-4 sm:p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full max-w-full sm:max-w-[450px] md:w-[500px]">
                <p className="text-sm sm:text-base">BEFORE WE WRAP UP</p>
                <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold   mt-2">
                    Is there anything else you want your healthcare provider to know about your health?
                </h2>
                <p className="text-zinc-500 font-semibold text-sm sm:text-base">
                    Include any additional details about the conditions you have already reported.
                </p>

<div className='flex justify-between'>
                <div
                    onClick={handleTab}
                    id="yes"
                    className={`bg-white cursor-pointer border rounded-xl p-2 w-[48%] sm:p-3 text-base sm:text-lg font-semibold mt-2 sm:mt-3 ${
                        activeTab === 'yes' ? 'border-primary border-2' : ''
                    }`}
                >
                    Yes
                </div>
                <div
                    onClick={handleTab}
                    id="no"
                    className={`bg-white cursor-pointer border rounded-xl p-2 w-[48%] sm:p-3 text-base sm:text-lg font-semibold mt-2 sm:mt-3 ${
                        activeTab === 'no' ? 'border-primary border-2' : ''
                    }`}
                >
                    No
                </div>
                {activeTab === 'yes' && (
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full mt-2 sm:mt-3 p-2 sm:p-3 border rounded-lg resize-none text-sm sm:text-base"
                        placeholder="Please Enter any information you want your healthcare provider to know about your health."
                        rows={4}
                    />
                )}
                </div>
                <button
                    type="button"
                    className="mt-4 sm:mt-6 hover:bg-primary/90 p-2 sm:p-3 text-white w-full py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full bg-primary"
                    onClick={handleContinue}
                    aria-label='Continue'
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default BeforeWrapUp;
