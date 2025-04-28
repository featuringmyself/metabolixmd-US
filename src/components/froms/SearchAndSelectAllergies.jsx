import React, { useState } from 'react';

/**
 * SearchAndSelectAllergies Component
 * 
 * A form component that allows users to search and select allergies.
 * Users can add custom allergies by typing and pressing Enter.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const SearchAndSelectAllergies = ({ onNext, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAllergies, setSelectedAllergies] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddCustomAllergy = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            const newAllergy = searchTerm.trim();
            if (!selectedAllergies.includes(newAllergy)) {
                setSelectedAllergies((prev) => [newAllergy, ...prev]);
            }
            setSearchTerm(''); // Clear the input field
            e.preventDefault(); // Prevent form submission
        }
    };

    const removeAllergy = (allergy) => {
        setSelectedAllergies((prevSelected) =>
            prevSelected.filter((a) => a !== allergy)
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-12 bg-gradient-to-br from-white via-gray-50/50 to-white rounded-[2rem] shadow-2xl">
            <div className="space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <h2 className="text-5xl font-bold  text-zinc-900    ">
                            Your Allergies
                        </h2>
                        <div className="h-1 w-20 mx-auto mt-2 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Please list all your drug or food allergies to ensure safe and effective treatment
                    </p>
                </div>

                <div className="space-y-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <input
                            className="relative w-full px-8 py-6 text-lg bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-2xl focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder-gray-400 shadow-sm"
                            type="text"
                            placeholder="Type an allergy and press Enter"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleAddCustomAllergy}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/60 group-hover:text-primary transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 min-h-[48px]">
                        {selectedAllergies.map((allergy) => (
                            <div
                                key={allergy}
                                className="group flex items-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 text-primary px-7 py-3.5 rounded-full border border-primary/10 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <span className="text-sm font-medium">{allergy}</span>
                                <button
                                    className="ml-3 text-primary/40 hover:text-primary transition-colors duration-200"
                                    onClick={() => removeAllergy(allergy)}
                                    aria-label='Remove allergy'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-10">
                    <button
                        type="button"
                        className="group w-full sm:w-auto px-10 py-5 text-gray-700 bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                        onClick={onBack}
                    >
                        <span className="relative flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </button>
                    
                    {selectedAllergies.length > 0 || searchTerm.trim() !== '' ? (
                        <button
                            type="button"
                            className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary via-primary/90 to-primary text-white rounded-xl hover:from-primary/90 hover:via-primary hover:to-primary/90 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                            onClick={() => {
                                if (searchTerm.trim() !== '') {
                                    const newAllergy = searchTerm.trim();
                                    if (!selectedAllergies.includes(newAllergy)) {
                                        const updatedAllergies = [newAllergy, ...selectedAllergies];
                                        onNext({ allergies: updatedAllergies }, "glp1");
                                        return;
                                    }
                                }
                                onNext({ allergies: selectedAllergies }, "glp1");
                            }}
                        >
                            <span className="relative flex items-center justify-center gap-2">
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="group w-full sm:w-auto px-10 py-5 text-gray-700 bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                            onClick={() => onNext({}, "glp1")}
                        >
                            <span className="relative flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                I don&apos;t have any allergies
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAndSelectAllergies;
