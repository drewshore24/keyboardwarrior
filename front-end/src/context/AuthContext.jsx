import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/fire";
import { doc, onSnapshot } from "firebase/firestore";
import { readData } from "../utils/crud";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedOut(false);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setUser(doc.data());
        });
      } else {
        setIsLoggedOut(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      readData("gameStats", user?.uid).then((res) => {
        setStats(res);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ isLoggedOut, user, showModal, setShowModal, stats, setStats }}
    >
      {children}
    </UserContext.Provider>
  );
};
