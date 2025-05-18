// filepath: /Users/rudra/Desktop/metabolixmd/frontend/src/components/froms/DrChronoForm.jsx

import React, { useEffect, useState } from 'react';
import { postMethod } from '@/services/API/ApiMethod';
import { toast } from 'react-toastify';
import { DrchronoClient } from 'drchrono';

const DrChronoForm = ({ onNext, onBack }) => {
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drchronoClient, setDrchronoClient] = useState(null);

  useEffect(() => {
    // Initialize DrChrono client
    const client = new DrchronoClient({
      clientId: process.env.NEXT_PUBLIC_DRCHRONO_CLIENT_ID,
      redirectUri: process.env.NEXT_PUBLIC_DRCHRONO_REDIRECT_URI
    });
    setDrchronoClient(client);

    // Fetch available appointment slots from DrChrono
    const fetchAvailableSlots = async () => {
      try {
        const response = await client.appointments.list({
          doctor: process.env.NEXT_PUBLIC_DRCHRONO_DOCTOR_ID,
          date_range: '30', // Next 30 days
          status: 'open'
        });
        
        setAvailableSlots(response.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointment slots:', error);
        toast.error('Failed to load available appointment slots');
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();

    return () => {
      // Cleanup
      setAvailableSlots([]);
      setSelectedDate(null);
    };
  }, []);

  const handleSlotSelect = async (slot) => {
    if (!drchronoClient) return;

    try {
      const appointment = await drchronoClient.appointments.create({
        doctor: process.env.NEXT_PUBLIC_DRCHRONO_DOCTOR_ID,
        scheduled_time: slot.scheduled_time,
        duration: 30, // 30 minute consultation
        exam_room: 1,
        reason: "Weight Loss Consultation"
      });

      setMeetingDetails({
        meetLink: appointment.appointment_link,
        appointmentId: appointment.id,
        scheduledTime: appointment.scheduled_time
      });
      setIsMeetingScheduled(true);
    } catch (error) {
      toast.error("Failed to schedule appointment. Please try again.");
      console.error("Error scheduling appointment:", error);
    }
  };

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
        appointmentId: meetingDetails.appointmentId,
        scheduledTime: meetingDetails.scheduledTime,
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
        
        <div className="bg-white rounded-xl p-4" style={{ minWidth: '320px', height: '700px', overflowY: 'auto' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No available appointment slots found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableSlots.map((slot, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    meetingDetails?.appointmentId === slot.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{new Date(slot.scheduled_time).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(slot.scheduled_time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      30 min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            className={`p-3 text-white w-full text-center py-3 font-semibold rounded-full ${
              isMeetingScheduled 
                ? 'bg-primary hover:bg-primary/90 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!isMeetingScheduled}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrChronoForm;
