import { useState } from "react";

const HeartDiseaseForm = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  
  // Heart condition options
  const goals = [
    "Atrial fibrillation or flutter",
    "Tachycardia (episodes of rapid heart rate)",
    "Heart failure",
    "Heart disease, stroke, or peripheral vascular disease",
    "Prolonged QT interval",
    "Other heart rhythm issues or ECG abnormalities",
    "Hypertension (high blood pressure)",
    "Hyperlipidemia (high cholesterol)",
    "Hypertriglyceridemia (high triglycerides)",
    "No, I have not been diagnosed with any of these heart conditions",
  ];

  // Handle checkbox change
  const handleCheckboxChange = (goal) => {
    if (goal === "No, I have not been diagnosed with any of these heart conditions") {
      if (selectedGoals.includes(goal)) {
        // If "No" is already selected, deselect it
        setSelectedGoals([]);
      } else {
        // If "No" is not selected, select only "No" and deselect all others
        setSelectedGoals([goal]);
      }
    } else {
      if (selectedGoals.includes("No, I have not been diagnosed with any of these heart conditions")) {
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
      heart_conditions: selectedGoals
    };
    onNext(data); // Replace "nextFormStep" with the next form step identifier
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">
        Do you currently have, or have you ever been diagnosed with any of the following heart or heart-related conditions?
        </h2>
        <p className="my-5 font-semibold text-zinc-500">Select all that apply</p>
        
        {/* Form with heart condition checkboxes */}
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

          {/* Continue button */}
          <button
            type="button"
            className={`mt-6 hover:bg-primary/90  w-full py-3 text-white font-semibold rounded-full ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
            disabled={isButtonDisabled}
            onClick={handleNext}
            aria-label="Continue"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeartDiseaseForm;
