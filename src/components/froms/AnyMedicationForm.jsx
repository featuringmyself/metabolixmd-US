import { useState } from "react";

const AnyMedicationForm = ({onNext}) => {
  const [selectedMedications, setSelectedMedications] = useState([]);
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

  // const handleCheckboxChange = (medication) => {
  //   setSelectedMedications((prev) =>
  //     prev.includes(medication)
  //       ? prev.filter((m) => m !== medication)
  //       : [...prev, medication]
  //   );
  // };
  const handleCheckboxChange = (goal) => {
    if (goal ===  "None of the above") {
      if (selectedMedications.includes(goal)) {
        // If "No" is already selected, deselect it
        setSelectedMedications([]);
      } else {
        // If "No" is not selected, select only "No" and deselect all others
        setSelectedMedications([goal]);
      }
    } else {
      if (selectedMedications.includes( "None of the above")) {
        // Prevent selecting other options if "No" is selected
        return;
      }
      // Toggle the selection of other options
      setSelectedMedications((prev) =>
        prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
      );
    }
  };
  const isButtonDisabled = selectedMedications.length === 0;
  const handleContinue = () => {
    const criticalMedications = [
      "Selective Serotonin Reuptake Inhibitor (SSRI) such as (but not limited to) citalopram (Celexa), fluoxetine (Prozac), escitalopram (Lexapro)",
      "Monoamine Oxidase Inhibitor (MAOI) such as (but not limited to) phenelzine (Nardil), selegiline (Emsam)"
    ];
  

    const shouldStop = selectedMedications.some((medication) =>
      criticalMedications.includes(medication)
    );

    const nextStep = shouldStop ? "stopProcess" : "ethnicity";
    const data = { additional_condition: selectedMedications };
  
    onNext(data, nextStep);
  };
  

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <h2 className="text-2xl  mb-6 text-primary">Do you currently take any of the following medications?</h2>
        <p className="my-5 font-semibold text-zinc-500">Select all that apply</p>
        <form>
          <div className="space-y-4">
            {medications.map((medication, index) => (
              <label
                key={index}
                className="flex items-center p-4 gap-2 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="form-checkbox min-h-[20px] min-w-[20px] text-green-600"
                  checked={selectedMedications.includes(medication)}
                  onChange={() => handleCheckboxChange(medication)}
                />
                <span className=" text-gray-800">{medication}</span>
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
            onClick={ handleContinue }
            aria-label="Next"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnyMedicationForm;
