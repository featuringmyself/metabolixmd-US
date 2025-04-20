import React, { useEffect, useState } from 'react';
import { postMethod } from '@/services/API/ApiMethod';
import { toast } from 'react-toastify';

const CalendlyForm = ({ onNext, onBack }) => {
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Add event listener for Calendly scheduling
    window.addEventListener('message', function(e) {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        // When event is scheduled, store the meeting details
        console.log('Full Calendly event data:', e.data);
        
        // Extract the event data from the correct path
        const eventData = e.data.payload;
        console.log('Event data:', eventData);
        const details = {
          meetLink: eventData.event.uri,
        };
        
        console.log('Extracted meeting details:', details);
        setMeetingDetails(details);
        setIsMeetingScheduled(true);
      }
    });

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
      window.removeEventListener('message', function(e) {
        if (e.data.event && e.data.event === 'calendly.event_scheduled') {
          const details = {
            meetLink: e.data.payload.event.uri,
          };
          setMeetingDetails(details);
          setIsMeetingScheduled(true);
        }
      });
    };
  }, []);

  const handleContinue = async () => {
    if (!meetingDetails) {
      toast.error("Please schedule a meeting first");
      return;
    }

    try {
      // Create a new meeting using the new endpoint
      console.log('Sending meeting details:', meetingDetails);
      const meetingRes = await postMethod("/v1/meeting", {
        meetLink: meetingDetails.meetLink,
        type: "consultation"
      });
      console.log('Meeting response:', meetingRes);
      if (meetingRes?.data) {
        onNext({}, "checkout");
      }
    } catch (error) {
      toast.error("Failed to save meeting details. Please try again.");
      console.error("Error saving meeting details:", error);
    }
  };

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

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="p-3 text-gray-700 w-full text-center py-3 font-semibold rounded-full border border-gray-300 hover:bg-gray-50"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className={`p-3 text-white w-full text-center py-3 font-semibold rounded-full ${
              isMeetingScheduled 
                ? 'bg-primary hover:bg-primary/90 cursor-pointer' 
                : 'bg-gray-400 hover:bg-primary/90 cursor-pointer'
            }`}
            onClick={() => {
              if (!isMeetingScheduled) {
                console.warn("Development mode: Proceeding without scheduling a meeting.");
                onNext({}, "checkout");
              } else {
                handleContinue();
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendlyForm;
