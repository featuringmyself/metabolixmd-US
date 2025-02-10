import { useState } from "react";

const GoalSelectionForm = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    "Lose weight",
    "Improve my general physical health",
    "Improve another health condition",
    "Increase confidence about my appearance",
    "Increase energy for activities I enjoy",
    "I have another goal not listed above",
  ];

  const handleCheckboxChange = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const isButtonDisabled = selectedGoals.length === 0;

  const handleContinue = () => {
    // Pass the selected goals data to the parent component and move to the next form
    onNext({ accomplish_with_body_program:selectedGoals }, "userInfo"); // Adjust "userInfo" to whatever the next step should be
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">
          What do you want to accomplish with the our weight loss program?
        </h2>
        <p className="my-5 font-semibold text-zinc-500">I Want to...</p>
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
            className={`mt-6 hover:bg-primary/90  w-full py-3 text-white font-semibold rounded-full ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary"
            }`}
            disabled={isButtonDisabled}
            onClick={handleContinue} // Trigger the continue action
            aria-label="Continue"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalSelectionForm;
