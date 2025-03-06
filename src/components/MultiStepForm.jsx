import React, { useState, useEffect } from 'react';
import PrescriptionQuestion from './froms/PrescriptionQuestion';
import PrescriptionUpload from './froms/UploadPriscription';
import GoalSelectionForm from './froms/GoalSelectionForm';
import UserInfoForm from './froms/UserInfoForm';
import WeightCalculation from './froms/WeightCalculation';
import BasicsUserInfo from './froms/BasicsUserInfo';
import PrimaryCareConfirmation from './froms/PrimaryCareConfirmation';
import HeartDiseaseForm from './froms/HeartDiseaseForm';
import AnyDiseaseForm from './froms/AnyDieseaseForm';
import Type2Diabetes from './froms/Type2Diabetes';
import DiabeticRetinopathy from './froms/DiabeticRetinopathy';
import AnyDisease2Form from './froms/AnyDiesease2Form';
import SearchAndSelectAllergies from './froms/SearchAndSelectAllergies';
import GLP1 from './froms/GLP1';
import AnyMedicationForm from './froms/AnyMedicationForm';
import EthnicityForm from './froms/EthinicityForm';
import LabTestForm from './froms/LabTestForm';
import BeforeWrapUp from './froms/BeforeWrapUp';
import CheckOutForm from './froms/CheckOutForm';
import SuccessPropt from './froms/SuccessPropt';
import { patchMethod, patchWithFileMethod } from '@/services/API/ApiMethod';
import LicensedProvider from './froms/LicensedProvider';
import UploadProfile from './froms/UploadProfile';
import { toast } from 'react-toastify';

const MultiStepForm = () => {
  const [activeForm, setActiveForm] = useState("goalSelection");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState("")
  const [formData, setFormData] = useState({
    accomplish_with_body_program: "",
    height: { feet: 0, inch: 0 },
    weight: 0,
    gender: "",
    dob: null,
    zipCode: "",
    seen_primary_care_provider: false,
    heart_condition: "",
    hormone_kidney_liver_condition: "",
    type_2_diabetes: "",
    diabetic: "",
    additional_condition: [],
    allergies: [],
    allergy_GLP_1: false,
    medications: [],
    describe_yourself: []
  });

  const handleNextForm = (nextForm, data) => {
    setFormData({ ...formData, ...data });
    setActiveForm(nextForm || getNextFormKey(activeForm));
  };

  const getNextFormKey = (currentForm) => {
    const formOrder = [
      // "prescriptionQuestion",
      "goalSelection",
      "userInfo",
      "weightCalculation",
      "basicsUserInfo",
      "primaryCareConfirmation",
      "heartDisease",
      "anyDisease",
      "type2Diabetes",
      "diabeticRetinopathy",
      "anyDisease2",
      "searchAndSelectAllergies",
      "glp1",
      "anyMedication",
      "ethnicity",
      "beforeWrapUp",
      "uploadProfile",
      "licesedProvider",
      "checkout"
    ];
    const currentIndex = formOrder.indexOf(currentForm);
    return formOrder[currentIndex + 1] || "checkout";
  };

  const handleSubmit = async () => {
    let payload = {
      detail: formData
    }
    setLoading(true)
    console.log(payload)
    const formData2 = new FormData();
    formData2.append("profilePic", img);
   
   try{
    const res1 = await patchMethod("/users/updateDetails", payload)
    const res = await patchWithFileMethod("/users/updateDetails", formData2)
    setLoading(false)
    if (res && res1) {
      handleNextForm("licesedProvider", {})
    }
   }
   catch(err){
    toast(err.message)
   }

  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate progress as a percentage
  const formOrder = [
    // "prescriptionQuestion",
    "goalSelection",
    "userInfo",
    "weightCalculation",
    "basicsUserInfo",
    "primaryCareConfirmation",
    "heartDisease",
    "anyDisease",
    "type2Diabetes",
    "diabeticRetinopathy",
    "anyDisease2",
    "searchAndSelectAllergies",
    "glp1",
    "anyMedication",
    "ethnicity",
    "beforeWrapUp",
    "uploadProfile",
    "licesedProvider",
    "checkout"
  ];
  const currentStep = formOrder.indexOf(activeForm) + 1;
  const totalSteps = formOrder.length;
  const progressPercentage = (currentStep / totalSteps) * 100;

  if (!isClient) {
    return null;
  }

  return (
    <div className="multi-step-form py-10 mt-20 md:py-5 font-tt-hoves bg-[#d3d2cc]  min-h-screen flex flex-col justify-center items-center">

      {/* Stepper */}
      {
        formOrder.includes(activeForm) &&
        <div className="w-full p-5 md:p-0 md:w-[500px] flex gap-2 items-center">
          {/* Dynamic width based on progress */}
          <div className="h-[15px] border rounded-full bg-white flex-1">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <img src="images/27.webp" className="w-[70px]" alt="Step indicator" />
        </div>
      }

      {/* {activeForm === "prescriptionQuestion" && (
        <PrescriptionQuestion onNext={(data, next) => handleNextForm(next, data)} />
      )} */}
      {activeForm === "uploadPrescription" && (
        <PrescriptionUpload onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "goalSelection" && (
        <GoalSelectionForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "userInfo" && (
        <UserInfoForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "weightCalculation" && (
        <WeightCalculation data={formData} onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "basicsUserInfo" && (
        <BasicsUserInfo onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "primaryCareConfirmation" && (
        <PrimaryCareConfirmation onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "heartDisease" && (
        <HeartDiseaseForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "anyDisease" && (
        <AnyDiseaseForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "type2Diabetes" && (
        <Type2Diabetes onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "diabeticRetinopathy" && (
        <DiabeticRetinopathy onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "anyDisease2" && (
        <AnyDisease2Form onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "searchAndSelectAllergies" && (
        <SearchAndSelectAllergies onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "glp1" && (
        <GLP1 onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "anyMedication" && (
        <AnyMedicationForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "ethnicity" && (
        <EthnicityForm onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {/* {activeForm === "labTest" && (
        <LabTestForm onNext={(data, next) => handleNextForm(next, data)} />
      )} */}
      {activeForm === "beforeWrapUp" && (
        <BeforeWrapUp onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "uploadProfile" && (
        <UploadProfile onSubmit={handleSubmit} img={img} setImg={setImg} loading={loading} onNext={(data, next) => handleNextForm(next, data)}/>
      )}
      {activeForm === "licesedProvider" && (
        <LicensedProvider onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "checkout" && (
        <CheckOutForm userdata={formData} onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "success" && (
        <SuccessPropt type="1" />
      )}
      {activeForm === "success2" && (
        <SuccessPropt type="2" />
      )}
      {activeForm === "lessbmi" && (
        <SuccessPropt type="3" />
      )}

      {activeForm === "stopProcess" && (
        <SuccessPropt type="4" />
      )}
     
    </div>
  );
};

export default MultiStepForm;
