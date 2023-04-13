import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./config";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  orderBy,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

class FirebaseInit {
  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    }
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }
  //Login de inicio de sesion
  async iniciarSesion(email, contraseña) {
    return signInWithEmailAndPassword(this.auth, email, contraseña);
  }
  //Cerrar sesion de usuario
  async cerrarSesion() {
    await this.auth.signOut();
  }
  //Registrar precio
  async postPrecio(precioServicio) {
    await addDoc(collection(this.db, "Precios"), { ...precioServicio });
  }
  //Obtener todos los precios
  async getPrecios() {
    const q = query(collection(this.db, "Precios"));
    const querySnapshot = await getDocs(q);

    const documentos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return documentos;
  }
  //Eliminar precio
  async deletePrecio(id) {
    await deleteDoc(doc(this.db, "Precios", id));
  }
  //Obtener un solo precio
  async getPrecio(id) {
    const docRef = doc(this.db, "Precios", id);
    const docSnap = await getDoc(docRef);
    const documento = docSnap.data();
    return {
      id: id,
      ...documento,
    };
  }
  //Actualizar un precio con id
  async actualizarPrecio(id, objeto) {
    await setDoc(doc(this.db, "Precios", id), { ...objeto }, { merge: true });
  }
  //Registrar cliente
  async postCliente(cliente) {
    await addDoc(collection(this.db, "Clientes"), { ...cliente });
  }
  //Obtener clientes con costuras pendientes
  async getClientesP() {
    const q = query(
      collection(this.db, "Clientes"),
      where("estatus", "==", "pendiente"),
      orderBy("fechaOrdenamiento", "desc")
    );
    const querySnapshot = await getDocs(q);

    const documentos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return documentos;
  }
  //Obtener clientes con costuras terminadas
  async getClientesT() {
    const q = query(
      collection(this.db, "Clientes"),
      where("estatus", "==", "terminado"),
      orderBy("fechaOrdenamiento", "desc")
    );
    const querySnapshot = await getDocs(q);

    const documentos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return documentos;
  }
  //Obtener clientes con costuras entregadas
  async getClientesE() {
    const q = query(
      collection(this.db, "Clientes"),
      where("estatus", "==", "entregado"),
      orderBy("fechaOrdenamiento", "desc")
    );
    const querySnapshot = await getDocs(q);

    const documentos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return documentos;
  }
  //Obtener un solo cliente
  async getCliente(id) {
    const docRef = doc(this.db, "Clientes", id);
    const docSnap = await getDoc(docRef);
    const documento = docSnap.data();
    return documento;
  }
  //Borrar un documento con id
  async deleteCliente(id) {
    await deleteDoc(doc(this.db, "Clientes", id));
  }
  //Actualizar un documento con id
  async actualizarCliente(id, objeto) {
    await setDoc(doc(this.db, "Clientes", id), { ...objeto }, { merge: true });
  }
}
const firebase = new FirebaseInit();
export default firebase;
