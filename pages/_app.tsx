import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../hooks/useAuth";

import "../firebase/config";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
