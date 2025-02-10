import { useState } from "react";

const EthnicityForm = ({onNext}) => {
  const [selectedEthnicities, setSelectedEthnicities] = useState([]);
  const ethnicities = [
    "White",
    "Hispanic or Latino",
    "Black or African American",
    "Native American or American Indian",
    "Asian / Pacific Islander",
    "Other",
    "I prefer not to answer",
  ];

  const handleCheckboxChange = (ethnicity) => {
    if (selectedEthnicities.includes(ethnicity)) {
      // Deselect the ethnicity if it's already selected
      setSelectedEthnicities([]);
    } else {
      // Select the new ethnicity and deselect others
      setSelectedEthnicities([ethnicity]);
    }
  };

  const isButtonDisabled = selectedEthnicities.length === 0;

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">How would you describe yourself?</h2>
        <p className="my-5 font-semibold text-zinc-500">Select all that apply</p>
        <form>
          <div className="space-y-4">
            {ethnicities.map((ethnicity, index) => (
              <label
                key={index}
                className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="form-checkbox min-h-[20px] min-w-[20px] text-green-600"
                  checked={selectedEthnicities.includes(ethnicity)}
                  onChange={() => handleCheckboxChange(ethnicity)}
                />
                <span className=" text-gray-800">{ethnicity}</span>
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
            onClick={()=>onNext({describe_yourself:selectedEthnicities},"beforeWrapUp")}
            aria-label="Next"
          >
            Next
          </button>
        </form>
      </div>
    </div>
     
  );
};

export default EthnicityForm;
