import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.email_user,
        pass: config.email.email_pass
    }
});

const sendMail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"BanDoggie - Cuidamos a tu mejor amigo" <' + config.email.email_user + '>',
            to,
            subject,
            text,
            html
        });
        return info;
    } catch (error) {
        console.log("Error sending banking email:", error);
        throw error;
    }
};

const HTMLBankingEmail = (orderData) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Datos para Transferencia Bancaria - BanDoggie</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&family=Raleway:wght@400;600&display=swap');

        body {
          font-family: 'Baloo Bhaijaan 2', 'Raleway', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f6f9fc;
          color: #333;
        }

        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fffdfa;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border: 2px solid #D2691E;
        }

        .header {
          background: linear-gradient(90deg, #D2691E 0%, #ff9800 100%);
          color: white;
          text-align: center;
          padding: 24px 0 12px;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .paw-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .content {
          padding: 28px 32px 16px;
        }

        .greeting {
          font-size: 18px;
          font-weight: bold;
          color: #D2691E;
          margin-bottom: 18px;
        }

        p {
          font-size: 15px;
          margin-bottom: 16px;
          color: #4a4a4a;
          line-height: 1.6;
        }

        .banking-info {
          margin: 24px auto;
          padding: 20px;
          background: linear-gradient(135deg, #D2691E, #B8860B);
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(210, 105, 30, 0.3);
        }

        .banking-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .banking-details {
          background-color: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .banking-item {
          margin: 8px 0;
          font-size: 16px;
        }

        .amount-highlight {
          margin: 12px 0;
          font-size: 20px;
          background-color: rgba(255,255,255,0.2);
          padding: 10px;
          border-radius: 6px;
          text-align: center;
          font-weight: bold;
        }

        .order-summary {
          background-color: #e3f2fd;
          border-radius: 12px;
          padding: 20px;
          margin: 25px 0;
        }

        .summary-title {
          color: #1976d2;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .summary-content {
          background-color: white;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .order-number {
          font-weight: bold;
          color: #333;
          margin: 8px 0;
        }

        .item-list {
          margin: 15px 0;
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .totals-section {
          border-top: 2px solid #ddd;
          padding-top: 15px;
          margin-top: 15px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }

        .final-total {
          font-size: 18px;
          color: #D2691E;
          font-weight: bold;
        }

        .instructions {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }

        .instructions-title {
          color: #856404;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .instructions ol {
          color: #856404;
          line-height: 1.8;
          margin: 0;
          padding-left: 20px;
        }

        .instructions li {
          margin-bottom: 5px;
        }

        .footer {
          text-align: center;
          padding: 25px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 12px;
          margin-top: 40px;
        }

        .footer-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .footer p {
          margin: 5px 0;
          color: #666;
        }

        .footer-divider {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #ddd;
        }

        .footer-small {
          font-size: 12px;
          color: #999;
          margin: 0;
        }

        @media only screen and (max-width: 600px) {
          .container {
            border-radius: 0;
            margin: 0;
          }

          .content {
            padding: 20px 16px;
          }

          .item {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .banking-details {
            padding: 10px;
          }

          .banking-item {
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="paw-icon">🐾</div>
          BanDoggie
          <div style="font-size: 14px; font-weight: normal; margin-top: 5px;">
            Cuidamos a tu mejor amigo
          </div>
        </div>

        <div class="content">
          <div class="greeting">¡Gracias por tu compra!</div>
          <p>Hola <strong>${orderData.customerInfo.nombre} ${orderData.customerInfo.apellido}</strong>,</p>
          <p>Tu pedido ha sido registrado exitosamente. A continuación te enviamos los datos para realizar la transferencia bancaria:</p>

          <div class="banking-info">
            <div class="banking-title">
              📱 Transferencia Bancaria
            </div>
            <div class="banking-details">
              <div class="banking-item"><strong>Banco:</strong> Banco Agrícola</div>
              <div class="banking-item"><strong>Tipo de cuenta:</strong> Cuenta de Ahorro</div>
              <div class="banking-item"><strong>Número de cuenta:</strong> 3680297372</div>
              <div class="banking-item"><strong>Titular:</strong> XIOMARA CASTILLO</div>
              <div class="amount-highlight">
                <strong>Monto a transferir: $${orderData.total.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div class="order-summary">
            <div class="summary-title">
              📋 Resumen de tu pedido:
            </div>
            <div class="summary-content">
              <div class="order-number">
                <strong>Número de orden:</strong> ${orderData.orderNumber}
              </div>
              <div class="item-list">
                ${orderData.items.map(item => `
                  <div class="item">
                    <span>• ${item.name} (Cantidad: ${item.quantity})</span>
                    <span style="color: #D2691E; font-weight: bold;">$${item.subtotal.toFixed(2)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="totals-section">
                <div class="total-row">
                  <span><strong>Subtotal:</strong></span>
                  <span><strong>$${(orderData.total - orderData.shippingCost).toFixed(2)}</strong></span>
                </div>
                <div class="total-row">
                  <span><strong>Envío:</strong></span>
                  <span><strong>$${orderData.shippingCost.toFixed(2)}</strong></span>
                </div>
                <div class="total-row final-total">
                  <span><strong>TOTAL:</strong></span>
                  <span><strong>$${orderData.total.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div class="instructions">
            <div class="instructions-title">⚠️ Instrucciones importantes:</div>
            <ol>
              <li>Envía el monto exacto de <strong>$${orderData.total.toFixed(2)}</strong> a la cuenta indicada</li>
              <li>Una vez realizada la transferencia, nos comunicaremos contigo para coordinar la entrega</li>
              <li>Guarda el comprobante de transferencia para cualquier consulta</li>
              <li>Si tienes alguna duda, no dudes en contactarnos</li>
            </ol>
          </div>

          <div class="footer">
            <div class="footer-icon">🐾</div>
            <p style="font-weight: 500; font-size: 16px;">¡Gracias por confiar en BanDoggie!</p>
            <p style="font-size: 14px;">Cuidamos a tu mejor amigo con amor</p>
            <div class="footer-divider">
              <p class="footer-small">
                Este es un email automático, por favor no responder a este mensaje.
              </p>
              <p class="footer-small">
                &copy; ${new Date().getFullYear()} BanDoggie. Todos los derechos reservados.
              </p>
              <p class="footer-small">
                BanDoggie Inc. | San Salvador, El Salvador
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
};

export { sendMail, HTMLBankingEmail };