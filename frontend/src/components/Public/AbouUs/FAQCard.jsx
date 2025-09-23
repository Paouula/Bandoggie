import React from 'react';
import { MessageCircle, Shield, Clock } from 'lucide-react';

const FAQCard = ({ faq, index }) => {
  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <MessageCircle className="icon" />;
      case 1:
        return <Shield className="icon" />;
      case 2:
        return <Clock className="icon" />;
      default:
        return <MessageCircle className="icon" />;
    }
  };

  return (
    <>
      <div className="faq-card">
        <div className="faq-card-bubble">
          {getIcon(index)}
        </div>
        <h3 className="faq-question">{faq.question}</h3>
        <p className="faq-answer">{faq.answer}</p>
      </div>

      <style jsx>{`
        .faq-card {
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .faq-card-bubble {
          width: 4rem;
          height: 4rem;
          background-color: #fdba74;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .faq-card-bubble :global(.icon) {
          width: 2rem;
          height: 2rem;
          color: white;
        }

        .faq-question {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .faq-answer {
          color: #4b5563;
          font-size: 0.875rem;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
};

export default FAQCard;
