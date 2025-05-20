import { useState } from "react";
import FormNavigationButtons from './FormNavigationButtons';

/**
 * AnyMedicationForm Component
 * 
 * A form component that allows users to select medications they are currently taking.
 * The component handles conditional logic to determine the next step in the form flow based on
 * selected medications.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const AnyMedicationForm = ({onNext, onBack}) => {
  // State to track which medications the user has selected
  const [selectedMedications, setSelectedMedications] = useState(() => {
    try {
      const savedMedications = localStorage.getItem('AnyMedicationForm_selectedMedications');
      return savedMedications ? JSON.parse(savedMedications) : [];
    } catch (error) {
      console.error("Error loading saved medications from localStorage:", error);
      return [];
    }
  });

  // List of medications for selection
  const medications = [
    "A GLP-1 agonist",
    "Sulfonylureas",
    "Insulin",
    "Warfarin (also called Jantoven or Coumadin) - a blood thinner that usually requires regular lab testing",
    "Meglitinides such as repaglinide or nateglinide",
    "Diuretics such as (but not limited to) furosemide (Lasix), bumetanide (Bumex), Hydrochlorothiazide/HCTZ",
    "Selective Serotonin Reuptake Inhibitor (SSRI) such as (but not limited to) citalopram (Celexa), fluoxetine (Prozac), escitalopram (Lexapro)",
    "Monoamine Oxidase Inhibitor (MAOI) such as (but not limited to) phenelzine (Nardil), selegiline (Emsam)",
    "None of the above",
  ];

  /**
   * Handles the checkbox selection/deselection logic
   * Special handling for the "None of the above" option
   * 
   * @param {string} goal - The medication text that was clicked
   */
  const handleCheckboxChange = (goal) => {
    try {
      if (goal ===  "None of the above") {
        if (selectedMedications.includes(goal)) {
          // If "None of the above" is already selected, deselect it
          setSelectedMedications([]);
          localStorage.setItem('AnyMedicationForm_selectedMedications', JSON.stringify([]));
        } else {
          // If "None of the above" is not selected, select only it and deselect all others
          setSelectedMedications([goal]);
          localStorage.setItem('AnyMedicationForm_selectedMedications', JSON.stringify([goal]));
        }
      } else {
        // If "None of the above" is selected, prevent selecting other options
        if (selectedMedications.includes("None of the above")) {
          return;
        }
        // Toggle the selection of other options
        setSelectedMedications((prev) => {
          const newMedications = prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal];
          localStorage.setItem('AnyMedicationForm_selectedMedications', JSON.stringify(newMedications));
          return newMedications;
        });
      }
    } catch (error) {
      console.error("Error updating selected medications:", error);
    }
  };

  // Disable the continue button if no medications are selected
  const isButtonDisabled = selectedMedications.length === 0;

  /**
   * Handles the form submission when the user clicks Next
   * Determines the next step based on selected medications
   */
  const handleContinue = () => {
    try {
      // Medications that require stopping the process
      const criticalMedications = [
        "Selective Serotonin Reuptake Inhibitor (SSRI) such as (but not limited to) citalopram (Celexa), fluoxetine (Prozac), escitalopram (Lexapro)",
        "Monoamine Oxidase Inhibitor (MAOI) such as (but not limited to) phenelzine (Nardil), selegiline (Emsam)"
      ];
    
      // Check if any critical medications are selected
      const shouldStop = selectedMedications.some((medication) =>
        criticalMedications.includes(medication)
      );

      // Determine the next step based on selected medications
      const nextStep = shouldStop ? "stopProcess" : "ethnicity";
      const data = { additional_condition: selectedMedications };
    
      onNext(data, nextStep);
    } catch (error) {
      console.error("Error processing form submission:", error);
    }
  };
  
  return (
    <div className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md">
      <div className="w-full max-w-[800px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-center font-semibold"
            id="medication-heading">
          Do you currently take any of the following medications?
        </h2>
        <p className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base">
          Select all that apply
        </p>
        <form aria-labelledby="medication-heading">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" role="group" aria-label="Medications">
            {medications.map((medication, index) => (
              <label
                key={index}
                className={`flex items-center p-3 md:p-4 gap-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${selectedMedications.includes(medication) 
                  ? 'bg-[#365e56] text-white border-[#365e56] shadow-sm' 
                  : 'bg-white hover:bg-gray-50 hover:border-[#6d8a84]'} ${
                  medication === "None of the above" ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    className="form-checkbox min-h-[20px] min-w-[20px] md:min-h-[24px] md:min-w-[24px] accent-[#6d8a84] rounded-full"
                    checked={selectedMedications.includes(medication)}
                    onChange={() => handleCheckboxChange(medication)}
                    aria-label={medication}
                  />
                </div>
                <span className={`${selectedMedications.includes(medication) ? 'text-white' : 'text-gray-800'} text-sm md:text-base`}>
                  {medication}
                </span>
              </label>
            ))}
          </div>

          <FormNavigationButtons
            onBack={onBack}
            onContinue={handleContinue}
            isContinueDisabled={isButtonDisabled}
            continueText="Next"
          />
        </form>
      </div>
    </div>
  );
};

export default AnyMedicationForm;
