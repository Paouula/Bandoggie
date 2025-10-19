import sendMailAPI from "../middlewares/sendMailApi.js"; 
import { config } from "../config.js";

// FUNCIÓN PARA ENVIAR CORREO USANDO LA API DE BREVO
export const sendBankingMail = async (to, customerName, totalAmount, orderNumber = null) => {
  try {
    if (!to || !customerName || !totalAmount) {
      throw new Error("Parámetros faltantes para enviar el correo.");
    }

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
      subject: "📧 Datos para Transferencia - BanDoggie",
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

// FUNCIÓN PARA GENERAR EL HTML DEL EMAIL BANCARIO CON CSS COMPLETO
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
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .header {
      background: linear-gradient(135deg, #FF9A56 0%, #FF6B95 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      font-size: 32px;
      font-weight: 800;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .paw-icon {
      font-size: 48px;
      margin-bottom: 10px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 20px;
      text-align: center;
    }

    .content p {
      color: #4b5563;
      font-size: 16px;
      margin-bottom: 25px;
      text-align: center;
      line-height: 1.8;
    }

    .amount-box {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      text-align: center;
      font-size: 28px;
      font-weight: 800;
      margin: 30px 0;
      box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .banking-details {
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      padding: 30px;
      border-radius: 15px;
      margin: 25px 0;
    }

    .banking-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 10px;
    }

    .bank-info {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .bank-info-row {
      display: table;
      width: 100%;
    }

    .bank-info-cell {
      display: table-cell;
      width: 50%;
      padding: 15px;
      text-align: center;
      border-right: 2px solid #e5e7eb;
    }

    .bank-info-cell:last-child {
      border-right: none;
    }

    .bank-info-cell.highlighted {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 8px;
    }

    .bank-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .bank-label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .bank-value {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
    }

    .bank-value.account {
      font-size: 24px;
      color: #dc2626;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }

    .reference-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin: 25px 0;
      border: 2px dashed #3b82f6;
    }

    .reference-label {
      font-size: 14px;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 10px;
    }

    .reference-value {
      font-size: 22px;
      font-weight: 800;
      color: #1e3a8a;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }

    .instructions {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      padding: 25px;
      border-radius: 15px;
      margin: 25px 0;
    }

    .instructions-title {
      font-size: 18px;
      font-weight: 700;
      color: #065f46;
      margin-bottom: 15px;
      text-align: center;
    }

    .instruction-item {
      padding: 12px 15px;
      margin-bottom: 10px;
      background: white;
      border-radius: 8px;
      font-size: 15px;
      color: #374151;
      border-left: 4px solid #10b981;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .instruction-item:last-child {
      margin-bottom: 0;
    }

    .security-note {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      padding: 20px;
      border-radius: 12px;
      font-size: 14px;
      color: #7f1d1d;
      border-left: 4px solid #dc2626;
      line-height: 1.8;
      margin-top: 25px;
    }

    .footer {
      background: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      border-top: 3px solid #e5e7eb;
    }

    .footer p {
      margin-bottom: 15px;
      color: #374151;
      font-size: 15px;
    }

    .footer small {
      display: block;
      margin-top: 10px;
      color: #9ca3af;
      font-size: 12px;
    }

    /* Responsive */
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }

      .header {
        padding: 30px 20px;
        font-size: 24px;
      }

      .paw-icon {
        font-size: 36px;
      }

      .content {
        padding: 25px 20px;
      }

      .greeting {
        font-size: 20px;
      }

      .amount-box {
        font-size: 24px;
        padding: 20px;
      }

      .banking-details {
        padding: 20px;
      }

      .bank-info-row {
        display: block;
      }

      .bank-info-cell {
        display: block;
        width: 100%;
        border-right: none;
        border-bottom: 2px solid #e5e7eb;
        padding: 20px;
      }

      .bank-info-cell:last-child {
        border-bottom: none;
      }

      .bank-value.account {
        font-size: 20px;
      }

      .reference-value {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="paw-icon">🐾</div>
      Bandoggie
      <div style="font-size: 14px; opacity: 0.9; margin-top: 8px;">Cuidamos a tu mejor amigo</div>
    </div>

    <div class="content">
      <div class="greeting">¡Hola ${customerName}!</div>
      <p>Gracias por tu compra en Bandoggie. Hemos recibido tu pedido y estamos emocionados de poder ayudar a cuidar a tu mascota.</p>

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