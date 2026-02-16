import {
  ref,
  uploadBytes,
  getBytes,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from '../config/firebase';

export const storageService = {
  // Subir archivo a Storage
  uploadFile: async (carpeta, nombreArchivo, archivo) => {
    try {
      const storageRef = ref(storage, `${carpeta}/${nombreArchivo}`);
      const snapshot = await uploadBytes(storageRef, archivo);
      return {
        path: snapshot.ref.fullPath,
        name: nombreArchivo,
        size: archivo.size,
        type: archivo.type,
      };
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      throw error;
    }
  },

  // Descargar archivo
  downloadFile: async (ruta) => {
    try {
      const fileRef = ref(storage, ruta);
      const fileBytes = await getBytes(fileRef);
      return fileBytes;
    } catch (error) {
      console.error('Error descargando archivo:', error);
      throw error;
    }
  },

  // Eliminar archivo
  deleteFile: async (ruta) => {
    try {
      const fileRef = ref(storage, ruta);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      throw error;
    }
  },

  // Listar archivos de una carpeta
  listFiles: async (carpeta) => {
    try {
      const folderRef = ref(storage, carpeta);
      const result = await listAll(folderRef);
      return result.items.map(item => ({
        name: item.name,
        path: item.fullPath,
      }));
    } catch (error) {
      console.error('Error listando archivos:', error);
      throw error;
    }
  },

  // Subir PDF específico (presupuesto, pedido, factura)
  uploadPedidoDocument: async (pedidoId, tipo, archivo) => {
    // tipo: 'presupuesto', 'pedido', 'factura'
    try {
      const nombreArchivo = `${tipo}_${pedidoId}_${Date.now()}.pdf`;
      const resultado = await this.uploadFile(`pedidos/${pedidoId}`, nombreArchivo, archivo);
      return {
        ...resultado,
        tipo,
        uploadedAt: new Date(),
      };
    } catch (error) {
      console.error('Error subiendo documento de pedido:', error);
      throw error;
    }
  },

  // Obtener URLs de descarga (genera URLs públicas)
  getDownloadURL: async (ruta) => {
    try {
      // Para Firebase, normalmente usarías getDownloadURL de firebase/storage
      // Aquí es un placeholder - necesita configurarse en Firebase
      const fileRef = ref(storage, ruta);
      // return getDownloadURL(fileRef); // Descomenta cuando lo integres
      return `https://firebase-storage-url/${ruta}`;
    } catch (error) {
      console.error('Error obteniendo URL de descarga:', error);
      throw error;
    }
  },
};
