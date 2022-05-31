import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  List,
  HStack,
  Image as ChakraImage,
  Link,
} from "@chakra-ui/react";

import NavLink from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { supabaseClient } from "../lib/client";

// Import redux hooks:
import { useSelector, useDispatch } from "react-redux";

// Import next-redux-wrapper wrapper:
import { wrapper } from "../store/store";

// Import reducer actions from authReducer:
import { setIsLoggedIn, setUser, setIsAuthLoading } from "../store/auth/authSlice";


export const getStaticProps = wrapper.getStaticProps(store => ({ preview }) => {
  const state = store.getState();
  store.dispatch(setIsLoggedIn(state.auth.isLoggedIn)); // Was set in another page?
  store.dispatch(setUser(state.auth.user)); // Was set in another page?
});


const Navbar = () => {
  const router = useRouter();
  const currentPathname = router.pathname;

  // Use the useSelector hook to get the state from the store:
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // Get the user from state:
  const user = useSelector((state) => state.auth.user);
  // Get the isAuthLoading state from state:
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);

  // create dispatch const:
  const dispatch = useDispatch();

  // Set user with useEffect so that we don't get hydration error
  // user is client side request and storage so server has "user = undefined"
  // and thus it does not match.
  useEffect(() => {
    // Check if we have a user in localStorage:
    // if (supabaseClient.auth.user()?.id) {
    //   dispatch(setUser(supabaseClient.auth.user()));
    // }
    // else {
    //   dispatch(setUser({}));
    // }
  }, [dispatch, setUser]);


  // useEffect to check if the user is logged in or not:
  // this only runs when the page is loaded on client sides
  useEffect(() => {
    if (!user?.id) {
      // Dispatch action and set isLoggedIn to false:
      dispatch(setIsLoggedIn(false));
    } else {
      // Dispatch action and set isLoggedIn to true:
      dispatch(setIsLoggedIn(true));
    }
  }, [user, dispatch, setIsLoggedIn]);

  const logoutHandler = async () => {
    try {
      // Dispatch action to set the isAuthLoading to true:
      dispatch(setIsAuthLoading(true));

      // Try to sign out:
      await supabaseClient.auth.signOut();

      // Change page to the login page:
      router.push("/signin");

      // Update state to set isLoggedIn to false:
      dispatch(setIsLoggedIn(false));

      // Also set user to false:
      dispatch(setUser(null));
    }
    catch (error) {
      router.push("/signin");
    }
    finally {
      // Dispatch action and set isAuthLoading to false:
      dispatch(setIsAuthLoading(false));
    }
  };

  return (
    <Box height="100%" p="5" bg="white" color="pink.500">
      <Box maxW="6xl" mx="auto">
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
        >
          <ChakraImage
            // width="150px"
            width="200px"
            objectFit="contain"
            src=''
            alt='logo'
          />
          <Box>
            <HStack variant="row" spacing="4">
              <NavLink href="/" passHref><Link textDecoration={currentPathname ===  "/" ? "underline" : "none"}>Home</Link></NavLink>
              <NavLink href="/contact" passHref><Link textDecoration={currentPathname ===  "/contact" ? "underline" : "none"}>Contact</Link></NavLink>
              <NavLink href="/manage" passHref><Link textDecoration={currentPathname ===  "/manage" ? "underline" : "none"}>Manage</Link></NavLink>
              <NavLink href="/shop" passHref><Link textDecoration={currentPathname.slice(0, "/shop".length) ===  "/shop"  ? "underline" : "none"}>Shop</Link></NavLink>
              {isLoggedIn && <NavLink href="/todos" passHref><Link textDecoration={currentPathname ===  "/todos" ? "underline" : "none"}>Todos</Link></NavLink>}
              {isLoggedIn && <NavLink href="/manage" passHref><Link textDecoration={currentPathname ===  "/profile" ? "underline" : "none"}>Profile</Link></NavLink>}
              <ButtonGroup spacing="4" ml="6">
                {isLoggedIn ? (
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    onClick={logoutHandler}
                    isLoading={isAuthLoading}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button colorScheme="pink" isLoading={isAuthLoading}>
                    <NavLink href="/signin">Sign In</NavLink>
                  </Button>
                )}
              </ButtonGroup>
            </HStack>

          </Box>
        </Flex>
      </Box>
    </Box>
  );
};


export default Navbar;

