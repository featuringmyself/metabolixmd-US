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
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full md:w-[500px]">
                <p>BEFORE WE WRAP UP</p>
                <h2 className="text-2xl mb-6 text-primary">
                    Is there anything else you want your healthcare provider to know about your health?
                </h2>
                <p className="text-zinc-500 font-semibold">
                    Include any additional details about the conditions you have already reported.
                </p>

                <div
                    onClick={handleTab}
                    id="yes"
                    className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${
                        activeTab === 'yes' ? 'border-primary border-2' : ''
                    }`}
                >
                    Yes
                </div>
                <div
                    onClick={handleTab}
                    id="no"
                    className={`bg-white cursor-pointer border rounded-xl p-3 text-lg font-semibold mt-3 ${
                        activeTab === 'no' ? 'border-primary border-2' : ''
                    }`}
                >
                    No
                </div>
                {activeTab === 'yes' && (
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full mt-3 p-3 border rounded-lg resize-none"
                        placeholder=""
                    />
                )}
                <button
                    type="button"
                    className="mt-6 hover:bg-primary/90 p-3 text-white w-full py-3 font-semibold rounded-full bg-primary"
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
