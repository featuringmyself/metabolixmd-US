import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { LuCalendarClock } from "react-icons/lu";

const SuccessPropt = ({ type, orderData }) => {
  const router = useRouter();
  if (type == "3") {
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-primary font-semibold text-3xl mb-6">
            Thank you for reaching out to us.
          </h1>

          <div className="space-y-4">
            <p className="text-lg font-normal text-gray-700">
              We regret to inform you that, based on your current BMI, you do
              not meet the eligibility criteria for GLP-1 medication.
            </p>
            <p className="text-lg font-normal text-gray-700">
              We encourage you to continue prioritizing your health and
              well-being. If you have any further questions or need additional
              guidance, please feel free to contact us.
            </p>
            <p className="text-lg font-normal text-gray-700">
              Wishing you the best of health, <br />
              <b className="text-primary">The MetabolixMD Team</b>
            </p>
          </div>

          <div
            onClick={() => router.push("/")}
            className="mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
          >
            Continue
          </div>
        </div>
      </div>
    );
  } else if (type == "4") {
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-primary font-semibold text-3xl mb-6">
            Thank you for reaching out to us.
          </h1>

          <div className="space-y-4">
            <p className="text-lg font-normal text-gray-700">
              We regret to inform you that, based on your current health
              condition, you do not meet the eligibility criteria for GLP-1
              medication.
            </p>
            <p className="text-lg font-normal text-gray-700">
              We encourage you to continue prioritizing your health and
              well-being. If you have any further questions or need additional
              guidance, please feel free to contact us.
            </p>
            <p className="text-lg font-normal text-gray-700">
              Wishing you the best of health, <br />
              <b className="text-primary">The MetabolixMD Team</b>
            </p>
          </div>

          <div
            onClick={() => router.push("/")}
            className="mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
          >
            Continue
          </div>
        </div>
      </div>
    );
  } else if (type === "order_confirmed" && orderData) {
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-primary font-semibold text-3xl mb-6">
            Order Confirmed!
          </h1>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-normal text-gray-700">
                <span className="font-semibold">Order ID:</span> {orderData.orderId}
              </p>
              <p className="text-lg font-normal text-gray-700">
                <span className="font-semibold">Delivery Address:</span> {orderData.address}
              </p>
              <p className="text-lg font-normal text-gray-700">
                <span className="font-semibold">Estimated Delivery:</span> {orderData.estimatedDelivery}
              </p>
            </div>
            <p className="text-lg font-normal text-gray-700">
              Your order has been successfully confirmed. We will keep you updated on the delivery status.
            </p>
            <p className="text-lg font-normal text-gray-700">
              Thank you for choosing MetabolixMD! <br />
              <b className="text-primary">The MetabolixMD Team</b>
            </p>
          </div>

          <div
            onClick={() => router.push("/")}
            className="mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
          >
            Continue
          </div>
        </div>
      </div>
    );
  } else if (type === "payment_required") {
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-primary font-semibold text-3xl mb-6">
            Payment Required
          </h1>

          <div className="space-y-4">
            <p className="text-lg font-normal text-gray-700">
              Your order is pending payment. Please complete the payment to confirm your order.
            </p>
            <p className="text-lg font-normal text-gray-700">
              You can make the payment through our secure payment gateway.
            </p>
            <p className="text-lg font-normal text-gray-700">
              If you have any questions, please contact our support team.
            </p>
          </div>

          <div
            onClick={() => router.push("/payment")}
            className="mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
          >
            Proceed to Payment
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
        <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          {type === "2" ? (
            <div className="flex flex-col items-center text-center space-y-10">
              <LuCalendarClock  className="w-20 h-20 text-gray-600" />
              <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-zinc-700">
                Your provider is reviewing your health records and will update
                you soon
              </h1>
            </div>
          ) : (
            <div className="space-y-4">
              {type == "1" && (
                <h1 className="text-primary font-semibold text-3xl mb-6">
                  Thank You for Uploading Your Prescription!
                </h1>
              )}
              <p className="text-lg font-normal text-gray-700">
                We have received your submission, and our team is reviewing it.
                We will get back to you shortly with the next steps.
              </p>
              <p className="text-lg font-normal text-gray-700">
                If you have any further questions in the meantime, feel free to
                reach out to us.
              </p>
              <p className="text-lg font-normal text-gray-700">
                Stay healthy, <br />
                <b className="text-primary">MetabolixMD Team</b>
              </p>
            </div>
          )}

          {type === "2" ? (
            <div className="flex justify-center items-center my-10 mt-20">
              <div
                onClick={() => router.push("/contact-us")}
                className="px-6 py-3 text-white text-center font-semibold rounded-full bg-[#365D56] hover:bg-emerald-950 transition-colors duration-300 cursor-pointer shadow-md"
              >
                Contact Provider
              </div>
            </div>
          ) : (
            <div
              onClick={() => router.push("/")}
              className="mt-8 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
            >
              Continue
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default SuccessPropt;
