import {
    Alert,
    AlertIcon,
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
  } from "@chakra-ui/react";

  import { useState } from "react";
  import { supabaseClient } from "../lib/client";

  // Import redux hooks:
  import { useSelector, useDispatch } from "react-redux";

  // Import reducer actions from authReducer:
  import { setIsLoggedIn, setUser, setIsAuthLoading } from "../store/auth/authSlice";
  
  const SignIn = () => {
    // Local state changes to UI:
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Create dispatch const:
    const dispatch = useDispatch();

    // Get state info with useSelector hook:
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);

    // Create a function to handle the login success and update the state accordingly:
    const loginSuccess = (user) => {
      // Use the setIsLoggedIn action to update the state:
      dispatch(setIsLoggedIn(true));
      // Update our user state:
      dispatch(setUser(user));
    } 
  
    const submitHandler = async (event) => {
      event.preventDefault();
      // Dispatch action to set isAuthLoading to true:
      dispatch(setIsAuthLoading(true));

      setError(null);
      try {
        const { error } = await supabaseClient.auth.signIn({
          email,
        });

        // If there is an error set the error state:
        // otherwise, set the submit state to true:
        if (error) {
          setError(error.message);
        } 
        else {
          setIsSubmitted(true);
        }
      } 
      catch (error) {
        setError(error.message);
      } 
      finally {
        // Dispatch action and set isAuthLoading to false:
        dispatch(setIsAuthLoading(false));
      }
    };
  
    const changeHandler = (event) => {
      setEmail(event.target.value);
    };
  
    return (
      <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }} bg="gray.50">
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" m="6">
            Sign in
          </Heading>
          {error && (
            <Alert status="error" mb="6">
              <AlertIcon />
              <Text textAlign="center">{error}</Text>
            </Alert>
          )}
          <Box
            py="8"
            px={{ base: "4", md: "10" }}
            shadow="base"
            rounded={{ sm: "lg" }}
            bg="white"
          >
            {isSubmitted ? (
              <Heading size="md" textAlign="center" color="gray.600">
                Please check {email} for login link
              </Heading>
            ) : (
              <chakra.form onSubmit={submitHandler}>
                <Stack spacing="6">
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="pink"
                    size="lg"
                    fontSize="md"
                    isLoading={isAuthLoading}
                  >
                    Sign In
                  </Button>
                </Stack>
              </chakra.form>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default SignIn;