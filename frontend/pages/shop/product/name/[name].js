// Import Chakra UI components:
import {
    Box,
    Heading,
} from "@chakra-ui/react";

// Import Next JS router:
import { useRouter } from "next/router";


export default function Product({query}) {
    const router = useRouter();
    console.log(query)

    return (
        <Box>
            <Heading>{query.name}</Heading>
        </Box>
    );
}


// Get query from initial props:
Product.getInitialProps = async ({ query }) => {
    return { query };
}