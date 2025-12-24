import { useState } from "react";
import { Link } from "react-router-dom";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition px-6"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span
          className={`text-2xl text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of architectural and design services including residential design, commercial projects, interior design, renovation consulting, and project management.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on scope and complexity. Residential projects typically take 3–6 months for design and 6–18 months for construction.",
    },
    {
      question: "What is your design process?",
      answer:
        "We start with a detailed consultation, then move through conceptual design, schematic design, development, and construction documentation.",
    },
    {
      question: "Do you work on projects outside your local area?",
      answer:
        "Yes, we work nationally and internationally using digital collaboration tools and strategic site visits.",
    },
    {
      question: "What is the cost of your services?",
      answer:
        "Fees depend on project scope and complexity. We offer fixed-fee and percentage-based pricing.",
    },
    {
      question: "Do I need to have plans already drawn up?",
      answer:
        "No. We can start from scratch with just your ideas and requirements.",
    },
    {
      question: "How do I get started?",
      answer:
        "Contact us through our form or by phone to schedule an initial consultation.",
    },
    {
      question: "Do you handle permits and approvals?",
      answer:
        "Yes, we manage all permits and approvals to ensure compliance with local regulations.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[35vh] bg-white">
        <div className="w-full max-w-[1700px] px-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-gray-400 text-2xl tracking-widest">
              HELP CENTER
            </h2>
            <h1 className="text-5xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-2xl mt-6">
              Find answers to common questions about our services, process,
              and how we can help bring your architectural vision to life.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white py-15">
        <div className="max-w-[1601px] mx-auto">
          <div className="bg-white border border-gray-200">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-gray-400 text-4xl mb-6">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Link
            to="/contact"
            className="group inline-flex bg-white border px-6 py-3 text-sm tracking-widest font-medium items-center gap-2
              transition duration-300 ease-in-out
              hover:bg-gray-50 hover:shadow-md"
          >
            CONTACT US
            <span className="inline-block transform transition duration-300 ease-in-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
