import { useState } from "react";

const AnyDiseaseForm = ({ onNext }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);

    // List of conditions
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

    // Handle checkbox toggle
    const handleCheckboxChange = (goal) => {
        if (goal === "No, I have not been diagnosed with any of these conditions") {
            if (selectedGoals.includes(goal)) {
                // If "No" is already selected, deselect it
                setSelectedGoals([]);
            } else {
                // If "No" is not selected, select only "No" and deselect all others
                setSelectedGoals([goal]);
            }
        } else {
            if (selectedGoals.includes("No, I have not been diagnosed with any of these conditions")) {
                // Prevent selecting other options if "No" is selected
                return;
            }
            // Toggle the selection of other options
            setSelectedGoals((prev) =>
                prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
            );
        }
    };

    const isButtonDisabled = selectedGoals.length === 0;

    // Handle form submission
    const handleNext = () => {
        const data = {
            disease_conditions: selectedGoals,
        };
        onNext(data, "type2Diabetes"); // Replace 'nextStep' with the actual identifier for the next step
    };
    const handleContinue = () => {
        // Medications that require stopping the process
        const criticalMedications = [
            "Multiple Endocrine Neoplasia syndrome type 2 (MEN2)",
            "Personal history of thyroid cancer",
            "Family history of thyroid cancer",
            "Diabetes requiring insulin"
        ];

        // Check if any critical medications are selected
        const shouldStop = selectedGoals.some((medication) =>
            criticalMedications.includes(medication)
        );

        // Prepare the data and determine the next step
        const nextStep = shouldStop ? "stopProcess" : "type2Diabetes";
        const data = { disease_conditions: selectedMedications };

        onNext(data, nextStep);
    };


    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full md:w-[500px]">
                <h2 className="text-2xl  mb-6 text-primary">
                    Do you currently have, or have you ever been diagnosed with any of these hormone, kidney, or liver conditions?
                </h2>
                <p className="my-5 font-semibold text-zinc-500">Select all that apply</p>
                <form>
                    <div className="space-y-4">
                        {goals.map((goal, index) => (
                            <label
                                key={index}
                                className="flex items-center p-4 gap-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox min-h-[20px] min-w-[20px] text-green-600"
                                    checked={selectedGoals.includes(goal)}
                                    onChange={() => handleCheckboxChange(goal)}
                                />
                                <span className=" text-gray-800">{goal}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={`mt-6 hover:bg-primary/90  w-full py-3 text-white font-semibold rounded-full ${isButtonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-primary"
                            }`}
                        disabled={isButtonDisabled}
                        onClick={handleNext}
                        aria-label="Next"
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AnyDiseaseForm;
