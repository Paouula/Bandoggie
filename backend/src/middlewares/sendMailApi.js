import fetch from "node-fetch";
import { config } from "../config.js";

//Middleware para enviar correos usando la API de Brevo 
const sendMailAPI = async ({
  to,
  subject,
  htmlContent,
  textContent = "",
  senderName = "Bandoggie",
  senderEmail = "ronyjavierramirezalvarado@gmail.com",
  recipientName = "Destinatario"
}) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.apiKey.api_key,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to, name: recipientName }],
        subject: subject,
        htmlContent: htmlContent,
        textContent: textContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al enviar correo: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Correo enviado exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error en sendMailAPI:", error);
    throw error;
  }
};

export default sendMailAPI;