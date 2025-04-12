import React, { useEffect } from 'react';

/**
 * CalendlyForm Component
 * 
 * A form component that integrates the Calendly scheduling widget for booking consultations.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next form
 * @param {Function} props.onBack - Callback function to go back to the previous form
 */
const CalendlyForm = ({ onNext, onBack }) => {
  // Load Calendly widget script when component mounts
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Add script to document
    document.body.appendChild(script);
    
    // Clean up function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle continue button click
  const handleContinue = () => {
    // Move to the next form (checkout)
    onNext({}, "checkout");
  };

  return (
    <div className="w-full p-5 md:p-6 lg:p-8 mx-auto max-w-screen-md">
      <div className="w-full max-w-[800px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-center font-semibold">
          Schedule Your Consultation
        </h2>
        <p className="my-3 md:my-5 font-semibold text-zinc-500 text-sm md:text-base text-center">
          Please select a convenient time for your weight loss consultation
        </p>
        
        {/* Calendly inline widget */}
        <div 
          className="calendly-inline-widget mb-6" 
          data-url="https://calendly.com/ashleydonaldson-metabolixmd/new-weight-loss-consult?primary_color=365d56" 
          style={{ minWidth: '320px', height: '700px' }}
        ></div>
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full mt-6 md:mt-8">
          <button
            type="button"
            className="w-full sm:flex-1 py-3 hover:bg-gray-200 rounded-full text-gray-700 font-semibold border border-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md"
            onClick={onBack}
            aria-label="Back"
          >
            Back
          </button>
          <button
            type="button"
            className="w-full sm:flex-1 py-3 text-white font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-primary hover:bg-primary/90 transform hover:scale-[1.02]"
            onClick={handleContinue}
            aria-label="Continue"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendlyForm;