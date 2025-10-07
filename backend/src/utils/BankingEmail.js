import sendMailAPI from "./sendMailAPI.js"; 
import { config } from "../config.js";

// FUNCIÓN PARA ENVIAR CORREO USANDO LA API DE BREVO
export const sendBankingMail = async (to, customerName, totalAmount, orderNumber = null) => {
  try {
    if (!to || !customerName || !totalAmount) {
      throw new Error("Parámetros faltantes para enviar el correo.");
    } //prueba

    const html = HTMLSimpleBankingEmail(customerName, totalAmount, orderNumber);
    const formattedAmount = parseFloat(totalAmount).toFixed(2);
    const reference = orderNumber || `REF${Date.now().toString().slice(-6)}`;

    const text = `
Hola ${customerName},

Gracias por tu compra en BanDoggie.

💰 Monto a transferir: $${formattedAmount}
📋 Referencia del pedido: ${reference}

🏦 Banco: Banco Agrícola
💳 Tipo de cuenta: Cuenta de Ahorro
🔢 Número de cuenta: 3680297372
👤 Titular: XIOMARA CASTILLO

📌 Instrucciones:
- Realiza la transferencia por el monto exacto.
- Conserva el comprobante.
- Te contactaremos una vez confirmemos el pago (24-48h).

Gracias por confiar en BanDoggie. 🐾
    `.trim();

    const result = await sendMailAPI({
      to,
      subject: "📩 Datos para Transferencia - BanDoggie",
      htmlContent: html,
      textContent: text,
      senderName: "BanDoggie",
      senderEmail: config.email.email_user, 
      recipientName: customerName,
    });

    return result;
  } catch (error) {
    console.error("❌ Error al enviar el correo de datos bancarios:", error);
    throw error;
  }
};

// FUNCIÓN PARA GENERAR EL HTML DEL EMAIL BANCARIO
export const HTMLSimpleBankingEmail = (customerName, totalAmount, orderNumber = null) => {
  if (!customerName || !totalAmount) {
    throw new Error("customerName y totalAmount son requeridos para generar el email");
  }

  const formattedAmount = parseFloat(totalAmount).toFixed(2);
  const reference = orderNumber || `REF${Date.now().toString().slice(-6)}`;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Datos para Transferencia - BanDoggie</title>
  <style>
    /* Incluye aquí todo tu CSS exactamente como lo tenías */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="paw-icon">🐾</div>
      BanDoggie
      <div style="font-size: 14px; opacity: 0.9; margin-top: 8px;">Cuidamos a tu mejor amigo</div>
    </div>

    <div class="content">
      <div class="greeting">¡Hola ${customerName}!</div>
      <p>Gracias por tu compra en BanDoggie. Hemos recibido tu pedido y estamos emocionados de poder ayudar a cuidar a tu mascota.</p>

      <div class="amount-box">
        💰 Monto a transferir: $${formattedAmount}
      </div>

      <div class="banking-details">
        <div class="banking-title">
          🏦 Datos para transferencia bancaria
        </div>

        <div class="bank-info">
          <div class="bank-info-row">
            <div class="bank-info-cell">
              <div class="bank-icon">🏛️</div>
              <div class="bank-label">BANCO</div>
              <div class="bank-value">Banco Agrícola</div>
            </div>
            <div class="bank-info-cell">
              <div class="bank-icon">💰</div>
              <div class="bank-label">TIPO DE CUENTA</div>
              <div class="bank-value">Cuenta de Ahorro</div>
            </div>
          </div>
        </div>

        <div class="bank-info" style="margin-top: 15px;">
          <div class="bank-info-row">
            <div class="bank-info-cell highlighted">
              <div class="bank-icon">🔢</div>
              <div class="bank-label">NÚMERO DE CUENTA</div>
              <div class="bank-value account">3680297372</div>
            </div>
            <div class="bank-info-cell">
              <div class="bank-icon">👤</div>
              <div class="bank-label">TITULAR</div>
              <div class="bank-value">XIOMARA CASTILLO</div>
            </div>
          </div>
        </div>
      </div>

      <div class="reference-box">
        <div class="reference-label">📋 Número de referencia del pedido:</div>
        <div class="reference-value">${reference}</div>
      </div>

      <div class="instructions">
        <div class="instructions-title">📋 Instrucciones importantes</div>
        <div class="instruction-item">💵 Realiza la transferencia por el monto exacto mostrado arriba</div>
        <div class="instruction-item">🧾 Conserva el comprobante de transferencia</div>
        <div class="instruction-item">📞 Una vez realizada la transferencia, nos comunicaremos contigo</div>
        <div class="instruction-item">⏰ El tiempo de procesamiento es de 24-48 horas hábiles</div>
      </div>

      <div class="security-note">
        <strong>🔒 Nota de seguridad:</strong> Este email contiene información bancaria sensible.
        No compartas estos datos con terceros y verifica siempre que estés realizando la transferencia
        a los datos correctos mostrados arriba.
      </div>
    </div>

    <div class="footer">
      <p>Una vez realizada la transferencia, nuestro equipo verificará el pago y se comunicará contigo para coordinar la entrega de tu pedido.</p>
      <small>&copy; ${new Date().getFullYear()} BanDoggie. Todos los derechos reservados.</small>
      <small>Este email fue enviado porque realizaste una compra en nuestra tienda.</small>
    </div>
  </div>
</body>
</html>
  `;
};


