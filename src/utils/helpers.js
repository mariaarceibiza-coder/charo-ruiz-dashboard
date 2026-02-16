import { MAX_FILE_SIZE, MIME_TYPES_PERMITIDOS } from './constants';

// ========== FORMATEO ==========

// Formatear dinero a EUR
export const formatearDinero = (cantidad) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cantidad);
};

// Formatear fecha
export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  const date = fecha instanceof Date ? fecha : fecha.toDate?.();
  return new Intl.DateTimeFormat('es-ES').format(date);
};

// Formatear fecha y hora
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '';
  const date = fecha instanceof Date ? fecha : fecha.toDate?.();
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// ========== VALIDACIÓN ==========

// Validar email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar archivo PDF
export const validarArchivoPDF = (archivo) => {
  if (!archivo) return { valido: false, error: 'No hay archivo' };
  
  if (archivo.size > MAX_FILE_SIZE) {
    return { valido: false, error: 'El archivo es demasiado grande' };
  }
  
  if (archivo.type !== MIME_TYPES_PERMITIDOS.PDF) {
    return { valido: false, error: 'Solo se permite PDF' };
  }
  
  return { valido: true };
};

// Validar archivo Excel
export const validarArchivoExcel = (archivo) => {
  if (!archivo) return { valido: false, error: 'No hay archivo' };
  
  if (archivo.size > MAX_FILE_SIZE) {
    return { valido: false, error: 'El archivo es demasiado grande' };
  }
  
  const tiposPermitidos = [MIME_TYPES_PERMITIDOS.EXCEL, MIME_TYPES_PERMITIDOS.XLS];
  if (!tiposPermitidos.includes(archivo.type)) {
    return { valido: false, error: 'Solo se permite Excel' };
  }
  
  return { valido: true };
};

// ========== CÁLCULOS ==========

// Calcular porcentaje de cumplimiento
export const calcularPorcentajeCumplimiento = (actual, objetivo) => {
  if (objetivo === 0) return 0;
  return Math.min(Math.round((actual / objetivo) * 100), 100);
};

// Calcular meses restantes del año
export const calcularMesesRestantes = () => {
  return 12 - new Date().getMonth();
};

// Calcular ritmo mensual necesario
export const calcularRitmoMensual = (objetivo, actual, mesesRestantes) => {
  if (mesesRestantes === 0) return objetivo - actual;
  return Math.round((objetivo - actual) / Math.max(mesesRestantes, 1));
};

// ========== MANIPULACIÓN DE DATOS ==========

// Filtrar array por término de búsqueda
export const filtrarPorBusqueda = (array, termino, campos) => {
  if (!termino) return array;
  
  const terminoLower = termino.toLowerCase();
  return array.filter(item => 
    campos.some(campo => 
      item[campo]?.toString().toLowerCase().includes(terminoLower)
    )
  );
};

// Ordenar array
export const ordenarArray = (array, campo, direccion = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[campo] < b[campo]) return direccion === 'asc' ? -1 : 1;
    if (a[campo] > b[campo]) return direccion === 'asc' ? 1 : -1;
    return 0;
  });
};

// Agrupar array por propiedad
export const agruparPor = (array, propiedad) => {
  return array.reduce((resultado, item) => {
    const grupo = item[propiedad];
    if (!resultado[grupo]) {
      resultado[grupo] = [];
    }
    resultado[grupo].push(item);
    return resultado;
  }, {});
};

// ========== MANEJO DE ERRORES ==========

// Obtener mensaje de error amigable
export const obtenerMensajeError = (error) => {
  if (typeof error === 'string') return error;
  
  if (error.code) {
    const mensajesPorCodigo = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Este email ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
    };
    return mensajesPorCodigo[error.code] || error.message;
  }
  
  return error.message || 'Error desconocido';
};

// ========== GENERACIÓN DE IDs ==========

// Generar ID único
export const generarId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generar número de pedido
export const generarNumeroPedido = () => {
  return `PED-${Date.now()}`;
};
