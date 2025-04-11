import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { IoMale } from "react-icons/io5";
import { PiGenderFemaleBold } from "react-icons/pi";

const BasicsUserInfo = ({ onNext, onBack }) => {
  // Initialize state from localStorage if available
  const [activeTab, setActiveTab] = useState(() => {
    const savedGender = localStorage.getItem('BasicsUserInfo_gender');
    return savedGender || "";
  });
  
  const [birthday, setBirthday] = useState(() => {
    const savedBirthday = localStorage.getItem('BasicsUserInfo_birthday');
    return savedBirthday ? new Date(savedBirthday) : null;
  });
  
  const [zipCode, setZipCode] = useState(() => {
    const savedZipCode = localStorage.getItem('BasicsUserInfo_zipCode');
    return savedZipCode || "";
  });

  const handleTab = (e) => {
    const gender = e.currentTarget.id;
    setActiveTab(gender);
    localStorage.setItem('BasicsUserInfo_gender', gender);
  };

  const isButtonDisabled = !activeTab || !birthday || !zipCode; // Disable button if fields are empty

  const handleNext = () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age >= 18) {
      const data = {
        gender: activeTab,
        dob: birthday.toLocaleDateString("en-US"), // Format to MM/DD/YYYY
        zipCode: zipCode,
      };

      // Store the complete form data in localStorage
      localStorage.setItem('BasicsUserInfo_data', JSON.stringify(data));
      
      onNext(data, "primaryCareConfirmation"); // Replace "primaryCareConfirmation" with the next form step
    } else {
      toast("You must be at least 18 years old to proceed.");
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-0 md:max-w-3xl mx-auto">
      <div className="w-full flex items-center flex-col">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold my-4 md:my-6 text-zinc-700 text-center">
          Start with the basics
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 my-2 md:my-3 text-center px-2 sm:px-4 md:px-0">
          This information helps your healthcare provider determine if you are
          eligible for treatment.
        </p>

        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mt-4 sm:mt-6 md:mt-10 w-full max-w-xl">
          <label className="text-base sm:text-lg font-medium">Sex Assigned at Birth</label>
          <div className="flex flex-col sm:flex-row mb-3 sm:mb-5 p-2 my-3 sm:my-5 gap-2 sm:gap-3 bg-[#ebf4f1] rounded-lg sm:rounded-full">
            <div
              onClick={handleTab}
              id="male"
              className={`flex items-center border py-2 px-3 sm:px-6 md:px-10 lg:px-16 rounded-lg sm:rounded-3xl cursor-pointer w-full sm:w-auto ${
                activeTab === "male"
                  ? "bg-primary border-1 border-primary text-white font-medium"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center justify-center w-full">
                <IoMale className="text-primary bg-white text-2xl sm:text-3xl md:text-4xl p-1 sm:p-2 rounded-full mr-2"/>
                <span className="flex-grow text-center">Male</span>
              </div>
            </div>
            <div
              onClick={handleTab}
              id="female"
              className={`flex items-center py-2 px-3 sm:px-6 md:px-10 lg:px-16 rounded-lg sm:rounded-3xl cursor-pointer w-full sm:w-auto ${
                activeTab === "female"
                  ? "bg-primary text-white font-medium"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center justify-center w-full">
                <PiGenderFemaleBold className="text-primary bg-white text-2xl sm:text-3xl md:text-4xl p-1 sm:p-2 rounded-full mr-2"/>
                <span className="flex-grow text-center">Female</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-medium mt-8 sm:mt-10 md:mt-14 mb-2 sm:mb-3">Basic information</h3>

          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 md:gap-10">
            {/* Birthday Field */}
            <div className="flex flex-col w-full sm:w-1/2">
              <DatePicker
                selected={birthday}
                onChange={(date) => {
                  setBirthday(date);
                  localStorage.setItem('BasicsUserInfo_birthday', date.toISOString());
                }}
                dateFormat="MM/dd/yyyy" // Display in MM/DD/YYYY format
                maxDate={new Date()} // Prevent future dates
                placeholderText="Birthday (MM/DD/YYYY)"
                className="flex-1 py-2 sm:py-3 px-4 sm:px-7 w-full border rounded-xl sm:rounded-2xl bg-primary-50"
              />
            </div>

            {/* Zip Code Field */}
            <div className="flex flex-col w-full sm:w-1/2">
              <input
                type="number"
                placeholder="Postal code"
                className="flex-1 py-2 sm:py-3 px-4 sm:px-7 w-full border rounded-xl sm:rounded-2xl bg-primary-50"
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value;
                  setZipCode(value);
                  localStorage.setItem('BasicsUserInfo_zipCode', value);
                }}
              />
            </div>
          </div>

        </div>
          {/* Next Button */}
          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-xl">
            <button
              type="button"
              className="flex-1 px-4 sm:px-8 py-2 sm:py-3 border border-primary text-primary hover:bg-primary/10 font-semibold rounded-full text-sm sm:text-base"
              onClick={onBack}
              aria-label="Back"
            >
              Back
            </button>
            <button
              type="button"
              className={`flex-1 px-4 sm:px-12 py-2 sm:py-3 hover:bg-primary/90 text-white font-semibold rounded-full text-sm sm:text-base ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary"
              }`}
              disabled={isButtonDisabled}
              onClick={handleNext}
              aria-label="Continue"
            >
              Continue
            </button>
          </div>
      </div>
    </div>
  );
};

export default BasicsUserInfo;
