import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { supabaseClient } from "../lib/client";
import customTheme from "../lib/theme";
import Layout from "../components/Layout";

// Import the wrapper from next-redux-wrapper:
import { wrapper } from "../store/store";

// import dispatch from redux:
import { useDispatch } from "react-redux";

// import actions from authReducer:
import { setIsLoggedIn, setUser, setIsAuthLoading } from "../store/auth/authSlice";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // const user = supabaseClient.auth.user();
  const user = "no supabase"
  const dispatch = useDispatch();

  useEffect(() => {
    // Auth logic with "user" from supabase
  }, [router]);

  useEffect(() => {
    // if (user) {
    //   if (router.pathname === "/signin") {
    //     router.push("/");
    //   }
    // }
  }, [router.pathname, user, router]);

  const handleAuthSession = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);