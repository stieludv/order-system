// Import Chakra UI components:
import {
    Box,
    Heading,
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbItem,
    SimpleGrid,
    GridItem,
    Image as ChakraImage,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Container,
} from "@chakra-ui/react";

// Import Next JS router:
import { useRouter } from "next/router";


export default function Product({ query }) {
    const router = useRouter();
    console.log(query)

    return (
        <Container maxW="900px" w="86%">
            <Box>
                <Heading>{query.id}</Heading>
                <Breadcrumb colorScheme="pink.500">
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>Shop</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Ultra</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <SimpleGrid rows="2" columns="2" gap="8">
                    <GridItem>
                        <ChakraImage src={`https://`} alt={query.id} />
                    </GridItem>
                    <GridItem>
                        <Heading>{query.id}</Heading>
                        <Text>This is the product description.</Text>
                    </GridItem>
                    <GridItem gridColumnStart="1" gridColumnEnd="3">
                        <Accordion>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton _expanded={{ bg: 'pink.500', color: 'white' }}>
                                        <Box flex='1' textAlign='left'>
                                            Delivery days
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton _expanded={{ bg: 'pink.500', color: 'white' }}>
                                    <Box flex='1' textAlign='left'>
                                        Deadlines
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton _expanded={{ bg: 'pink.500', color: 'white' }}>
                                    <Box flex='1' textAlign='left'>
                                        Standard sizes
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Container>
    );
}


// Get query from initial props:
Product.getInitialProps = async ({ query }) => {
    return { query };
}