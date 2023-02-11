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
  //login de inici de sesion
  async iniciarSesion(email, contraseña) {
    return signInWithEmailAndPassword(this.auth, email, contraseña);
  }
  //Cerrar sesion de usuario

  async cerrarSesion() {
    await this.auth.signOut();
  }
  //registrar cliente
  async postCliente(cliente) {
    await addDoc(collection(this.db, "Clientes"), { ...cliente });
  }
  //obtener clientes con costuras pendientes
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
  //obtener clientes con costuras terminadas
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
  //obtener clientes con costuras entregadas
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
  //actualizar un documento con id
  async actualizarCliente(id, objeto) {
    // Add a new document in collection "cities"
    await setDoc(doc(this.db, "Clientes", id), { ...objeto }, { merge: true });
  }
}
const firebase = new FirebaseInit();
export default firebase;
