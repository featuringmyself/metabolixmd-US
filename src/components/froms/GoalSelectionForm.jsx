import { useState, useEffect } from "react";

/**
 * GoalSelectionForm Component
 * 
 * A form component that allows users to select their goals for the weight loss program.
 * Users can select multiple goals from a predefined list.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form with selected data
 * @param {Function} props.onBack - Callback function to go back to the previous form
 * @param {boolean} props.isFirstForm - Flag indicating if this is the first form in the sequence
 * @param {Object} props.initialData - Initial data to populate the form with
 */
const GoalSelectionForm = ({ onNext, onBack, isFirstForm = true, initialData }) => {
  // State to track which goals the user has selected (array of strings)
  const [selectedGoals, setSelectedGoals] = useState(() => {
  const savedGoals = localStorage.getItem('GoalSelectionForm_selectedGoals');
  return savedGoals ? JSON.parse(savedGoals) : [];
});
  
  // Initialize form with data if provided
  useEffect(() => {
    if (initialData && initialData.accomplish_with_body_program) {
      setSelectedGoals(initialData.accomplish_with_body_program);
    }
  }, [initialData]);

  // Predefined list of goals that users can select from
  const goals = [
    "Lose weight",
    "Improve my general physical health",
    "Improve another health condition",
    "Increase confidence about my appearance",
    "Increase energy for activities I enjoy",
    "I have another goal not listed above",
  ];

  /**
   * Handles the checkbox selection/deselection
   * If a goal is already selected, it removes it from the array
   * If a goal is not selected, it adds it to the array
   * 
   * @param {string} goal - The goal text that was clicked
   */
  const handleCheckboxChange = (goal) => {
    setSelectedGoals((prev) => {
      const newGoals = prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal];
      localStorage.setItem('GoalSelectionForm_selectedGoals', JSON.stringify(newGoals));
      return newGoals;
    });
  };

  // Disable the continue button if no goals are selected
  const isButtonDisabled = selectedGoals.length === 0;

  /**
   * Handles the form submission when the user clicks Continue
   * Passes the selected goals to the parent component and navigates to the next form
   */
  const handleContinue = () => {
    // Pass the selected goals data to the parent component and move to the next form
    // The data is structured with the key 'accomplish_with_body_program' containing the array of selected goals
    // The second parameter "userInfo" specifies which form to show next
    onNext({ accomplish_with_body_program:selectedGoals }, "userInfo");
  };

  // Render the form with checkboxes for each goal and a continue button
  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit">
      <div className="w-full md:w-[800px] min-h-[50vh] flex flex-col justify-evenly">
        {/* Main heading for the form */}
        <h2 className="text-4xl font-medium  mb-6 text-zinc-800 text-center leading-snug">
          What do you want to accomplish with the our weight loss program?
        </h2>
        {/* Subheading that completes the sentence with the checkbox options */}
        <p className="my-5 font-semibold text-center text-zinc-600">I Want to...</p>
        <form>
          {/* Container for the goal checkboxes, using flex layout */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Map through each goal to create a checkbox for each */}
            {goals.map((goal, index) => (
              <label
                key={index}
                className={`flex items-center py-4 px-2 gap-2 border rounded-2xl cursor-pointer md:w-[45%] w-full ${selectedGoals.includes(goal) ? 'bg-[#365e56]' : 'bg-white hover:bg-gray-50'}`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox min-h-[20px] min-w-[40px] text-green-600 accent-[#6d8a84] rounded-full"
                  checked={selectedGoals.includes(goal)}
                  onChange={() => handleCheckboxChange(goal)}
                />
                <span className={`${selectedGoals.includes(goal) ? 'text-white' : 'text-gray-800 hover:text-gray-600'}`}>{goal}</span>
              </label>
            ))}
          </div>

          {/* Container for the back and continue buttons */}
          <div className="flex justify-center gap-4 mt-6">
            {/* Back button - only shown if not the first form */}
            {!isFirstForm && (
              <button
                type="button"
                className="hover:bg-gray-200 px-8 py-3 text-gray-700 font-semibold rounded-full border border-gray-300"
                onClick={onBack}
                aria-label="Back"
              >
                Back
              </button>
            )}
            {/* Continue button - disabled when no goals are selected */}
            <button
              type="button"
              className={`hover:bg-primary/90 px-8 py-3 text-white font-semibold rounded-full ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed" // Gray styling when disabled
                  : "bg-primary hover:bg-primary"    // Primary color when enabled
              }`}
              disabled={isButtonDisabled}
              onClick={handleContinue} // Trigger the continue action
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

export default GoalSelectionForm;
