# BANDOGGIE - Huellitas Pet's Shop 

¡Bienvenidos a **Bandoggie**, donde el amor por las mascotas se encuentra con el poder de la tecnología! 

**Bandoggie**, anteriormente conocida como *Huellitas Pet's Shop*, es una tienda en línea especializada en la **venta de accesorios personalizados y por encargo para mascotas**. Nació como una respuesta a la necesidad de modernizar y expandir el alcance de un emprendimiento local con gran potencial, dando el salto hacia el entorno digital con una propuesta fresca, amigable y pensada para las nuevas generaciones de consumidores.

Nuestro objetivo principal es brindar una **experiencia de compra única, ordenada, rápida y totalmente adaptable**, tanto para compradores al por mayor (como clínicas veterinarias y distribuidores) como para clientes particulares que buscan mimar a sus peluditos con productos únicos, de calidad y con mucho estilo.

### 💡 ¿Qué hace especial a Bandoggie?

- Su **estructura dual** permite atender de manera diferenciada a mayoristas y minoristas.
- El diseño de la plataforma se enfoca en la **experiencia del usuario (UX)**, utilizando interfaces limpias, categorizaciones claras y recursos visuales útiles como **guías de tallas y galerías de estampados**.
- Todo el sistema está creado con tecnologías modernas que garantizan escalabilidad, seguridad y facilidad de uso, tanto en la web como en dispositivos móviles.
- No solo vendemos, también **creamos comunidad**, permitiendo a los usuarios dejar sus opiniones, revisar productos guardados, e incluso hablar con el equipo mediante un chat en línea.

### 🎯 Nuestra visión

Ser una de las **tiendas virtuales líderes en el mercado latinoamericano de productos personalizados para mascotas**, con una experiencia digital completa y cercana, apoyada en herramientas tecnológicas actuales y una estética amigable, emocional y profesional.

---

## 👩‍💻 Equipo de Desarrollo 🧠💡

Detrás de esta propuesta hay un equipo comprometido, creativo y apasionado por el diseño, el desarrollo web y, por supuesto, los animalitos 🐾:

| Cargo           | Nombre                                   | Código     |
|----------------|-------------------------------------------|------------|
| 🐾 Coordinadora  | **Paola Andrea Rivera Martínez**           | 20230523   |
| 🐾 Subcoordinador| **Rony Javier Ramírez Alvarado**           | 20230113   |
| 🐾 Secretaria    | **Fabiola Alexandra Deleón Martínez**      | 20230033   |
| 🐾 Tesorero      | **Fernando Javier Ortiz Ponce**            | 20200438   |
| 🐾 Vocal         | **Fabiola Aracely Retana Osorto**          | 20200393   |

Cada miembro ha aportado sus conocimientos técnicos y creativos para hacer de Bandoggie una solución completa, funcional y escalable.

---

## 📦 Descripción del Proyecto

**Bandoggie** se plantea como una tienda digital dividida en **dos secciones principales**:

### 🏢 Apartado para **Mayoreo**:
- Enfocado a **veterinarias, distribuidores y tiendas**.
- Venta por docena: mismo modelo y talla por pedido.
- Sistema de selección visual (guía de tallas, estampados).
- Información clara sobre **tiempos de producción y entrega**.

### Apartado para **Minoreo**:
- Experiencia personalizada.
- Catálogo organizado por tipo de producto y eventos especiales (cumpleaños, Navidad, Halloween, etc.).
- Opciones de personalización disponibles al seleccionar el producto.

---

### 🌟 Funcionalidades destacadas

- Registro opcional de usuarios.
- Guardado de productos favoritos.
- Sistema de reseñas y calificaciones.
- Chat en línea para atención inmediata.
- Descarga directa de la **app móvil multiplataforma**.
- Panel administrativo (interno) para gestionar usuarios, pedidos, productos y contenido del sitio.

---

Este proyecto no solo busca **impulsar ventas**, sino crear una **conexión emocional con los usuarios**, apoyándose en una interfaz accesible, moderna y adaptable a cualquier dispositivo. Todo esto con el respaldo de un **stack tecnológico robusto y moderno** que asegura rendimiento, seguridad y mantenimiento a largo plazo.



## Estructura del Proyecto

BANDOGGIE/
├── backend/
│ ├── src/
│ ├── app.js
│ ├── database.js
│ ├── index.js
│ ├── package.json
│ └── ...
│
├── frontend/
│ ├── public/
│ │ └── vite.svg
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── img/
│ │ └── pages/Public/
│ ├── App.jsx
│ ├── index.css
│ ├── main.jsx
│ ├── vite.config.js
│ └── ...

## Requisitos del Sistema

| Recurso             | Mínimo                                  | Recomendado                        |
| ------------------- | --------------------------------------- | ---------------------------------- |
| Sistema operativo   | Windows 7+, macOS Sierra, Linux         | Windows 10+, macOS Monterey        |
| RAM                 | 4 GB                                    | 8 GB o más                         |
| Node.js             | 14.x o superior                         | 18.x o superior                    |
| MongoDB             | Atlas (cloud) o local                   | MongoDB Atlas (cloud)              |
| Navegador           | Chrome, Firefox, Safari                 | Última versión de Chrome o Firefox |
| Conexión a Internet | Estable para descargas y sincronización | Rápida (20 Mbps o superior)        |

---

### Backend (Express + MongoDB)

```bash
cd backend
npm install
# Crear archivo .env
cp .env.example .env
# Editar .env con la URI de MongoDB Atlas
npm run dev
```

### Frontend Web (React)

```bash
 cd Frontend --> cd public --> cd src --> cd Pages --> cd Public --> Open Terminal --> npm i install --> npm run dev
```

### Paquetes utilizados:

| 📦 Paquete                  | 🧾 Descripción                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `express`                   | Framework web rápido y minimalista para Node.js. Se utiliza para manejar rutas, middlewares y servidores.   |
| `mongoose`                  | ODM (Object Document Mapper) para MongoDB, facilita las operaciones con bases de datos usando modelos.      |
| `dotenv`                    | Permite cargar variables de entorno desde un archivo `.env`, ideal para mantener claves seguras.            |
| `nodemailer`                | Envío de correos electrónicos desde el servidor, útil para confirmaciones o recuperación de contraseña.     |
| `crypto`                    | Módulo nativo de Node.js para funciones criptográficas, como generación de tokens o claves únicas.          |
| `jsonwebtoken`              | Implementación de JSON Web Tokens (JWT) para autenticación segura en el backend.                            |
| `bcryptjs`                  | Utilizado para encriptar contraseñas antes de almacenarlas en la base de datos.                             |
| `cookie-parser`             | Middleware que permite leer y manipular cookies fácilmente en las peticiones HTTP.                          |
| `multer`                    | Middleware para manejar la subida de archivos en formularios (`multipart/form-data`).                       |
| `multer-storage-cloudinary` | Adaptador que permite guardar imágenes en Cloudinary usando Multer.                                         |
| `cloudinary`                | SDK oficial para subir, transformar y manipular imágenes en la nube (servicio de almacenamiento de medios). |
