import { useState, useEffect } from "react";
import { storage, db, timestamp } from "../firebase/config";

const useStorage = () => {
  const [progress, setProgess] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const uploadBlog = (file, title) => {
    const storageRef = storage.ref(file?.name);
    const collectionRef = db.collection("blogs");

    setLoading(true);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgess(percentage);
      },
      (err) => {
        setError(err.message);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt, title });
        setLoading(false);
        setUrl(url);
      }
    );
  };

  return { progress, url, error, uploadBlog, loading };
};

export default useStorage;
