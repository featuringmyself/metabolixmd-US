import { useState } from "react";
import { motion } from 'framer-motion';

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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full p-5 md:p-0 mx-auto max-w-3xl"
        >
            <AnimatePresence mode='wait'>
                <div className="space-y-8 md:space-y-10">
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                        Medical History Questionnaire
                    </motion.h2>

                    <motion.p variants={fadeIn} className="text-lg text-gray-600 mb-8">
                        Please select any conditions you've been diagnosed with:
                    </motion.p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {goals.map((goal) => (
                            <motion.div
                                key={goal}
                                variants={fadeIn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className={`p-5 rounded-xl border-2 transition-colors cursor-pointer
                                    ${selectedGoals.includes(goal)
                                        ? 'border-green-500 bg-green-50 ring-4 ring-green-100'
                                        : 'border-gray-200 hover:border-green-300 bg-white'}
                                    shadow-sm hover:shadow-md`}
                                onClick={() => handleCheckboxChange(goal)}
                            >
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedGoals.includes(goal)}
                                        className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-500"
                                        onChange={() => {}}
                                    />
                                    <span className="text-gray-800 font-medium">
                                        {goal}
                                    </span>
                                </label>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatePresence>
        </motion.div>
    );
};

export default AnyDiseaseForm;
