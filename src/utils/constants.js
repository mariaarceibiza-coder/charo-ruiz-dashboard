// ========== COLORES ==========
export const COLORS = {
  bg_primary: '#F8F6F1',
  bg_secondary: '#FAF9F7',
  bg_card: '#FFFFFF',
  accent_gold: '#D4AF37',
  text_primary: '#1a1410',
  text_secondary: '#5C4D45',
  text_light: '#8B7355',
  border_light: '#E8DFD5',
  status_success: '#2ecc71',
  status_warning: '#f39c12',
  status_info: '#3498db',
  status_danger: '#e74c3c',
};

// ========== ROLES ==========
export const ROLES = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  CLIENTE: 'cliente',
};

// ========== PERMISOS ==========
export const PERMISOS = {
  LECTURA: 'lectura',
  ESCRITURA: 'escritura',
  ADMIN: 'admin',
};

// ========== ESTADOS DE PEDIDOS ==========
export const ESTADOS_PEDIDOS = {
  PENDIENTE: 'Pendiente',
  EN_PROCESO: 'En proceso',
  APROBADO: 'Aprobado',
  ENVIADO: 'Enviado',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
};

// ========== ESTADOS DE PAGO ==========
export const ESTADOS_PAGO = {
  PENDIENTE: 'Pendiente',
  PARCIAL: 'Parcial',
  PAGADO: 'Pagado',
};

// ========== TIPOS DE DOCUMENTOS ==========
export const TIPOS_DOCUMENTOS = {
  PRESUPUESTO: 'presupuesto',
  PEDIDO: 'pedido',
  FACTURA: 'factura',
};

// ========== TAMAÑO MÁXIMO DE ARCHIVO ==========
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ========== TIPOS MIME PERMITIDOS ==========
export const MIME_TYPES_PERMITIDOS = {
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS: 'application/vnd.ms-excel',
};

// ========== MENSAJES ==========
export const MENSAJES = {
  ERROR_ARCHIVO_GRANDE: 'El archivo es demasiado grande. Máximo 5MB.',
  ERROR_TIPO_ARCHIVO: 'Tipo de archivo no permitido. Solo PDF, Excel.',
  ERROR_CONEXION: 'Error de conexión. Intenta de nuevo.',
  ERROR_GENERICO: 'Ocurrió un error inesperado.',
  EXITO_GUARDADO: 'Guardado correctamente.',
  EXITO_ELIMINADO: 'Eliminado correctamente.',
  CONFIRMACION_ELIMINAR: '¿Estás seguro de que deseas eliminar?',
};

// ========== COLECCIONES FIREBASE ==========
export const FIRESTORE_COLLECTIONS = {
  VENDEDORES: 'vendedores',
  USUARIOS: 'usuarios',
  CLIENTES: 'clientes',
  PEDIDOS: 'pedidos',
  DOCUMENTOS: 'documentos',
  COMENTARIOS: 'comentarios',
  CHAT: 'chat',
  PAGOS: 'pagos',
};

// ========== RUTAS ==========
export const RUTAS = {
  LOGIN: '/login',
  DASHBOARD_VENDEDOR: '/dashboard/vendedor',
  DASHBOARD_ADMIN: '/dashboard/admin',
  PORTAL_CLIENTE: '/portal/cliente',
  NOT_FOUND: '/404',
};
