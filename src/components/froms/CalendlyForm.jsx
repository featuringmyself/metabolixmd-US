import React from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

const fetchEventDetails = async (eventUri) => {
  try {
    const response = await fetch(eventUri, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log("Event Start time: ", data.resource.start_time);
    console.log("Event End time: ", data.resource.end_time);
    
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
};

const CalendlyForm = ({ onNext, onBack }) => {
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      const eventUri = e.data.payload.event.uri;
      const inviteUri = e.data.payload.invitee.uri;
      console.log(eventUri, inviteUri);
      fetchEventDetails(eventUri);
    }
  });

  return (
    <div className="w-full p-4 sm:p-5 md:p-0 md:max-w-fit mx-auto">
      <div className="w-full max-w-full text-center sm:max-w-[450px] md:w-[500px]">
        <h1 className="text-zinc-700 font-semibold text-3xl mb-4">
          Schedule Your Consultation
        </h1>
        <p className="text-lg font-normal mb-6">
          Please select a convenient time for your consultation with our healthcare provider.
        </p>

        <div className="bg-white rounded-xl p-4">
          <InlineWidget
            url="https://calendly.com/ashleydonaldson-metabolixmd/new-weight-loss-consult"
            styles={{ minWidth: '320px', height: '700px' }}
            pageSettings={{
              primaryColor: "#365d56",
              hideEventTypeDetails: true,
              hideLandingPageDetails: true,
            }}
          />
        </div>

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
            className="p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => onNext({}, "checkout")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendlyForm;
