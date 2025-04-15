

import { useState } from "react";

const GastrointestinalCondtions = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const goals = [
    "Bariatric surgery",
    "Pancreatitis",
    "Heart failure",
    "History of delayed gastric emptying or gastroparesis",
    "Gallstones or other gallbladder disease",
    "GERD / Acid Reflux",
    "No, I do not have a history of any of these conditions or procedures",
  ];

  const handleCheckboxChange = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const isButtonDisabled = selectedGoals.length === 0;

  return (
    <div className="max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl font-semibold mb-6">
          Do you currently have, or have you ever been diagnosed with any of these gastrointestinal conditions or procedures?
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
            className={`mt-6 hover:bg-primary/90  w-full py-3  text-white font-semibold rounded-full ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
            disabled={isButtonDisabled}
            aria-label="Next"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default GastrointestinalCondtions;
