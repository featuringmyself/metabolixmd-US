 const LabTestForm = ({onNext}) => {
    const handleProceed = () => {
      // Handle the "I want to proceed" action
      onNext({},"beforeWrapUp")
    };
  
    const handleNotProceed = () => {
      // Handle the "I do not want to proceed" action
    };
  
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px]">
          {/* <h2 className="text-2xl font-semibold mb-6">
            Your provider needs you to complete a lab test
          </h2> */}
          <p className="mb-4">
            A metabolic lab test will check for underlying health conditions to see if you are a good candidate for GLP-1 treatment.
          </p>
          {/* <h3 className="text-2xl  mb-6 text-primary">What is covered in the metabolic lab test?</h3> */}
          <ul className="list-disc ml-5 mb-4">
            <li>A lipid profile and A1c, thyroid, and kidney function testing</li>
            <li>Detection for conditions such as high cholesterol, prediabetes, hypothyroidism</li>
          </ul>
          {/* <h3 className="font-swiemibold">How do I complete the lab test?</h3>
          <p className="mb-4"> 
            Testing at Quest is included in the Body Program in most states, or you can get an at-home collection kit for $75. In some states, you will get an at-home kit at no extra cost.
          </p>
          <h3 className="font-semibold">What happens afterward?</h3>
          <p className="mb-4">
            A Ro-affiliated provider will discuss your lab results and options with you. If the lab tests do not show any underlying health conditions, you may not qualify for treatment.
          </p> */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full hover:bg-primary/90  py-3 text-white font-semibold rounded-full bg-primary hover:bg-primary"
              onClick={handleProceed}
              aria-label="Proceed"
            >
              I want to proceed
            </button>
            <button
              type="button"
              className="w-full py-3 text-black font-semibold rounded-full border border-gray-300 hover:bg-gray-50"
              onClick={handleNotProceed}
              aria-label="Do not Proceed"
            >
              I do not want to proceed
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LabTestForm;
  