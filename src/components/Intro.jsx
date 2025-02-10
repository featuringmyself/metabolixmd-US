import React from 'react';

const Introduction = () => {
  return (
    <div className="bg-white text-gray-800 p-5 mt-20 rounded-lg mx-3 mb-5">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary uppercase mb-5">About Us</h1>
      <p className="text-lg mb-6">
        Your trusted partner in weight loss and wellness. We are dedicated to helping busy
        professionals achieve health goals through personalized guidance and cutting-edge treatments.
      </p>
      
      <p className="text-lg mb-6">
        At MetabolixMD, we are committed to excellence in every aspect of our care. That's why we
        have partnered with top-notch compounding pharmacies to offer the best GLP-1 and GLP-1/GIP
        agonists. Our treatments are:
      </p>
      
      <ul className="list-disc list-inside mb-6">
        <li>
          Compounded GLP-1s and GLP-1/GIP are not FDA approved. This means the agency does not review
          compounded drugs for safety, effectiveness, or quality before they are marketed.
        </li>
        <li>Sourced from reputable manufacturers with a proven track record of quality and safety</li>
        <li>Backed by rigorous scientific research and testing</li>
      </ul>
      
      <p className="text-lg mb-6">
        Our team of experts, led by experienced healthcare professionals, will work closely with you
        to develop a customized weight loss plan that suits your unique needs and lifestyle. With
        MetabolixMD, you can expect:
      </p>
      
      <ul className="list-disc list-inside mb-6">
        <li>Personalized attention and support</li>
        <li>Access to the latest, evidence-based treatments</li>
        <li>A comprehensive approach to weight loss and wellness</li>
      </ul>
      
      <p className="text-lg mb-6">
        Join us on your journey to a healthier, happier you. Learn more about our services and
        treatments, and schedule a consultation today!
      </p>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-4">This introduction highlights:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>MetabolixMD's commitment to excellence and personalized care</li>
        <li>Partnerships with top-notch compounding pharmacies</li>
        <li>Expert team and comprehensive approach</li>
        <li>Emphasis on evidence-based care and latest treatments</li>
      </ul>
    </div>
  );
};

export default Introduction;
