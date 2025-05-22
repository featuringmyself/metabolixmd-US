import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../AnimatedButton";
import AnimatedCheckbox from "../AnimatedCheckbox";
import { toast } from "react-toastify";
import FormNavigationButtons from './FormNavigationButtons';

const HeartDiseaseForm = ({ onNext, onBack, initialData }) => {
  const [selectedGoals, setSelectedGoals] = useState(() => {
    // Use initialData if provided, otherwise check localStorage
    if (initialData?.heart_conditions) {
      return initialData.heart_conditions;
    }
    const savedGoals = localStorage.getItem('HeartDiseaseForm_selectedGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.1 
      } 
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500 } }
  };
  
  // Pulse animation for selection feedback
  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: { duration: 0.3 }
  };
  
  // Staggered entrance for checkboxes
  const staggeredList = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const checkboxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 400, damping: 25 } 
    }
  };
  
  // Heart condition options
  const goals = [
    "Atrial fibrillation or flutter",
    "Tachycardia (episodes of rapid heart rate)",
    "Heart failure",
    "Heart disease, stroke, or peripheral vascular disease",
    "Prolonged QT interval",
    "Other heart rhythm issues or ECG abnormalities",
    "Hypertension (high blood pressure)",
    "Hyperlipidemia (high cholesterol)",
    "Hypertriglyceridemia (high triglycerides)",
    "Not diagnosed with any",
  ];

  // Handle checkbox change
  const handleCheckboxChange = (goal) => {
    // Add haptic feedback if available
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50); // Subtle vibration for tactile feedback
    }
    
    if (goal === "Not diagnosed with any") {
      if (selectedGoals.includes(goal)) {
        setSelectedGoals([]);
        localStorage.removeItem('HeartDiseaseForm_selectedGoals');
      } else {
        // Animation effect for selecting "None" option
        setSelectedGoals([goal]);
        localStorage.setItem('HeartDiseaseForm_selectedGoals', JSON.stringify([goal]));
      }
    } else {
      if (selectedGoals.includes("Not diagnosed with any")) return;
      
      setSelectedGoals((prev) => {
        const newGoals = prev.includes(goal) 
          ? prev.filter((g) => g !== goal)
          : [...prev, goal];
        localStorage.setItem('HeartDiseaseForm_selectedGoals', JSON.stringify(newGoals));
        return newGoals;
      });
    }
  };

  const isButtonDisabled = selectedGoals.length === 0;

  // Handle form submission
  const handleNext = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Prepare data to be sent to the backend
      const data = {
        heart_conditions: selectedGoals
      };
      
      // Pass the data to the parent component with the next form name
      onNext(data, "anyDisease");
    } catch (error) {
      console.error("Error submitting heart disease data:", error);
      toast.error("Failed to submit heart condition data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-[800px] mx-auto">
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl mb-12 md:mb-6 font-semibold text-center"
          variants={itemVariants}
        >
          Do you currently have, or have you ever been diagnosed with any of the following heart or heart-related conditions?
        </motion.h2>
        <motion.p 
          className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base"
          variants={itemVariants}
        >
          Select all that apply
        </motion.p>
        
        {/* Form with heart condition checkboxes */}
        <form>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
            variants={staggeredList}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  variants={checkboxVariants}
                  animate={selectedGoals.includes(goal) ? ["visible", pulseAnimation] : "visible"}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <AnimatedCheckbox
                    checked={selectedGoals.includes(goal)}
                    onChange={() => handleCheckboxChange(goal)}
                    label={goal}
                    className={selectedGoals.includes(goal) 
                      ? 'bg-[#365e56] text-white border-[#365e56] shadow-sm' 
                      : 'bg-white hover:bg-gray-50 hover:border-[#6d8a84]'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <FormNavigationButtons
            onBack={onBack}
            onContinue={handleNext}
            isContinueDisabled={isButtonDisabled}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default HeartDiseaseForm;
