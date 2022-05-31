import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  Tag,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  StackDivider,
  Flex,
  Heading,
  AspectRatio,
  Container,
} from "@chakra-ui/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
// import { supabaseClient } from "../lib/client";

const Home = () => {
  const initialRef = useRef();

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const user = supabaseClient.auth.user();

  return (
    <div>
      <Head>
        <title>Ordering System</title>
        <meta
          name="description"
          content="Ordering System is a platform for managing your customers orders."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex minH="100vh" bg="pink.500" direction="column" align="center">
          <AspectRatio minW="100%" ratio={[1, 1, 1.8, 2.5]}>
          <Flex  direction="column" justify="center" align="center" color="white" mt="10" minW="100%" bg="gray.300" bgImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(https://)" bgPos="50% 35%" bgSize="cover" >
            <Heading mb="4">Welcome to Ordering System!</Heading>
            <Text m="4">The easy way to order all of your needed products online!</Text>
          </Flex>
          </AspectRatio>
          <Container maxW="900px" w="86%">
          <Flex color="white" my="40" direction="column" minW="320px" height="80%">
            <Heading>What is Ordering System?</Heading>
            <Text>Ordering System is an online ordering system designed with Next.js and Supabase</Text>
            <Stack mt="16" direction="column" divider={<StackDivider bg="white" />} spacing="8">
              <Box>
                <Heading size="lg">Get started</Heading>
                <Text>First, you will need to create an account, if you don't already have one.</Text>
              </Box>
              <Box>
                <Heading size="lg">Get authenticated</Heading>
                <Text>Great! You have your account... what now?</Text>
                <Text>Before you can start ordering you have to get authenticated. Before you can request authentication you have to enter some information.</Text>
                <Text>Head over >here, a request button will become available once you've fulfilled the info requirements.</Text>
              </Box>
              <Box>
                <Heading size="lg">Place an order</Heading>
                <Text>Awesome! If you're an authenticated customer now you can place your first order!</Text>
                <Text>Before you can start ordering you have to get authenticated. Before you can request authentication you have to enter some information.</Text>
                <Text>Head over >here, a request button will become available once you've fulfilled the info requirements.</Text>
              </Box>
            </Stack>
          </Flex>
          </Container>
        </Flex>
      </main>
    </div>
  );
};

export default Home;

