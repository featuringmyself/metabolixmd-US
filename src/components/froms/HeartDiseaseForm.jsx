import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../AnimatedButton";
import AnimatedCheckbox from "../AnimatedCheckbox";

const HeartDiseaseForm = ({ onNext, onBack }) => {
  const [selectedGoals, setSelectedGoals] = useState(() => {
    const savedGoals = localStorage.getItem('HeartDiseaseForm_selectedGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  
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
    "Not diagnosed with any",
    "Atrial fibrillation or flutter",
    "Tachycardia (episodes of rapid heart rate)",
    "Heart failure",
    "Heart disease, stroke, or peripheral vascular disease",
    "Prolonged QT interval",
    "Other heart rhythm issues or ECG abnormalities",
    "Hypertension (high blood pressure)",
    "Hyperlipidemia (high cholesterol)",
    "Hypertriglyceridemia (high triglycerides)",
  ];

  // Handle checkbox change
  // Handle checkbox change with animation feedback
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
  const handleNext = () => {
    const data = {
      heart_conditions: selectedGoals
    };
    onNext(data); // Pass the selected heart conditions to the parent component
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

          {/* Button Container */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full mt-6 md:mt-8"
            variants={itemVariants}
          >
            {/* Back Button */}
            <AnimatedButton
              type="secondary"
              onClick={onBack}
              ariaLabel="Back"
              className="w-full sm:flex-1"
            >
              Back
            </AnimatedButton>
            
            {/* Continue button */}
            <AnimatedButton
              type="primary"
              disabled={isButtonDisabled}
              onClick={handleNext}
              ariaLabel="Continue"
              className="w-full sm:flex-1"
            >
              Continue
            </AnimatedButton>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default HeartDiseaseForm;
