// import React, { useState } from 'react'
// import { toast } from 'react-toastify';

// const BasicsUserInfo = ({ onNext }) => {
//   const [activeTab, setActiveTab] = useState(""); // To capture gender
//   const [birthday, setBirthday] = useState("");
//   const [zipCode, setZipCode] = useState("");

//   const handleTab = (e) => {
//     setActiveTab(e.currentTarget.id); // Set gender value
//   };

//   const isButtonDisabled = !activeTab || !birthday || !zipCode; // Disable button if fields are empty

//   // const handleNext = () => {
//   //   const data = {
//   //     gender: activeTab,
//   //     dob: birthday,
//   //     zipCode: zipCode
//   //   };

   
//   //   onNext(data, "primaryCareConfirmation"); // Replace "primaryCareConfirmation" with the next form step
//   // };
//   const handleNext = () => {
//     const today = new Date();
//     const birthDate = new Date(birthday);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
  
//     // Adjust age if the birthday hasn't occurred yet this year
//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
  
//     if (age >= 18) {
//       const data = {
//         gender: activeTab,
//         dob: birthday,
//         zipCode: zipCode
//       };
      
//       onNext(data, "primaryCareConfirmation"); // Replace "primaryCareConfirmation" with the next form step
//     } else {
//       toast("You must be at least 18 years old to proceed.");
//     }
//   };

//   return (
//     <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
//       <div className="w-full md:w-[500px]">

//         <p>START WITH</p>
//         <h2 className='text-2xl  mb-6 text-primary'>The Basics</h2>
//         <p className='text-zinc-500 my-3'>This information helps your healthcare provider determine if you’re eligible for treatment.</p>

//         <label className='text-lg font-medium'>Sex Assigned at Birth</label>

//         <div className='flex mb-5'>
//           <div
//             onClick={handleTab}
//             id="male"
//             className={`flex-1 text-center border p-2 rounded-l-3xl cursor-pointer ${activeTab === "male" ? "border-2 border-primary font-medium" : ""}`}
//           >
//             Male
//           </div>
//           <div
//             onClick={handleTab}
//             id="female"
//             className={`flex-1 text-center border p-2 rounded-r-3xl cursor-pointer ${activeTab === "female" ? "border-2 border-primary font-medium" : ""}`}
//           >
//             Female
//           </div>
//         </div>

//         <h3 className='text-xl font-medium mb-5'>Basic information</h3>

//         <div className='flex flex-col gap-2'>
//           {/* Birthday Field */}
//           <div className='flex flex-col'>
//             <label className='text-lg font-medium'>Birthday</label>
//             <input
//               type="date"
//               placeholder="Birthday"
//               className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               value={birthday}
//               onChange={(e) => setBirthday(e.target.value)}
//             />
//           </div>

//           {/* Zip Code Field */}
//           <div className='flex flex-col'>
//             <label className='text-lg font-medium'>Postal code</label>
//             <input
//               type="number"
//               placeholder="Postal code"
//               className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               value={zipCode}
//               onChange={(e) => setZipCode(e.target.value)}
//             />
//           </div>

//           {/* Next Button */}
//           <button
//             type="button"
//             className={`mt-6 hover:bg-primary/90  p-3 text-white w-full font-semibold rounded-full ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
//             onClick={handleNext}
//             disabled={isButtonDisabled}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicsUserInfo;



import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const BasicsUserInfo = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState(""); // To capture gender
  const [birthday, setBirthday] = useState(null); // Using Date object for React DatePicker
  const [zipCode, setZipCode] = useState("");

  const handleTab = (e) => {
    setActiveTab(e.currentTarget.id); // Set gender value
  };

  const isButtonDisabled = !activeTab || !birthday || !zipCode; // Disable button if fields are empty

  const handleNext = () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18) {
      const data = {
        gender: activeTab,
        dob: birthday.toLocaleDateString("en-US"), // Format to MM/DD/YYYY
        zipCode: zipCode,
      };

      onNext(data, "primaryCareConfirmation"); // Replace "primaryCareConfirmation" with the next form step
    } else {
      toast("You must be at least 18 years old to proceed.");
    }
  };

  return (
    <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full md:w-[500px]">
        <p>START WITH</p>
        <h2 className="text-2xl mb-6 text-primary">The Basics</h2>
        <p className="text-zinc-500 my-3">
          This information helps your healthcare provider determine if you are eligible for treatment.
        </p>

        <label className="text-lg font-medium">Sex Assigned at Birth</label>
        <div className="flex mb-5">
          <div
            onClick={handleTab}
            id="male"
            className={`flex-1 text-center border p-2 rounded-l-3xl cursor-pointer ${
              activeTab === "male" ? "border-2 border-primary font-medium" : ""
            }`}
          >
            Male
          </div>
          <div
            onClick={handleTab}
            id="female"
            className={`flex-1 text-center border p-2 rounded-r-3xl cursor-pointer ${
              activeTab === "female" ? "border-2 border-primary font-medium" : ""
            }`}
          >
            Female
          </div>
        </div>

        <h3 className="text-xl font-medium mb-5">Basic information</h3>

        <div className="flex flex-col gap-2">
          {/* Birthday Field */}
          <div className="flex flex-col">
            <label className="text-lg font-medium">Birthday</label>
            <DatePicker
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              dateFormat="MM/dd/yyyy" // Display in MM/DD/YYYY format
              maxDate={new Date()} // Prevent future dates
              placeholderText="MM/DD/YYYY"
              className="flex-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Zip Code Field */}
          <div className="flex flex-col">
            <label className="text-lg font-medium">Postal code</label>
            <input
              type="number"
              placeholder="Postal code"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            className={`mt-6 hover:bg-primary/90 p-3 text-white w-full font-semibold rounded-full ${
              isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
            }`}
            onClick={handleNext}
            disabled={isButtonDisabled}
            aria-label="Next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicsUserInfo;
