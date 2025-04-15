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
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full md:w-[500px]">
                <h2 className="text-2xl mb-6 font-semibold">
                    Please list all your drug or food allergies.
                </h2>

                <input
                    className="p-3 bg-white border outline-none mt-5 rounded-xl w-full"
                    type="text"
                    placeholder="Type an allergy and press Enter"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleAddCustomAllergy}
                />

                <div className="mt-4 flex flex-wrap gap-2">
                    {selectedAllergies.map((allergy) => (
                        <div
                            key={allergy}
                            className="flex items-center bg-primary text-white px-3 py-1 rounded-full"
                        >
                            <span>{allergy}</span>
                            <button
                                className="ml-2 text-white"
                                onClick={() => removeAllergy(allergy)}
                                aria-label='close'
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {/* Button Container */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full mt-6 md:mt-8">
                    {/* Back Button */}
                    <button
                        type="button"
                        className="w-full sm:flex-1 py-3 hover:bg-gray-200 rounded-full text-gray-700 font-semibold border border-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md"
                        onClick={onBack}
                        aria-label="Back"
                    >
                        Back
                    </button>
                    
                    {/* Continue Button or No Allergies Button */}
                    {selectedAllergies.length > 0 || searchTerm.trim() !== '' ? (
                        <button
                            type="button"
                            className="w-full sm:flex-1 py-3 font-medium text-center bg-primary text-white cursor-pointer rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:bg-primary/90 transform hover:scale-[1.02]"
                            onClick={() => {
                                // Check if there's text in the input field that hasn't been added yet
                                if (searchTerm.trim() !== '') {
                                    const newAllergy = searchTerm.trim();
                                    if (!selectedAllergies.includes(newAllergy)) {
                                        // Add the current input text as an allergy before proceeding
                                        const updatedAllergies = [newAllergy, ...selectedAllergies];
                                        onNext({ allergies: updatedAllergies }, "glp1");
                                        return;
                                    }
                                }
                                // Otherwise proceed with current selections
                                onNext({ allergies: selectedAllergies }, "glp1");
                            }}
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="w-full sm:flex-1 py-3 font-medium text-center border cursor-pointer rounded-full transition-colors duration-300 shadow-sm hover:shadow-md hover:bg-gray-50"
                            onClick={() => onNext({}, "glp1")}
                        >
                            I don&apos;t have any allergies
                        </button>
                    )}
                </div>
                
            </div>
        </div>
    );
};

export default SearchAndSelectAllergies;
