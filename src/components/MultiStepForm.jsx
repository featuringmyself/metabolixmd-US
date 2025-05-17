import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import FormService from '@/services/API/FormService';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load form components
const PrescriptionQuestion = lazy(() => import('./froms/PrescriptionQuestion'));
const PrescriptionUpload = lazy(() => import('./froms/UploadPriscription'));
const GoalSelectionForm = lazy(() => import('./froms/GoalSelectionForm'));
const UserInfoForm = lazy(() => import('./froms/UserInfoForm'));
const AuthForm = lazy(() => import('./froms/AuthForm'));
const WeightCalculation = lazy(() => import('./froms/WeightCalculation'));
const BasicsUserInfo = lazy(() => import('./froms/BasicsUserInfo'));
const PrimaryCareConfirmation = lazy(() => import('./froms/PrimaryCareConfirmation'));
const HeartDiseaseForm = lazy(() => import('./froms/HeartDiseaseForm'));
const AnyDiseaseForm = lazy(() => import('./froms/AnyDiseaseForm'));
const Type2Diabetes = lazy(() => import('./froms/Type2Diabetes'));
const DiabeticRetinopathy = lazy(() => import('./froms/DiabeticRetinopathy'));
const AnyDisease2Form = lazy(() => import('./froms/AnyDiesease2Form'));
const SearchAndSelectAllergies = lazy(() => import('./froms/SearchAndSelectAllergies'));
const GLP1 = lazy(() => import('./froms/GLP1'));
const AnyMedicationForm = lazy(() => import('./froms/AnyMedicationForm'));
const EthnicityForm = lazy(() => import('./froms/EthnicityForm'));
const LabTestForm = lazy(() => import('./froms/LabTestForm'));
const BeforeWrapUp = lazy(() => import('./froms/BeforeWrapUp'));
const CheckOutForm = lazy(() => import('./froms/CheckOutForm'));
const SuccessPropt = lazy(() => import('./froms/SuccessPropt'));
const LicensedProvider = lazy(() => import('./froms/LicensedProvider'));
const CalendlyForm = lazy(() => import('./froms/CalendlyForm'));
const UploadProfile = lazy(() => import('./froms/UploadProfile'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const MultiStepForm = ({ initialForm }) => {
  const { userId, isSignedIn } = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeForm, setActiveForm] = useState(initialForm || "goalSelection");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");

  // Set isClient on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update authentication state after hydration
  useEffect(() => {
    if (isClient) {
      setIsAuthenticated(!!isSignedIn);
    }
  }, [isClient, isSignedIn]);

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
    describe_yourself: [],
    countryCode: "",
    phoneNumber: "",
  });

  // Form order definition moved to the top for better reference
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
    "calendly",
    "checkout",
    "licensedProvider",
  ];

  const handleNextForm = (nextForm, data) => {
    setFormData({ ...formData, ...data });
    
    // If moving to calendly and not authenticated, show auth form
    if (activeForm === "beforeWrapUp" && !isAuthenticated && (!nextForm || nextForm === "uploadProfile")) {
      setActiveForm("auth");
      return;
    }
    
    // If coming from auth form, update authentication status
    if (activeForm === "auth") {
      setIsAuthenticated(true);
      // After authentication, continue to the form that was interrupted
      setActiveForm("uploadProfile");
      return;
    }
    
    setActiveForm(nextForm || getNextFormKey(activeForm));
  };

  const handlePrevForm = () => {
    // Get the previous form based on the form order
    const currentIndex = formOrder.indexOf(activeForm);
    if (currentIndex > 0) {
      setActiveForm(formOrder[currentIndex - 1]);
      // No need to update formData here as it's already preserved in state
    }
  };

  const getNextFormKey = (currentForm) => {
    const currentIndex = formOrder.indexOf(currentForm);
    return formOrder[currentIndex + 1] || "checkout";
  };

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Use the FormService to submit both form data and profile picture
      const { dataResponse, imageResponse } = await FormService.submitFormWithProfile(formData, img);
      // console.log(dataResponse);
      // console.log(imageResponse);
      
      setLoading(false)
      if (dataResponse && (imageResponse || !img)) {
        // Store the form data in localStorage for persistence
        localStorage.setItem('user_form_data', JSON.stringify(formData));
        setActiveForm("calendly"); // Navigate to CalendlyForm after successful submission
      }
    } catch (err) {
      setLoading(false)
      toast(err.message || 'Error submitting form data')
    }
  };

  useEffect(() => {
    // Update form state based on URL parameters when route changes
    const params = new URLSearchParams(window.location.search);
    const formParam = params.get('form');
    
    // Handle case-insensitive form names and map to correct form keys
    if (formParam) {
      const formParamLower = formParam.toLowerCase();
      
      // Map URL parameter to form key
      if (formParamLower === 'calendlyform') {
        setActiveForm('calendly');
      } else if (formParamLower === 'checkoutform') {
        setActiveForm('checkout');
      } else if (formOrder.includes(formParam)) {
        setActiveForm(formParam);
      }
    }
  }, [isSignedIn, formData, router.query]);
  
  // Add a listener for URL changes to handle direct navigation to specific forms
  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URLSearchParams(window.location.search);
      const formParam = params.get('form');
      if (formParam) {
        const formParamLower = formParam.toLowerCase();
        if (formParamLower === 'calendlyform') {
          setActiveForm('calendly');
        } else if (formParamLower === 'checkoutform') {
          setActiveForm('checkout');
        } else if (formOrder.includes(formParam)) {
          setActiveForm(formParam);
        }
      }
    };

    // Listen for popstate events (browser back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Calculate progress as a percentage
  const currentStep = formOrder.indexOf(activeForm) + 1;
  const totalSteps = formOrder.length;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Render the active form component with Suspense for lazy loading
  const renderActiveForm = () => {
    return (
      <Suspense fallback={<LoadingFallback />}>
      {activeForm === "uploadPrescription" && (
        <PrescriptionUpload onNext={(data, next) => handleNextForm(next, data)} />
      )}
      {activeForm === "goalSelection" && (
        <GoalSelectionForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        isFirstForm={true}
        initialData={formData.accomplish_with_body_program ? { accomplish_with_body_program: formData.accomplish_with_body_program } : undefined}
        />
      )}
      {activeForm === "userInfo" && (
        <UserInfoForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.height && formData.weight ? { height: formData.height, weight: formData.weight } : undefined}
        />
      )}      {activeForm === "auth" && (
        <AuthForm 
        mode="signup"
        onNext={(data, next) => handleNextForm(next, data)}
        />
      )}
      {activeForm === "weightCalculation" && (
        <WeightCalculation data={formData} onNext={(data, next) => handleNextForm(next, data)} onBack={handlePrevForm} />
      )}
      {activeForm === "basicsUserInfo" && (
        <BasicsUserInfo 
        onNext={(data, next) => handleNextForm(next, data)}
        onBack={handlePrevForm}
        initialData={formData.gender || formData.dob || formData.zipCode ? { gender: formData.gender, dob: formData.dob, zipCode: formData.zipCode } : undefined}
        />
      )}
      {activeForm === "primaryCareConfirmation" && (
        <PrimaryCareConfirmation 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.seen_primary_care_provider !== undefined ? { seen_primary_care_provider: formData.seen_primary_care_provider } : undefined}
        />
      )}
      {activeForm === "heartDisease" && (
        <HeartDiseaseForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.heart_conditions ? { heart_conditions: formData.heart_conditions } : undefined}
        />
      )}
      {activeForm === "anyDisease" && (
        <AnyDiseaseForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.hormone_kidney_liver_condition ? { hormone_kidney_liver_condition: formData.hormone_kidney_liver_condition } : undefined}
        />
      )}
      {activeForm === "type2Diabetes" && (
        <Type2Diabetes 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.type_2_diabetes ? { type_2_diabetes: formData.type_2_diabetes } : undefined}
        />
      )}
      {activeForm === "diabeticRetinopathy" && (
        <DiabeticRetinopathy 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.diabetic ? { diabetic: formData.diabetic } : undefined}
        />
      )}
      {activeForm === "anyDisease2" && (
        <AnyDisease2Form 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.additional_condition ? { additional_condition: formData.additional_condition } : undefined}
        />
      )}
      {activeForm === "searchAndSelectAllergies" && (
        <SearchAndSelectAllergies 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.allergies ? { allergies: formData.allergies } : undefined}
        />
      )}
      {activeForm === "glp1" && (
        <GLP1 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.allergy_GLP_1 !== undefined ? { allergy_GLP_1: formData.allergy_GLP_1 } : undefined}
        />
      )}
      {activeForm === "anyMedication" && (
        <AnyMedicationForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        initialData={formData.medications ? { medications: formData.medications } : undefined}
        onBack={handlePrevForm}
        />
      )}
      {activeForm === "ethnicity" && (
        <EthnicityForm 
        onNext={(data, next) => handleNextForm(next, data)} 
        onBack={handlePrevForm}
        initialData={formData.describe_yourself ? { describe_yourself: formData.describe_yourself } : undefined}
        />
      )}
      {activeForm === "beforeWrapUp" && (
        <BeforeWrapUp 
        onNext={(data, next) => handleNextForm(next, data)}
        onBack={handlePrevForm}
        initialData={formData}
        />
      )}
      {activeForm === "uploadProfile" && (
        <UploadProfile onSubmit={handleSubmit} img={img} setImg={setImg} loading={loading} onNext={(data, next) => handleNextForm(next, data)}/>
      )}
      {activeForm === "calendly" && (
        <CalendlyForm onNext={(data, next) => handleNextForm(next, data)} onBack={handlePrevForm} />
      )}
      {activeForm === "licensedProvider" && (
        <LicensedProvider onNext={(data, next) => router.push('/profile-details')} />
      )}
      {activeForm === "checkout" && (
        <CheckOutForm 
        userdata={formData} 
        onNext={(data, next) => handleNextForm("licensedProvider", data)} 
        />
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
      </Suspense>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="multi-step-form py-5 mt-5 md:py-10 font-tt-hoves bg-[#ecf4f2] min-h-screen flex flex-col justify-center items-center relative"
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-full max-w-4xl flex flex-col items-center justify-evenly min-h-[90vh] py-8 "
        >
          {/* Progress bar positioned below the form title */}
          {formOrder.includes(activeForm) && 
            <div className="w-full mt-4 mb-6 px-5 md:px-0 md:w-[800px] flex gap-2 items-center">
              <div className="h-[5px] border rounded-full bg-[#dae5e3] flex-1">
                <div className="h-full bg-[#539488] rounded-full" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          }
          {renderActiveForm()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MultiStepForm;
