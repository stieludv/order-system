import {
    Box,
    Text,
} from "@chakra-ui/react";


export default function Footer() {
    return (
        <footer>
            <Box as="footer"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="4"
                bg="gray.100"
                height="100%"
                borderTopWidth="1px"
                borderTopColor="gray.200"
                borderTopStyle="solid"
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
                borderBottomStyle="solid"
                flexDirection="row">
                <Text fontSize="sm" ml={"8%"}>
                    © 2022 Ordering System. All rights reserved.
                </Text>
            </Box>
        </footer>
    );
}

