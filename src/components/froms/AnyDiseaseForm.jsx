import { useState } from "react";

/**
 * AnyDiseaseForm Component
 * 
 * A form component that allows users to select medical conditions they have been diagnosed with.
 * The component handles conditional logic to determine the next step in the form flow based on
 * selected conditions.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const AnyDiseaseForm = ({ onNext, onBack }) => {
    // State to track which conditions the user has selected
    const [selectedGoals, setSelectedGoals] = useState(() => {
        try {
            const savedGoals = localStorage.getItem('AnyDiseaseForm_selectedGoals');
            return savedGoals ? JSON.parse(savedGoals) : [];
        } catch (error) {
            console.error("Error loading saved conditions from localStorage:", error);
            return [];
        }
    });

    // List of medical conditions for selection
    const goals = [
        "Multiple Endocrine Neoplasia syndrome type 2 (MEN2)",
        "Personal history of thyroid cancer",
        "Family history of thyroid cancer",
        "Chronic kidney disease",
        "Diabetes requiring insulin",
        "Prediabetes and Insulin resistance",
        "Fatty liver disease (NAFLD or NASH)",
        "Kidney stones",
        "Liver cirrhosis or end stage liver disease",
        "Hypothyroidism (low functioning thyroid)",
        "Hyperthyroidism (high functioning thyroid)",
        "Graves' disease",
        "Other thyroid issues",
        "Syndrome of inappropriate antidiuretic hormones (SIADH)",
        "No, I have not been diagnosed with any of these conditions",
    ];

    /**
     * Handles the checkbox selection/deselection logic
     * Special handling for the "No, I have not been diagnosed..." option
     * 
     * @param {string} goal - The condition text that was clicked
     */
    const handleCheckboxChange = (goal) => {
        try {
            if (goal === "No, I have not been diagnosed with any of these conditions") {
                if (selectedGoals.includes(goal)) {
                    // If "No" is already selected, deselect it
                    setSelectedGoals([]);
                    localStorage.setItem('AnyDiseaseForm_selectedGoals', JSON.stringify([]));
                } else {
                    // If "No" is not selected, select only "No" and deselect all others
                    setSelectedGoals([goal]);
                    localStorage.setItem('AnyDiseaseForm_selectedGoals', JSON.stringify([goal]));
                }
            } else {
                // If "No" is selected, prevent selecting other options
                if (selectedGoals.includes("No, I have not been diagnosed with any of these conditions")) {
                    return;
                }
                // Toggle the selection of other options
                setSelectedGoals((prev) => {
                    const newGoals = prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal];
                    localStorage.setItem('AnyDiseaseForm_selectedGoals', JSON.stringify(newGoals));
                    return newGoals;
                });
            }
        } catch (error) {
            console.error("Error updating selected conditions:", error);
        }
    };

    // Disable the continue button if no conditions are selected
    const isButtonDisabled = selectedGoals.length === 0;

    /**
     * Handles the form submission when the user clicks Continue
     * Determines the next step based on selected conditions
     */
    const handleContinue = () => {
        try {
            // Conditions that require stopping the process
            const criticalMedications = [
                "Multiple Endocrine Neoplasia syndrome type 2 (MEN2)",
                "Personal history of thyroid cancer",
                "Family history of thyroid cancer",
                "Diabetes requiring insulin"
            ];

            // Check if any critical conditions are selected
            const shouldStop = selectedGoals.some((medication) =>
                criticalMedications.includes(medication)
            );

            // Prepare the data and determine the next step
            const nextStep = shouldStop ? "stopProcess" : "type2Diabetes";
            const data = { disease_conditions: selectedGoals };

            onNext(data, nextStep);
        } catch (error) {
            console.error("Error processing form submission:", error);
        }
    };

    return (
        <div className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md">
            <div className="w-full max-w-[800px] mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-center font-medium" 
                    id="medical-history-heading">
                    Medical History Questionnaire
                </h2>
                <p className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base">
                    Please select any conditions you've been diagnosed with:
                </p>
                
                <form aria-labelledby="medical-history-heading">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" role="group" aria-label="Medical conditions">
                        {goals.map((goal, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-3 md:p-4 gap-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                                    selectedGoals.includes(goal) 
                                    ? 'bg-[#365e56] text-white border-[#365e56] shadow-sm' 
                                    : 'bg-white hover:bg-gray-50 hover:border-[#6d8a84]'} ${
                                    goal === "No, I have not been diagnosed with any of these conditions" ? 'md:col-span-2' : ''
                                 }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox min-h-[20px] min-w-[20px] md:min-h-[24px] md:min-w-[24px] accent-[#6d8a84] rounded-full"
                                        checked={selectedGoals.includes(goal)}
                                        onChange={() => handleCheckboxChange(goal)}
                                        aria-label={goal}
                                    />
                                </div>
                                <span className={`${selectedGoals.includes(goal) ? 'text-white' : 'text-gray-800'} text-sm md:text-base`}>
                                    {goal}
                                </span>
                            </label>
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
                        {/* Continue button */}
                        <button
                            type="button"
                            className={`w-full sm:flex-1 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                                isButtonDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-primary hover:bg-primary/90 transform hover:scale-[1.02]"
                            }`}
                            disabled={isButtonDisabled}
                            onClick={handleContinue}
                            aria-label="Continue"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnyDiseaseForm;
