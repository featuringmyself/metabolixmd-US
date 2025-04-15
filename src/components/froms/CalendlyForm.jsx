import React, { useEffect } from 'react';

const CalendlyForm = ({ onNext }) => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Add event listener for Calendly scheduling
    window.addEventListener('message', function(e) {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        // When event is scheduled, navigate to checkout
        onNext({}, "checkout");
      }
    });

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
      window.removeEventListener('message', function(e) {
        if (e.data.event && e.data.event === 'calendly.event_scheduled') {
          onNext({}, "checkout");
        }
      });
    };
  }, [onNext]);

  return (
    <div className="w-full p-4 sm:p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full max-w-full text-center sm:max-w-[450px] md:w-[500px]">
        <h1 className="text-zinc-700 font-semibold text-3xl mb-4">
          Schedule Your Consultation
        </h1>
        <p className="text-lg font-normal mb-6">
          Please select a convenient time for your consultation with our healthcare provider.
        </p>
        
        <div 
          className="calendly-inline-widget bg-white rounded-xl p-4" 
          data-url="https://calendly.com/ashleydonaldson-metabolixmd/new-weight-loss-consult?primary_color=365d56" 
          style={{ minWidth: '320px', height: '700px' }}
        />

        <button
          type="button"
          className="mt-6 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90"
          onClick={() => onNext({}, "checkout")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CalendlyForm;
