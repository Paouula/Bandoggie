import React from 'react';
import FAQCard from '../AbouUs/FAQCard';

const FAQSection = () => {
  const faqData = [
    {
      question: "¿Cómo puedo contactar al soporte?",
      answer: "Puedes comunicarte con nosotros a través del formulario de contacto o al correo soporte@guattari.com.",
    },
    {
      question: "¿Mi información está segura?",
      answer: "Sí, contamos con protocolos de seguridad para proteger tus datos personales.",
    },
    {
      question: "¿Cuál es el horario de atención?",
      answer: "Nuestro horario de atención es de lunes a viernes de 9:00 a.m. a 6:00 p.m.",
    },
  ];

  return (
    <>
      <section id="faq" className="faq-section">
        <div className="faq-container">
          <div className="faq-content">
            <div className="faq-bubble-orange"></div>
            <div className="faq-bubble-yellow"></div>

            <div className="faq-inner">
              <div className="faq-header">
                <h2 className="faq-title">Preguntas Frecuentes</h2>
                <p className="faq-subtitle">
                  Encuentra respuestas a las preguntas más comunes sobre nuestros servicios 
                  y cómo podemos ayudarte a alcanzar tus objetivos.
                </p>
              </div>

              <div className="faq-grid">
                {faqData.map((faq, index) => (
                  <FAQCard key={index} faq={faq} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .faq-section {
          padding: 4rem 1.5rem;
        }

        .faq-container {
          max-width: 90rem;
          margin: 0 auto;
        }

        .faq-content {
          position: relative;
          background-color: #fff7ed;
          border-radius: 1.5rem;
          padding: 3rem 3rem;
          overflow: hidden;
        }

        .faq-inner {
          position: relative;
          z-index: 10;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .faq-subtitle {
          color: #374151;
          font-size: 1.125rem;
          max-width: 36rem;
          margin: 0 auto;
        }

        .faq-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default FAQSection;