
import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import 'react-floating-whatsapp/dist/style.css';

const WhatsAppWidget = () => {
    return (
        <FloatingWhatsApp
            phoneNumber="+59896584401"
            accountName="Inmobiliaria VALLARINO"
            avatar="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            statusMessage="Responde en minutos"
            chatMessage="Hola 👋 ¿En qué podemos ayudarte?"
            placeholder="Escribe un mensaje..."
            darkMode={false}
            allowEsc
            allowClickAway
            notification
            notificationSound
        />
    );
};

export default WhatsAppWidget;
