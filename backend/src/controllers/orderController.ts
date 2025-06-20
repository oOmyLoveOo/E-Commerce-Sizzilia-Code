// controllers/orderController.ts
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config();


// Configuración del transporter de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}

interface OrderData {
    orderNumber: string;
    customerInfo: CustomerInfo;
    items: OrderItem[];
    total: number;
    paymentMethod: 'bizum';
    bizumPhone: string;
}

// Generar número de pedido único
const generateOrderNumber = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PED-${timestamp}-${random}`;
};

// Validar teléfono (solo números, 9 dígitos para España)
const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Email de confirmación para el cliente
const sendCustomerConfirmationEmail = async (orderData: OrderData) => {
    const itemsHtml = orderData.items.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 8px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            </td>
            <td style="padding: 12px 8px; font-weight: 500;">${item.name}</td>
            <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 8px; text-align: right;">€${item.price.toFixed(2)}</td>
            <td style="padding: 12px 8px; text-align: right; font-weight: 600;">€${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: orderData.customerInfo.email,
        subject: `Confirmación de Pedido #${orderData.orderNumber} - Sizzilia Code`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f8f9fa; padding: 20px; }
                    .order-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .total-row { background-color: #f1f5f9; font-weight: bold; }
                    .footer { text-align: center; padding: 20px; font-size: 14px; color: #666; }
                    .status { background-color: #fef3c7; color: #92400e; padding: 12px; border-radius: 8px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🛍️ ¡Gracias por tu pedido!</h1>
                        <h2>Pedido #${orderData.orderNumber}</h2>
                    </div>
                    
                    <div class="content">
                        <div class="status">
                            <strong>📋 Estado:</strong> Pendiente de confirmación de pago<br>
                            <small>Verificaremos tu pago por Bizum y te confirmaremos en breve.</small>
                        </div>
                        
                        <div class="order-details">
                            <h3>👤 Información del Cliente</h3>
                            <p><strong>Nombre:</strong> ${orderData.customerInfo.name}</p>
                            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
                            ${orderData.customerInfo.phone ? `<p><strong>Teléfono:</strong> ${orderData.customerInfo.phone}</p>` : ''}
                        </div>
                        
                        <div class="order-details">
                            <h3>📦 Resumen del Pedido</h3>
                            <table class="table">
                                <thead>
                                    <tr style="background-color: #f1f5f9;">
                                        <th style="padding: 12px 8px; text-align: left;">Imagen</th>
                                        <th style="padding: 12px 8px; text-align: left;">Producto</th>
                                        <th style="padding: 12px 8px; text-align: center;">Cantidad</th>
                                        <th style="padding: 12px 8px; text-align: right;">Precio Unit.</th>
                                        <th style="padding: 12px 8px; text-align: right;">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                    <tr class="total-row">
                                        <td colspan="4" style="padding: 16px 8px; text-align: right;">
                                            <strong>TOTAL:</strong>
                                        </td>
                                        <td style="padding: 16px 8px; text-align: right; font-size: 18px;">
                                            <strong>€${orderData.total.toFixed(2)}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="order-details">
                            <h3>💳 Información de Pago</h3>
                            <p><strong>Método:</strong> Bizum</p>
                            <p><strong>Número Bizum:</strong> ${orderData.bizumPhone}</p>
                            <p><strong>Concepto indicado:</strong> ${orderData.orderNumber} - ${orderData.customerInfo.name}</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>📞 Te contactaremos pronto para confirmar tu pedido.</p>
                        <p>📧 Si tienes alguna duda, responde a este email.</p>
                        <p><small>Sizzilia Code - Tu tienda de confianza</small></p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

// Email de notificación para el administrador
const sendAdminNotificationEmail = async (orderData: OrderData) => {
    const itemsText = orderData.items.map(item => 
        `• ${item.name} - Cantidad: ${item.quantity} - €${item.price.toFixed(2)} c/u = €${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `🛒 NUEVO PEDIDO #${orderData.orderNumber} - €${orderData.total.toFixed(2)}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .alert { background-color: #fecaca; color: #991b1b; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
                    .section { background-color: white; padding: 20px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
                    .customer-info { background-color: #f0f9ff; border-left: 4px solid #0284c7; }
                    .order-info { background-color: #f0fdf4; border-left: 4px solid #16a34a; }
                    .payment-info { background-color: #fefce8; border-left: 4px solid #ca8a04; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🛒 NUEVO PEDIDO RECIBIDO</h1>
                        <h2>Pedido #${orderData.orderNumber}</h2>
                    </div>
                    
                    <div class="alert">
                        <strong>⚠️ ACCIÓN REQUERIDA:</strong> Verificar pago por Bizum y confirmar pedido
                    </div>
                    
                    <div class="section customer-info">
                        <h3>👤 Información del Cliente</h3>
                        <p><strong>Nombre:</strong> ${orderData.customerInfo.name}</p>
                        <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
                        ${orderData.customerInfo.phone ? `<p><strong>Teléfono:</strong> ${orderData.customerInfo.phone}</p>` : '<p>Teléfono: No proporcionado</p>'}
                    </div>
                    
                    <div class="section order-info">
                        <h3>📦 Productos Pedidos</h3>
                        <pre style="background-color: #f9fafb; padding: 15px; border-radius: 4px; font-family: monospace;">${itemsText}</pre>
                        <p style="font-size: 18px; font-weight: bold; text-align: right; margin-top: 15px; color: #16a34a;">
                            TOTAL: €${orderData.total.toFixed(2)}
                        </p>
                    </div>
                    
                    <div class="section payment-info">
                        <h3>💳 Información de Pago</h3>
                        <p><strong>Método:</strong> Bizum</p>
                        <p><strong>Número Bizum del cliente:</strong> ${orderData.bizumPhone}</p>
                        <p><strong>Concepto que debería aparecer:</strong> <code>${orderData.orderNumber} - ${orderData.customerInfo.name}</code></p>
                    </div>
                    
                    <div class="section">
                        <h3>📝 Próximos Pasos</h3>
                        <ol>
                            <li>Verificar el pago en Bizum (€${orderData.total.toFixed(2)})</li>
                            <li>Confirmar disponibilidad de productos</li>
                            <li>Contactar al cliente para coordinar entrega</li>
                            <li>Actualizar estado del pedido</li>
                        </ol>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

// Controlador principal para procesar pedidos
export const processOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('📦 Processing new order...');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const { customerInfo, items, total, bizumPhone } = req.body;

        // Validaciones
        if (!customerInfo || !items || !Array.isArray(items) || items.length === 0) {
            console.log('❌ Validation failed: Incomplete order data');
            res.status(400).json({ error: 'Datos del pedido incompletos' });
            return;
        }

        if (!customerInfo.name || !customerInfo.email) {
            console.log('❌ Validation failed: Missing name or email');
            res.status(400).json({ error: 'Nombre y email son obligatorios' });
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerInfo.email)) {
            console.log('❌ Validation failed: Invalid email');
            res.status(400).json({ error: 'Email no válido' });
            return;
        }

        // Validar teléfono si se proporciona
        if (customerInfo.phone && !validatePhone(customerInfo.phone)) {
            console.log('❌ Validation failed: Invalid phone');
            res.status(400).json({ error: 'Teléfono no válido. Debe contener solo números (9 dígitos)' });
            return;
        }

        if (!bizumPhone || !validatePhone(bizumPhone)) {
            console.log('❌ Validation failed: Invalid Bizum phone');
            res.status(400).json({ error: 'Número de Bizum no válido' });
            return;
        }

        // Validar que el total sea un número positivo
        if (!total || total <= 0) {
            console.log('❌ Validation failed: Invalid total');
            res.status(400).json({ error: 'Total del pedido no válido' });
            return;
        }

        // Generar número de pedido
        const orderNumber = generateOrderNumber();

        // Preparar datos del pedido
        const orderData: OrderData = {
            orderNumber,
            customerInfo: {
                name: customerInfo.name.trim(),
                email: customerInfo.email.trim().toLowerCase(),
                phone: customerInfo.phone?.replace(/\s/g, '') || ''
            },
            items,
            total,
            paymentMethod: 'bizum',
            bizumPhone
        };

        console.log(`📧 Sending confirmation emails for order ${orderNumber}...`);

        // Enviar emails
        try {
            await Promise.all([
                sendCustomerConfirmationEmail(orderData),
                sendAdminNotificationEmail(orderData)
            ]);
            console.log('✅ Emails sent successfully');
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError);
            // Continue with the response even if emails fail
        }

        console.log(`✅ Order processed successfully: ${orderNumber} - Customer: ${orderData.customerInfo.name} - Total: €${total}`);

        res.status(200).json({ 
            success: true, 
            message: 'Pedido procesado correctamente',
            orderNumber: orderNumber
        });

    } catch (error) {
        console.error('❌ Error processing order:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};