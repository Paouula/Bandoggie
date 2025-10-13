import { gmailTransporter, config } from "../config.js";

// ✅ FUNCIÓN PARA ENVIAR CORREO DIRECTAMENTE CON GMAIL
export const sendBankingMail = async (to, customerName, totalAmount, orderNumber = null) => {
  try {
    console.log('📧 Preparando email bancario...');
    console.log(`   Destinatario: ${to}`);
    console.log(`   Cliente: ${customerName}`);
    console.log(`   Monto: $${totalAmount}`);

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

    // ✅ Enviar directamente con Gmail
    const mailOptions = {
      from: {
        name: 'BanDoggie',
        address: config.email.email_user
      },
      to: to,
      subject: "📩 Datos para Transferencia - BanDoggie",
      text: text,
      html: html
    };

    console.log('📤 Enviando email...');
    
    const result = await gmailTransporter.sendMail(mailOptions);

    console.log('✅ Email enviado exitosamente');
    console.log(`   Message ID: ${result.messageId}`);
    
    return {
      success: true,
      messageId: result.messageId,
      accepted: result.accepted,
      response: result.response
    };

  } catch (error) {
    console.error("❌ Error al enviar el correo:", error.message);
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
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    
    .paw-icon {
      font-size: 50px;
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
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
    }
    
    .content p {
      color: #4b5563;
      font-size: 16px;
      margin-bottom: 25px;
    }
    
    .amount-box {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin: 30px 0;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
    }
    
    .banking-details {
      background: #f3f4f6;
      border-radius: 15px;
      padding: 30px;
      margin: 30px 0;
      border: 3px solid #e5e7eb;
    }
    
    .banking-title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 25px;
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 2px solid #d1d5db;
    }
    
    .bank-info {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .bank-info-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .bank-info-cell {
      text-align: center;
      padding: 15px;
      border-radius: 10px;
      background: #f9fafb;
      transition: transform 0.2s;
    }
    
    .bank-info-cell:hover {
      transform: translateY(-2px);
    }
    
    .bank-info-cell.highlighted {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #fbbf24;
    }
    
    .bank-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .bank-label {
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    
    .bank-value {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
    }
    
    .bank-value.account {
      font-size: 20px;
      color: #f59e0b;
      letter-spacing: 1px;
    }
    
    .reference-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
      border: 2px solid #3b82f6;
    }
    
    .reference-label {
      font-size: 14px;
      color: #1e40af;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .reference-value {
      font-size: 24px;
      font-weight: 800;
      color: #1e40af;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
    }
    
    .instructions {
      background: #fff7ed;
      border-left: 5px solid #f97316;
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
    }
    
    .instructions-title {
      font-size: 18px;
      font-weight: 700;
      color: #ea580c;
      margin-bottom: 15px;
    }
    
    .instruction-item {
      padding: 12px 0;
      color: #78350f;
      font-size: 15px;
      border-bottom: 1px solid #fed7aa;
    }
    
    .instruction-item:last-child {
      border-bottom: none;
    }
    
    .security-note {
      background: #fef2f2;
      border: 2px solid #fca5a5;
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0;
      font-size: 14px;
      color: #991b1b;
      line-height: 1.7;
    }
    
    .security-note strong {
      color: #dc2626;
    }
    
    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    
    .footer p {
      margin-bottom: 15px;
      color: #4b5563;
    }
    
    .footer small {
      display: block;
      margin-top: 10px;
      color: #9ca3af;
    }
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 20px 10px;
      }
      
      .header {
        padding: 30px 20px;
        font-size: 24px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .bank-info-row {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .amount-box {
        font-size: 22px;
        padding: 20px;
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