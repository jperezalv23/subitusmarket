# 💼 SkillMatch

SkillMatch es una **dApp (aplicación descentralizada)** diseñada para conectar talentos con personas interesadas en contratar sus servicios. Utiliza la tecnología **blockchain** de Avalanche para registrar contratos, confirmar trabajos y manejar pagos de forma segura y sin intermediarios.

---

## 🧐 Descripción del Problema

En el mercado actual, contratar servicios profesionales puede ser complicado debido a la falta de confianza, la intervención de intermediarios costosos y la ausencia de mecanismos seguros para manejar pagos. SkillMatch aborda este problema proporcionando una plataforma descentralizada que:
- Elimina intermediarios, reduciendo costos.
- Garantiza la seguridad de los pagos mediante contratos inteligentes.
- Fomenta la transparencia con un mecanismo básico de reputación.

---

## 🌐 ¿Cómo Utiliza Avalanche?

SkillMatch aprovecha el ecosistema de Avalanche de la siguiente manera:
- **Contratos inteligentes en la C-Chain:** Registra los acuerdos laborales y gestiona pagos de forma inmutable.
- **Pagos en AVAX:** Facilita transacciones rápidas y económicas utilizando la moneda nativa de Avalanche.
- **Ecosistema thirdweb:** Simplifica la integración de wallets y transacciones on-chain.

---

## ✨ Características

- Registro de profesionales mediante wallet.
- Creación de contratos de trabajo on-chain.
- Pago seguro en AVAX (directamente a smart contracts).
- Confirmación de trabajos por ambas partes.
- Solicitud de reembolso si el trabajo no se completa a tiempo.
- Mecanismo básico de reputación basado en confirmaciones.

---

## 🛠️ Tecnologías Utilizadas

- **Solidity:** Desarrollo de contratos inteligentes.
- **Avalanche C-Chain:** Red blockchain compatible con EVM.
- **thirdweb:** Integración de wallets y gestión de transacciones.
- **Ethers.js / Web3:** Interacción con la blockchain.
- **Next.js:** Creación de la interfaz de usuario.

---

## 🚀 ¿Cómo Funciona?

### Para Clientes:
1. Conectan su wallet.
2. Buscan un profesional adecuado.
3. Crean un trabajo mediante un pago en AVAX.
4. Confirman la entrega del trabajo cuando el profesional termina.
5. El pago se libera automáticamente al profesional.

### Para Profesionales:
1. Registran su wallet en la plataforma.
2. Reciben solicitudes de trabajo.
3. Realizan el trabajo solicitado.
4. Reciben el pago una vez que el cliente valida la entrega.

---
## ⚙️ Instalación

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/jperezalv23/subitusmarket.git
   cd subitusmarket

2. **Instalar dependencias**
    ```bash
    npm i  

3. **Cambiar variables de entorno**

    Para ejecutar este proyecto, debes cambiar la sigueinte variable de entorno en el .env

   `CLIENT_ID` 


4. **Inicia el servidor de desarrollo**
    ```bash
    npm run dev

