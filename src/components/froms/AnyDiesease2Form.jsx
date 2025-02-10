

import { useState } from "react";

const AnyDisease2Form = ({onNext}) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const goals = [
    "Chronic candidiasis (fungal infections)",
    "Eating disorder",
    "Gout",
    "History of suicide attempt or history of suicidal ideation",
    "Lymphedema or chronic lower extremity swelling where other causes have been ruled out",
    "Metabolic syndrome",
    "Obstructive sleep apnea",
    "Osteoarthritis",
    "No, I have not been diagnosed with any of these conditions",
  ];

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

  const handleContinue = () => {
    // Pass the selected goals data to the parent component and move to the next form
    if(selectedGoals.includes("History of suicide attempt or history of suicidal ideation")){
      onNext({additional_condition:selectedGoals }, "stopProcess");
    }
    else{
      onNext({additional_condition:selectedGoals }, "searchAndSelectAllergies");
    }
     
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">
          Do you currently have, or have you ever been diagnosed with any of these additional following conditions?
        </h2>
        <p className="my-5 font-semibold text-zinc-500">Select all that apply</p>
        <form>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <label
                key={index}
                className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="form-checkbox min-h-[20px] min-w-[20px]   text-green-600"
                  checked={selectedGoals.includes(goal)}
                  onChange={() => handleCheckboxChange(goal)}
                />
                <span className=" text-gray-800">{goal}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            className={`mt-6 hover:bg-primary/90  w-full py-3  text-white font-semibold rounded-full ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
            disabled={isButtonDisabled}
            onClick={handleContinue}
            aria-label="Next"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnyDisease2Form;
