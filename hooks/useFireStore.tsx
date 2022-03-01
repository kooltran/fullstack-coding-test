import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";

const useFireStore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getDocs = db
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => getDocs();
  }, [collection]);

  return { docs };
};

export default useFireStore;
