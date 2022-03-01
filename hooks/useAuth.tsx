import { useState, useContext, createContext, ReactNode } from "react";
import { useRouter } from "next/router";

import { auth, db } from "../firebase/config";

const AuthContext = createContext({ user: {} });

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createUser = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signUp = ({ email, password }) => {
    setLoading(true);
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        localStorage.setItem("accessToken", response.user._delegate.accessToken);
        setLoading(false);
        createUser({ uid: response.user.uid, email });
        router.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          setError("The email address is already in use by another account");
        }
      });
  };

  const signIn = ({ email, password }) => {
    setLoading(true);
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response: any) => {
        localStorage.setItem("accessToken", response.user._delegate.accessToken);
        setUser(response.user);
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          setError("User not found");
        } else if (error.code === "auth/wrong-password") {
          setError("Password is invalid");
        }
      });
  };

  return {
    user,
    error,
    loading,
    signUp,
    signIn,
  };
};

export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
};

export const useAuth: any = () => {
  return useContext(AuthContext);
};
