import { useState, useEffect } from "react";

/**
 * EthnicityForm Component
 * 
 * A form component that allows users to select their ethnicity.
 * Users can select multiple ethnicities from a predefined list.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const EthnicityForm = ({onNext, onBack}) => {
  // State to track which ethnicities the user has selected
  const [selectedEthnicities, setSelectedEthnicities] = useState(() => {
    try {
      const savedEthnicities = localStorage.getItem('EthnicityForm_selectedEthnicities');
      return savedEthnicities ? JSON.parse(savedEthnicities) : [];
    } catch (error) {
      console.error("Error loading saved ethnicities from localStorage:", error);
      return [];
    }
  });

  // Save selected ethnicities to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('EthnicityForm_selectedEthnicities', JSON.stringify(selectedEthnicities));
    } catch (error) {
      console.error("Error saving ethnicities to localStorage:", error);
    }
  }, [selectedEthnicities]);

  // Predefined list of ethnicities for selection
  const ethnicities = [
    "White",
    "Hispanic or Latino",
    "Black or African American",
    "Native American or American Indian",
    "Asian / Pacific Islander",
    "Other",
    "I prefer not to answer",
  ];

  /**
   * Handles the checkbox selection/deselection
   * If an ethnicity is already selected, it removes it from the array
   * If an ethnicity is not selected, it adds it to the array
   * 
   * @param {string} ethnicity - The ethnicity text that was clicked
   */
  const handleCheckboxChange = (ethnicity) => {
    try {
      setSelectedEthnicities((prev) => {
        const newEthnicities = prev.includes(ethnicity)
          ? prev.filter((e) => e !== ethnicity)
          : [...prev, ethnicity];
        return newEthnicities;
      });
    } catch (error) {
      console.error("Error updating selected ethnicities:", error);
    }
  };

  const isButtonDisabled = selectedEthnicities.length === 0;

  return (
    <div className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md">
      <div className="w-full max-w-[500px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-zinc-700 text-center font-medium" 
            id="ethnicity-heading">
          How would you describe yourself?
        </h2>
        <p className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base">Select all that apply</p>
        <form aria-labelledby="ethnicity-heading">
          <div className="space-y-3 md:space-y-4" role="group" aria-label="Ethnicity options">
            {ethnicities.map((ethnicity, index) => (
              <label
                key={index}
                className={`flex items-center p-3 md:p-4 gap-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedEthnicities.includes(ethnicity) 
                  ? 'bg-[#365e56] text-white border-[#365e56] shadow-sm' 
                  : 'bg-white hover:bg-gray-50 hover:border-[#6d8a84]'}`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    className="form-checkbox min-h-[20px] min-w-[20px] md:min-h-[24px] md:min-w-[24px] accent-[#6d8a84] rounded-full"
                    checked={selectedEthnicities.includes(ethnicity)}
                    onChange={() => handleCheckboxChange(ethnicity)}
                    aria-label={ethnicity}
                  />
                </div>
                <span className={`${selectedEthnicities.includes(ethnicity) ? 'text-white' : 'text-gray-800'} text-sm md:text-base`}>
                  {ethnicity}
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
            {/* Next Button */}
            <button
              type="button"
              className={`w-full sm:flex-1 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 transform hover:scale-[1.02]"
              }`}
              disabled={isButtonDisabled}
              onClick={() => onNext({describe_yourself:selectedEthnicities}, "beforeWrapUp")}
              aria-label="Next"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
     
  );
};

export default EthnicityForm;
