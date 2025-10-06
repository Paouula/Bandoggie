import fetch from "node-fetch";
import { config } from "../config.js";
 

 
const sendMailAPI = async function enviarCorreo(email) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": config.apiKey.api_key,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Bandoggie", email: "ronyjavierramirezalvarado@gmail.com" }, 
      to: [{ email: email, name: "Destinatario" }],
      subject: "Prueba desde Node.js",
      htmlContent: "<p>Este es un correo enviado con <b>Brevo API</b></p>",
    }),
  });
 
  const data = await response.json();
  console.log(data);
};
 
export default sendMailAPI;