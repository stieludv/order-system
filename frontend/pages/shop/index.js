import {
    Box,
    Text,
    SimpleGrid,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Container,
} from "@chakra-ui/react";

import { Fragment, useState } from "react";
// import { supabaseClient } from "../../lib/client";

import ShopItem from "../../components/ShopItem";

export default function Shop() {

    return (
        <Fragment>
            <Alert status='warning'>
                <Container maxW="86%" centerContent flexDirection="row">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>NOTICE!</AlertTitle>
                        <AlertDescription>RADIOACTIVE PRODUCTS</AlertDescription>
                    </Box>
                </Container>
            </Alert>
            <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }} bg="gray.50">
                <SimpleGrid
                    columns={{ base: 2, md: 3, lg: 5 }}
                    gap={{ base: "2", md: "4", lg: "6" }}
                    m="10"
                >
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                </SimpleGrid>
            </Box>
        </Fragment>
    );
}

