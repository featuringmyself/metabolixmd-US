import { useState } from "react";

const HeartDiseaseForm = ({ onNext, onBack }) => {
  const [selectedGoals, setSelectedGoals] = useState(() => {
    const savedGoals = localStorage.getItem('HeartDiseaseForm_selectedGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  
  // Heart condition options
  const goals = [
    "Not diagnosed with any",
    "Atrial fibrillation or flutter",
    "Tachycardia (episodes of rapid heart rate)",
    "Heart failure",
    "Heart disease, stroke, or peripheral vascular disease",
    "Prolonged QT interval",
    "Other heart rhythm issues or ECG abnormalities",
    "Hypertension (high blood pressure)",
    "Hyperlipidemia (high cholesterol)",
    "Hypertriglyceridemia (high triglycerides)",
  ];

  // Handle checkbox change
  const handleCheckboxChange = (goal) => {
    if (goal === "Not diagnosed with any") {
      if (selectedGoals.includes(goal)) {
        setSelectedGoals([]);
        localStorage.removeItem('HeartDiseaseForm_selectedGoals');
      } else {
        setSelectedGoals([goal]);
        localStorage.setItem('HeartDiseaseForm_selectedGoals', JSON.stringify([goal]));
      }
    } else {
      if (selectedGoals.includes("Not diagnosed with any")) return;
      
      setSelectedGoals((prev) => {
        const newGoals = prev.includes(goal) 
          ? prev.filter((g) => g !== goal)
          : [...prev, goal];
        localStorage.setItem('HeartDiseaseForm_selectedGoals', JSON.stringify(newGoals));
        return newGoals;
      });
    }
  };

  const isButtonDisabled = selectedGoals.length === 0;

  // Handle form submission
  const handleNext = () => {
    const data = {
      heart_conditions: selectedGoals
    };
    onNext(data); // Pass the selected heart conditions to the parent component
  };

  return (
    <div className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md">
      <div className="w-full max-w-[800px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-12 md:mb-6  font-semibold text-center">
          Do you currently have, or have you ever been diagnosed with any of the following heart or heart-related conditions?
        </h2>
        <p className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base">Select all that apply</p>
        
        {/* Form with heart condition checkboxes */}
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {goals.map((goal, index) => (
              <label
                key={index}
                className={`flex items-center p-3 md:p-4 gap-3 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${selectedGoals.includes(goal) 
                  ? 'bg-[#365e56] text-white border-[#365e56] shadow-sm' 
                  : 'bg-white hover:bg-gray-50 hover:border-[#6d8a84]'}`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    className="form-checkbox min-h-[20px] min-w-[20px] md:min-h-[24px] md:min-w-[24px] accent-[#6d8a84] rounded-full"
                    checked={selectedGoals.includes(goal)}
                    onChange={() => handleCheckboxChange(goal)}
                  />
                </div>
                <span className={`${selectedGoals.includes(goal) ? 'text-white' : 'text-gray-800'} text-sm md:text-base`}>{goal}</span>
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
              onClick={handleNext}
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

export default HeartDiseaseForm;
