import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/fire";
import { v4 as uuidv4 } from "uuid";

const id1 = uuidv4().toUpperCase().slice(0, 13).replace(/-/g, "");

export const createData = async (collectionName, data) => {
  const id = id1;

  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      id,
      ...data,
    });
  } catch (error) {
    console.error("Error adding document: ", error.message);
  }
};

export const readData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document");
    }
  } catch (error) {
    console.error("Error reading documen: t", error.message);
  }
};

export const updateData = async (collection, id, data) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
      id: id,
      ...data,
    });
    console.log("document updated");
  } catch (error) {
    console.error("Error updating document: ", error.message);
  }
};

export const deleteData = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    console.log("document deleted");
  } catch (error) {
    console.error("Error deleting document: ", error.message);
  }
};

export const readAllData = async (collectionName) => {
  try {
    const newDataArr = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      newDataArr.push(doc.data());
    });
    return newDataArr;
  } catch (error) {
    console.error("Error reading data collection: ", error.message);
  }
};

export const listenToCollection = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  return onSnapshot(collectionRef, (querySnapshot) => {
    console.log(querySnapshot, "snapshot");

    const newDataArr = [];
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data());
    });
    callback(newDataArr);
  });
};
