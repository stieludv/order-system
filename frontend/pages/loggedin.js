// Import components from chakraui:
import { 
    Button,
    Text,
    Heading,
    Box,
} from "@chakra-ui/react";


export default function LoggedIn() {    

    const clickHandler = () => {
        // window.open("about:blank", "_self");
        // window.close();
        window.opener=null;
        window.open("about:blank", "_self");
        window.close();
    }

    return (
        <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }} bg="gray.50">
            <Heading>Logged In</Heading>
            <Text>
                You are logged in! You may close this page.
            </Text>
        </Box>
    );
}

