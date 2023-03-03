import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import { useEffect } from "react";

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
export const db = getFirestore(app);

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

export const deleteFolder = async (folderId: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    await deleteDoc(doc(db, uid, folderId));
  } catch(err) {
    console.error("Error during deleteFolder: ", err);
  }
}

export const updateFolderName = async (folderId: string, newFolderName: string) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const folderRef = doc(db, uid, folderId);
    await updateDoc(folderRef, {
      folderName: newFolderName,
    });
  } catch(err) {
    console.error("Error during updateFolerName: ", err);
  }
}

interface Folders {
  id: string;
  folderName: string;
}

export const listenForFolders = async (setFolders: React.Dispatch<React.SetStateAction<Folders[] | null>>) => {
  try {
    const auth = getAuth();
    const uid = auth?.currentUser?.uid || '';
    const unsubscribe = onSnapshot(collection(db, uid), docs => {
      const folders: Folders[] = [];
      docs.forEach(doc => {
        folders.push({
          id: doc.id,
          folderName: doc.data().folderName,
        })
      });
      setFolders(folders);
    });
    return () => unsubscribe();
  } catch(err) {
    console.error("Error during listenForFolders: ", err);
  }
}

interface FolderTasks {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskUntilDate: string;
}

export const listenForFolderTasks = async (folderId: string | null, setFolderTasks: React.Dispatch<React.SetStateAction<FolderTasks[] | null>>) => {
  try {
    useEffect(() => {
      const auth = getAuth();
      const uid = auth?.currentUser?.uid || '';
      if (folderId) {
        const unsubscribe = onSnapshot(collection(db, uid, folderId, "tasks"), docs => {
          const tasks: FolderTasks[] = [];
          docs.forEach(doc => {
            tasks.push({
              taskName: doc.data().taskName,
              taskDescription: doc.data().taskDescription,
              taskPriority: doc.data().taskPriority,
              taskUntilDate: doc.data().taskUntilDate,
            });
          });
          setFolderTasks(tasks);
        });
        return () => unsubscribe();
      }
    }, [folderId])
  } catch(err) {
    console.error("Error during listenForFolderTasks: ", err);
  }
}

export const listenForFolderName = (folderId: string | null, setFolderName: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    useEffect(() => {
      const auth = getAuth();
      const uid = auth?.currentUser?.uid || '';
      if (folderId) {
        const unsubscribe = onSnapshot(doc(db, uid, folderId), doc => {
          setFolderName(doc.data()?.folderName)
        });
        return () => unsubscribe();
      }
    }, [folderId])
  } catch(err) {
    console.error("Error during listenForFolderName: ", err);
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

// Get the task data

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
