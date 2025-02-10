import React, { useState } from "react";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={toggleFaq}
        className="w-full gap-2 text-primary text-left  flex justify-between items-center text-base  md:text-lg   focus:outline-none"
      >
        <span>{question}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqList = () => {
  const faqs = [
    {
      question: "What are GLP-1 and GLP-1/GIP agonists used for?",
      answer: "GLP-1 and GLP-1/GIP agonists are primarily used to treat type 2 diabetes, but they are also effective in promoting weight loss by controlling appetite and blood sugar levels.",
    },
    {
      question: "How do GLP-1 and GLP-1/GIP agonists help with weight loss?",
      answer: "They work by slowing down digestion, reducing appetite, and promoting a sense of fullness, which can lead to lower calorie intake and gradual weight loss.",
    },
    {
      question: "Are GLP-1 and GLP-1/GIP agonists safe for weight loss?",
      answer: "These medications are generally considered safe when prescribed by a healthcare provider, but side effects like nausea, vomiting, or digestive discomfort can occur.",
    },
    {
      question: "How much weight can I lose with GLP-1 and GLP-1/GIP agonists?",
      answer: "Weight loss varies, but clinical trials have shown that patients can lose between 20-25% of their body weight over 72 weeks with consistent use and lifestyle changes.",
    },
    {
      question: "Do I need to follow a special diet while taking GLP-1 or GLP-1/GIP agonists?",
      answer: "While no specific diet is required, maintaining a balanced, low-calorie diet and exercising regularly will enhance the weight loss effects of these medications.",
    },
    {
      question: "How long does it take to see weight loss results with GLP-1 and GLP-1/GIP agonists?",
      answer: "Most patients begin to see noticeable weight loss within a few weeks, with more significant changes occurring over several months of consistent use.",
    },
    {
      question: "Can I use GLP-1 or GLP-1/GIP agonists if I don’t have diabetes?",
      answer: "These medications can be prescribed off-label for weight loss in people without diabetes, but it is important to consult a healthcare provider to determine if they are appropriate for you.",
    },
    {
      question: "What are the common side effects of GLP-1 and GLP-1/GIP agonists?",
      answer: "The most common side effects include nausea, vomiting, diarrhea, constipation, and bloating, but these usually improve over time as the body adjusts.",
    },
  ];



  return (
    <div className="w-full mx-auto  px-2">
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FaqList;
