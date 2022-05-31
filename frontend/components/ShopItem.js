import {
    Box,
    AspectRatio
} from "@chakra-ui/react";

import Image from 'next/image';

import { useState } from "react";
// import { supabaseClient } from "../lib/client";

export default function ShopItem() {


    return (
        <AspectRatio maxW='225px' ratio={1}>
            <Box       
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            bg="gray.200">
                <Image src="/vercel.svg" layout="fill" />
            </Box>
        </AspectRatio>
    )
}