import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ========== VENDEDORES ==========
export const vendedorService = {
  // Obtener todos los vendedores
  getAll: async () => {
    try {
      const vendedoresRef = collection(db, 'vendedores');
      const snapshot = await getDocs(vendedoresRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo vendedores:', error);
      throw error;
    }
  },

  // Crear vendedor
  create: async (vendedorData) => {
    try {
      const vendedoresRef = collection(db, 'vendedores');
      const docRef = await addDoc(vendedoresRef, {
        ...vendedorData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: docRef.id, ...vendedorData };
    } catch (error) {
      console.error('Error creando vendedor:', error);
      throw error;
    }
  },

  // Actualizar vendedor
  update: async (id, vendedorData) => {
    try {
      const vendedorRef = doc(db, 'vendedores', id);
      await updateDoc(vendedorRef, {
        ...vendedorData,
        updatedAt: new Date(),
      });
      return { id, ...vendedorData };
    } catch (error) {
      console.error('Error actualizando vendedor:', error);
      throw error;
    }
  },

  // Eliminar vendedor
  delete: async (id) => {
    try {
      const vendedorRef = doc(db, 'vendedores', id);
      await deleteDoc(vendedorRef);
    } catch (error) {
      console.error('Error eliminando vendedor:', error);
      throw error;
    }
  },
};

// ========== USUARIOS ==========
export const usuarioService = {
  // Obtener todos los usuarios
  getAll: async () => {
    try {
      const usuariosRef = collection(db, 'usuarios');
      const snapshot = await getDocs(usuariosRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Crear usuario
  create: async (usuarioData) => {
    try {
      const usuariosRef = collection(db, 'usuarios');
      const docRef = await addDoc(usuariosRef, {
        ...usuarioData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: docRef.id, ...usuarioData };
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  update: async (id, usuarioData) => {
    try {
      const usuarioRef = doc(db, 'usuarios', id);
      await updateDoc(usuarioRef, {
        ...usuarioData,
        updatedAt: new Date(),
      });
      return { id, ...usuarioData };
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  delete: async (id) => {
    try {
      const usuarioRef = doc(db, 'usuarios', id);
      await deleteDoc(usuarioRef);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },
};

// ========== CLIENTES ==========
export const clienteService = {
  // Obtener todos los clientes
  getAll: async () => {
    try {
      const clientesRef = collection(db, 'clientes');
      const snapshot = await getDocs(clientesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      throw error;
    }
  },

  // Obtener clientes por vendedor
  getByVendedor: async (vendedorId) => {
    try {
      const clientesRef = collection(db, 'clientes');
      const q = query(clientesRef, where('vendedorAsignado', '==', vendedorId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo clientes por vendedor:', error);
      throw error;
    }
  },

  // Crear cliente
  create: async (clienteData) => {
    try {
      const clientesRef = collection(db, 'clientes');
      const docRef = await addDoc(clientesRef, {
        ...clienteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: docRef.id, ...clienteData };
    } catch (error) {
      console.error('Error creando cliente:', error);
      throw error;
    }
  },

  // Actualizar cliente
  update: async (id, clienteData) => {
    try {
      const clienteRef = doc(db, 'clientes', id);
      await updateDoc(clienteRef, {
        ...clienteData,
        updatedAt: new Date(),
      });
      return { id, ...clienteData };
    } catch (error) {
      console.error('Error actualizando cliente:', error);
      throw error;
    }
  },

  // Eliminar cliente
  delete: async (id) => {
    try {
      const clienteRef = doc(db, 'clientes', id);
      await deleteDoc(clienteRef);
    } catch (error) {
      console.error('Error eliminando cliente:', error);
      throw error;
    }
  },
};

// ========== PEDIDOS ==========
export const pedidoService = {
  // Obtener todos los pedidos
  getAll: async () => {
    try {
      const pedidosRef = collection(db, 'pedidos');
      const q = query(pedidosRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo pedidos:', error);
      throw error;
    }
  },

  // Obtener pedidos por cliente
  getByCliente: async (clienteId) => {
    try {
      const pedidosRef = collection(db, 'pedidos');
      const q = query(pedidosRef, where('clienteId', '==', clienteId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo pedidos por cliente:', error);
      throw error;
    }
  },

  // Obtener pedidos por vendedor
  getByVendedor: async (vendedorId) => {
    try {
      const pedidosRef = collection(db, 'pedidos');
      const q = query(pedidosRef, where('vendedorId', '==', vendedorId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo pedidos por vendedor:', error);
      throw error;
    }
  },

  // Crear pedido
  create: async (pedidoData) => {
    try {
      const pedidosRef = collection(db, 'pedidos');
      const docRef = await addDoc(pedidosRef, {
        ...pedidoData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { id: docRef.id, ...pedidoData };
    } catch (error) {
      console.error('Error creando pedido:', error);
      throw error;
    }
  },

  // Actualizar pedido
  update: async (id, pedidoData) => {
    try {
      const pedidoRef = doc(db, 'pedidos', id);
      await updateDoc(pedidoRef, {
        ...pedidoData,
        updatedAt: new Date(),
      });
      return { id, ...pedidoData };
    } catch (error) {
      console.error('Error actualizando pedido:', error);
      throw error;
    }
  },

  // Eliminar pedido
  delete: async (id) => {
    try {
      const pedidoRef = doc(db, 'pedidos', id);
      await deleteDoc(pedidoRef);
    } catch (error) {
      console.error('Error eliminando pedido:', error);
      throw error;
    }
  },
};
