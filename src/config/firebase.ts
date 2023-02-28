import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBr5QxoRbz0QBDHJx9s8Y5vmxz5N8Qq_VY",
  authDomain: "tasksflow-e7dc4.firebaseapp.com",
  projectId: "tasksflow-e7dc4",
  storageBucket: "tasksflow-e7dc4.appspot.com",
  messagingSenderId: "104793779186",
  appId: "1:104793779186:web:bd23dba98fef3ffd90d96b",
  measurementId: "G-JQE78LKCQN"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Operations with folders

export const addFolder = async (folderName: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    await addDoc(collection(db, uid), {
      folderName: folderName
    })
  } catch(err) {
    console.error("Error during addFolder: ", err);
  }
}

export const deleteFolder = async (folderID: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    await deleteDoc(doc(db, uid, folderID));
  } catch(err) {
    console.error("Error during deleteFolder: ", err);
  }
}

export const updateFolderName = async (folderID: string, newFolderName: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const folderRef = doc(db, uid, folderID);
    await updateDoc(folderRef, {
      folderName: newFolderName,
    });
  } catch(err) {
    console.error("Error during updateFolerName: ", err);
  }
}

export const getFolderData = async (folderID: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const folderRef = doc(db, uid, folderID);
    onSnapshot(folderRef, (doc) => {
      return doc.data();
    });
  } catch(err) {
    console.error("Error during getFolder: ", err);
  }
}

// Operations with tasks

interface Task {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskUntilDate: string;
}

export const addTask = async (folderID: string, task: Task) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const collectionRef = collection(db, uid, folderID, "tasks");
    await addDoc(collectionRef, {
      ...task
    })
  } catch(err) {
    console.error("Error during addTask: ", err);
  }
}

export const deleteTask = async (folderID: string, taskID: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    await deleteDoc(doc(db, uid, folderID, "tasks", taskID));
  } catch(err) {
    console.error("Error during deleteTask: ", err);
  }
}

export const updateTask = async (folderID: string, taskID: string, propertyName: string, newValue: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const taskRef = doc(db, uid, folderID, "tasks", taskID);
    await updateDoc(taskRef, {
      [propertyName]: newValue,
    });
  } catch(err) {
    console.error("Error during updateTask: ", err);
  }
}

export const getTaskData = async (folderID: string, taskID: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const taskRef = doc(db, uid, folderID, "tasks", taskID);
    onSnapshot(taskRef, (doc) => {
      return doc.data();
    });
  } catch(err) {
    console.error("Error during getFolder: ", err);
  }
}

// Authentication

export const SignIn = async () => {
  try {
    const auth = getAuth();
    await signInWithPopup(auth, provider);
  } catch(err) {
    console.error("Error during signing in: ", err);
  }
}

export const SignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch(err) {
    console.error("Error during signing out: ", err);
  }
}
