# Charo Ruiz Sales Dashboard

Dashboard profesional de gestión de ventas, clientes y objetivos anuales para Charo Ruiz Ibiza, con herramientas de IA integradas.

## 🎯 Características Principales

### Para Vendedores
- **Dashboard con KPIs** - Ventas totales, número de pedidos, ticket promedio
- **Objetivos Anuales** - Seguimiento visual de cumplimiento vs objetivo anual
- **Gestión de Pedidos** - Ver y editar estados (Comercial, Almacén, Logística)
- **Análisis de Rendimiento** - Ritmo mensual necesario para alcanzar objetivo

### Para Administradores
- **Gestión Integral** - CRUD de vendedores, usuarios y clientes
- **Permisos Granulares** - Lectura, escritura, acceso a showrooms específicos
- **Multi-Admin** - Múltiples administradores con diferentes permisos
- **Vista Global de Pedidos** - Panel centralizado de todos los pedidos
- **Importación de Clientes** - Carga masiva desde Excel

### Para Clientes
- **Portal de Clientes** - Visualizar pedidos y estados
- **Documentos** - Descargar presupuestos, pedidos y facturas
- **Estado de Pagos** - Seguimiento de pagos realizados
- **Chat de Consultas** - Comunicación directa con comercial (próximamente)
- **Comentarios** - Notas y actualizaciones sobre sus pedidos

### Herramientas de IA
1. **Asistente de Negociación** - Recomendaciones inteligentes de estrategias de venta
2. **Predicción de Demanda** - Análisis de productos más vendidos
3. **Análisis de Patrones** - Identificación de clientes top y tendencias
4. **Generación de Reportes** - Reportes automáticos con insights

## 🛠️ Tecnologías

- **Frontend**: React 18, React Router
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Estilos**: CSS-in-JS (estilos inline)
- **Importación de Datos**: XLSX

## 📋 Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- Cuenta de Firebase

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/charo-ruiz-dashboard.git
cd charo-ruiz-dashboard
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env
```

Completar las variables con tu configuración de Firebase:

```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### 4. Iniciar la aplicación
```bash
npm start
```

La app estará disponible en `http://localhost:3000`

## 📱 Credenciales de Demo

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | charo@charo.com | charo123 |
| Vendedor | mint@charo.com | mint123 |
| Cliente | aishti@mail.com | client123 |

## 📁 Estructura del Proyecto

```
charo-ruiz-dashboard/
├── src/
│   ├── components/          # Componentes React reutilizables
│   ├── pages/              # Páginas principales
│   ├── config/             # Configuración (Firebase, etc.)
│   ├── services/           # Servicios (Firebase, API)
│   ├── hooks/              # Custom Hooks (useAuth, etc.)
│   ├── utils/              # Funciones utilitarias
│   ├── styles/             # Estilos globales
│   ├── App.jsx             # Componente raíz
│   └── index.js            # Punto de entrada
├── public/                 # Archivos públicos
├── package.json            # Dependencias del proyecto
├── .env.example            # Template de variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Este archivo
└── LICENSE                 # Licencia del proyecto
```

## 🔐 Configuración de Firebase

### Crear colecciones en Firestore:

```javascript
vendedores/       // Documento: {nombre, ciudad, email, objetivoAnual, ...}
usuarios/         // Documento: {email, rol, permisos, ...}
clientes/         // Documento: {nombre, email, vendedorAsignado, ...}
pedidos/          // Documento: {numero, cliente, estado, total, ...}
documentos/       // Documento: {tipo, pedidoId, ruta, uploadedAt, ...}
comentarios/      // Documento: {pedidoId, contenido, autor, ...}
chat/             // Documento: {pedidoId, mensaje, remitente, ...}
pagos/            // Documento: {pedidoId, cantidad, estado, ...}
```

### Reglas de Seguridad (Firebase):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /pedidos/{pedidoId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🔄 Flujo de Datos

### Login
1. Usuario introduce email/contraseña
2. Firebase autentica
3. Se obtiene rol y permisos desde Firestore
4. Se redirige al dashboard correspondiente

### Crear Pedido (Admin)
1. Admin crea pedido en BD
2. Se asigna automáticamente al vendedor
3. Se notifica al cliente
4. Cliente ve en su portal

### Subir Documento (Admin)
1. Admin sube PDF a Storage
2. Se registra referencia en Firestore
3. Se notifica al cliente
4. Cliente puede descargar

## 📊 Próximas Features

- [ ] Chat en tiempo real con WebSockets
- [ ] Notificaciones por email automáticas
- [ ] Reportes PDF generados automáticamente
- [ ] Integración de pagos online
- [ ] Dashboard de analytics avanzado
- [ ] Exportación a Excel de reportes
- [ ] Gestión de inventario
- [ ] Histórico de versiones de documentos

## 🐛 Reportar Bugs

Para reportar bugs, crear un issue en GitHub con:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado
- Capturas de pantalla (si aplica)

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia Propietaria - ver archivo LICENSE para más detalles.

## 📞 Contacto

**Charo Ruiz Ibiza**
- Email: info@charorizibiza.com
- Web: www.charorizibiza.com
- Ubicación: Ibiza, España

## ✨ Créditos

Desarrollado por: María (HR & Operations, Charo Ruiz)

---

**Última actualización**: Febrero 2026
