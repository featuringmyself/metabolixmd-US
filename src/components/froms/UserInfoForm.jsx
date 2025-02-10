import { useState } from "react";
import { toast } from "react-toastify";

const UserInfoForm = ({ onNext }) => {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const isButtonDisabled = !feet || !inches || !weight;

  const handleContinue = () => {
    // Pass the height and weight data to the parent component and move to the next form
    const formData = {
      height: {
        feet,
        inches,
      },
      weight,
    };
    onNext(formData, "weightCalculation");

  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">
          Let’s start with where you are now
        </h2>

        {/* Height Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Your height
          </label>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Feet"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
            />
            <input
              type="text"
              placeholder="Inches"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
            />
          </div>
        </div>

        {/* Weight Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Your current weight
          </label>
          <input
            type="text"
            placeholder="Pounds"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Continue Button */}
        <button
          type="button"
          className={`w-full py-3 hover:bg-primary/90  rounded-full text-white font-semibold ${isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary "
            }`}
          disabled={isButtonDisabled}
          onClick={handleContinue} // Trigger continue action
          aria-label="Continue"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UserInfoForm;
