import React, { useState, useEffect } from 'react';

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
    const [selectedAllergies, setSelectedAllergies] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('SearchAndSelectAllergies_allergies');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        // Save to localStorage whenever allergies change
        if (typeof window !== 'undefined') {
            localStorage.setItem('SearchAndSelectAllergies_allergies', JSON.stringify(selectedAllergies));
        }
    }, [selectedAllergies]);

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
        <div className="w-[90%] p-4 sm:p-5 md:p-0 md:max-w-sm mx-auto">
            <div className="w-full max-w-full min-h-[50vh] flex flex-col justify-evenly">
                <h2 className="text-3xl sm:text-3xl md:text-5xl font-semibold mb-6 sm:mb-[10%] text-zinc-800 text-center leading-snug">
                    Your Allergies
                </h2>

                <div className="bg-white rounded-3xl md:px-10 px-10 md:py-16 py-10 shadow-sm md:mb-6">
                    <div className="mb-16">
                        <label className="block text-gray-700 font-medium mb-2 text-left">
                            Add your allergies
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type an allergy and press Enter"
                                className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-sm sm:text-base"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleAddCustomAllergy}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 min-h-[48px]">
                        {selectedAllergies.map((allergy) => (
                            <div
                                key={allergy}
                                className="flex items-center bg-gray-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200"
                            >
                                <span className="text-sm">{allergy}</span>
                                <button
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => removeAllergy(allergy)}
                                    aria-label="Remove allergy"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="button"
                        className="hover:bg-gray-200 px-4 py- text-gray-700 font-semibold rounded-full border border-gray-300 text-sm"
                        onClick={onBack}
                        aria-label="Back"
                    >
                        Back
                    </button>
                    
                    {selectedAllergies.length > 0 || searchTerm.trim() !== '' ? (
                        <button 
                            type="button"
                            className="hover:bg-primary/90 px-8 py-3 text-white font-semibold rounded-full bg-primary"
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
                            Continue
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="hover:bg-primary/90 px-4 py-3 text-white font-semibold rounded-full bg-primary text-sm"
                            onClick={() => onNext({}, "glp1")}
                        >
                            I don't have any allergies
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAndSelectAllergies;
