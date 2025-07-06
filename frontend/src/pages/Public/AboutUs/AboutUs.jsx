import React from 'react';
import './AboutUs.css';

// Importa los íconos
import { MessageCircle, Shield, Clock } from 'lucide-react';

// Importa la imagen
import DogAboutUs from '../../../img/AboutUs/DogAboutUs.png';

function AboutUs() {
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
    <div className="aboutus-wrapper">
      {/* Banner Section */}
      <div className="aboutus-container">
        <div className="aboutus-banner">
          <h1>
            Sobre<br />Nosotros
          </h1>
          <p>
            Diseñamos bandanas para perros que<br />
            combinan estilo, calidad y confort.
          </p>
          <img src={DogAboutUs} alt="DogAboutUs" className="DogAboutUs" />
        </div>
      </div>

      {/* FAQ Section */}
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
                  <div key={index} className="faq-card">
                    <div className="faq-card-bubble"></div>
                    <div className="faq-icon">
                      {index === 0 && <MessageCircle className="icon" />}
                      {index === 1 && <Shield className="icon" />}
                      {index === 2 && <Clock className="icon" />}
                    </div>
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">{faq.answer}</p>
                    <button className="faq-button">Leer más →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

