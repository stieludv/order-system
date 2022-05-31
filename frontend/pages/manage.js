import {
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image as ChakraImage,
    Heading,
    Flex,
    Spacer,
    Container,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    GridItem,
    SimpleGrid,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    errorMessage,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormHelperText,
    Switch,
    ButtonGroup,
    Alert,
    AlertIcon,
    InputRightAddon,
    InputLeftAddon,
    InputGroup,
    Checkbox
} from "@chakra-ui/react";

import {
    ChevronDownIcon,
    AddIcon,
    CheckIcon,
    MinusIcon,
    DeleteIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    AttachmentIcon,
} from "@chakra-ui/icons";

import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from "chakra-react-select";

// Import image and router from next.js
import { useRouter } from "next/router";
import Image from "next/image";

import { useState, useRef } from "react";
// import { supabaseClient } from "../lib/client";

export default function Manage() {
    const router = useRouter();


    ///
    // Refs
    ///

    // None at the moment


    /// 
    // LOCAL STATE
    ///

    const [addingProduct, setAddingProduct] = useState(false);
    const [addProductError, setAddProductError] = useState("");
    const [productName, setProductName] = useState("");
    const [productSlug, setProductSlug] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategories, setProductCategories] = useState([]);
    const [productImage, setProductImage] = useState({});
    const [productIsRadioactive, setProductIsRadioactive] = useState(false);
    const [productModalStage, setProductModalStage] = useState(0);
    const [autoGenSlug, setAutoGenSlug] = useState(true);

    // To save & update the state in Select components: 
    const [constraintPropsValue, setConstraintPropsValue] = useState([]);
    const [categoriesPropsValue, setCategoriesPropsValue] = useState([]);
    const [deliveryDaysPropsValue, setDeliveryDaysPropsValue] = useState([]);
    const [contactOptionsPropsValue, setContactOptionsPropsValue] = useState([]);
    const [deliveryOptionsPropsValue, setDeliveryOptionsPropsValue] = useState([]);

    const defaultProductIsInvalidErrorState = {
        name: false,
        slug: false,
        description: false,
        categories: false,
        image: false,
    }
    const [productIsInvalidError, setProductIsInvalidError] = useState(defaultProductIsInvalidErrorState);

    // Add product button:
    const {
        isOpen: addProductModalIsOpen,
        onOpen: addProductModalOnOpen,
        onClose: addProductModalOnClose,
    } = useDisclosure()

    // Add category button:
    const {
        isOpen: addCategoryModalIsOpen,
        onOpen: addCategoryModalOnOpen,
        onClose: addCategoryModalOnClose,
    } = useDisclosure()

    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [addingCategory, setAddingCategory] = useState(false);


    /// 
    // VARIABLES
    ///

    // Because of how Select component works and how JS reference works:
    // Also so we can write less duplicate object code:
    // Options:
    const optionDeliveryDay = {

    };

    const optionDeliveryOption = {

    };

    const optionCalibrationDay = {

    };


    // Categories:
    const radioactiveProductCategories = [

    ];

    const otherProductCategories = [

    ];


    // Constraints:
    const constraintDeliveryDays = [
        {
            label: "Monday",
            value: "monday",
        },
        {
            label: "Tuesday",
            value: "tuesday",
        },
        {
            label: "Wednesday",
            value: "wednesday",
        },
        {
            label: "Thursday",
            value: "thursday",
        },
        {
            label: "Friday",
            value: "friday",
        },
        {
            label: "Saturday",
            value: "saturday",
        },
        {
            label: "Sunday",
            value: "sunday",
        },
    ];

    const constraintDeliveryOptions = [
        {
            label: "Fedex",
            value: "fedex",
        },
        {
            label: "DHL",
            value: "dhl",
        },
    ];

    const constraintContactOptions = [
        {
            label: "Customer Service",
            value: "customer-service",
        },
    ];


    ///
    // CONSTRAINT COMPONENTS
    ///

    // Constraint input components
    const SelectDeliveryDays = () => {
        return (
            <Select
                isMulti
                colorScheme="pink"
                placeholder="Select delivery days constraints..."
                value={deliveryDaysPropsValue}
                onChange={(value) => setDeliveryDaysPropsValue(value)}
                options={constraintDeliveryDays}
            />
        )
    }

    const SelectDeliveryOptions = () => {
        return (
            <Select
                isMulti
                colorScheme="pink"
                placeholder="Select delivery options constraints..."
                value={deliveryOptionsPropsValue}
                onChange={(value) => setDeliveryOptionsPropsValue(value)}
                options={constraintDeliveryOptions}
            />
        )
    }

    const SelectCalibrationDayInterval = () => {
        return (
            <Input
                type="number"
                placeholder="Calibration interval (in days):"
            />
        )
    }

    const SelectActivityStandardSizes = () => {
        return (
            <Textarea
                rows="3"
                type="text"
                placeholder='Enter sizes seperated by commas (,): "74 MBq, 148 Mbq, etc.."'
            />
        )
    }

    const SelectContactOptions = () => {
        return (
            <Select
                isMulti
                colorScheme="pink"
                placeholder="Select contact options constraints..."
                value={contactOptionsPropsValue}
                onChange={(value) => setContactOptionsPropsValue(value)}
                options={constraintContactOptions}
            />
        )
    }


    ///
    // FUNCTIONS TO HANDLE ONCHANGE/ONCLICK
    ///

    // Clear the <Select /> components state when productIsRadioactive is set to true
    const productIsRadioactiveHandler = (event) => {
        setProductIsRadioactive(!productIsRadioactive);
        // // Only necessary to clear state if productIsRadioactive is true and set to false
        // if (productIsRadioactive) {
        //     // Clear the <Select /> component state
        //     selectInputRef.current.clearValue();
        // }
        // We have to clear it so that you can't select the same values twice
        setConstraintPropsValue([]);
        const categoryIfRadioactive = {
            label: "Radioactive",
            value: "radioactive",
            isFixed: true,
        }
        // If the product is radioactive, add the radioactive category to the categories list
        if (!productIsRadioactive) {
            setCategoriesPropsValue([categoryIfRadioactive]);
        }
        else {
            // Remove the category list:
            setCategoriesPropsValue([]);
        }
    }

    const handleSetProductName = (name) => {
        setProductName(name);
        if (autoGenSlug || productSlug.length === 0) {
            // If slug.length === 0 then the user has not edited the slug yet
            if (productSlug.length === 0) {
                setAutoGenSlug(true);
            }
            // Create slug from name:
            setProductSlug(name.toLowerCase().replace(/ /g, "-"));
        }
    }

    const handleAddProductCancel = () => {
        setProductName("");
        setProductDescription("");
        setProductIsRadioactive(false);
        setAddProductError("");
        setProductSlug("");
        setProductImage({});
        setCategoriesPropsValue([]);
        addProductModalOnClose();
        setProductModalStage(0); // Set modal view state to first page
    }

    const addProductHandler = async (event) => {
        event.preventDefault(); // Prevents typical form submission behavior
        setAddProductError("");

        // Keeping track of state changes to error state
        const newProductIsInvalidError = {
            ...productIsInvalidError,
            error: false,
        }

        // MODAL VIEW 3
        // No error checks

        // MODAL VIEW 2
        // Check if slug is valid URL slug
        if (!/^[a-z0-9-]+$/.test(productSlug)) {
            setProductModalStage(1);
            setAddProductError("Slug must be a valid URL slug");
            newProductIsInvalidError.slug = true;
            newProductIsInvalidError.error = true;
        }
        else {
            newProductIsInvalidError.slug = false;
        }

        // MODAL VIEW 1
        // If productName is not set, we don't want to add a product
        if (productName.length === 0) {
            setProductModalStage(0);
            setAddProductError("Product name must be set");
            newProductIsInvalidError.name = true;
            newProductIsInvalidError.error = true;
        }
        else {
            newProductIsInvalidError.name = false;
        }
        // Check if description is set, if it is set it should be more than 10 characters
        if (productDescription.length <= 10 && productDescription.length !== 0) {
            setProductModalStage(0);
            setAddProductError("Description must have more than 10 characters");
            newProductIsInvalidError.description = true;
            newProductIsInvalidError.error = true;
        }
        else {
            newProductIsInvalidError.description = false;
        }

        // Update error state:
        setProductIsInvalidError(newProductIsInvalidError);

        if (newProductIsInvalidError.error) {
            return;
        }

        setAddingProduct(true); // Sets the loading state (loading)
        // Add to database
        // const user = supabaseClient.auth.user();

        // Add to product table
        // const { addProductError } = await supabaseClient
        //     .from("product")
        //     .insert([{ name: productName, description: productDescription, slug: productSlug, radioactive: productIsRadioactive }]);
        // // If there is an error we need to abort the transaction and not attempt the others:

        // We need to get the product ID so that the constraints and options can linked to each other:
        // We assume no errors since we just added it and passed our error check above.
        // const productId = await supabaseClient
        //     .from("product")
        //     .select(`id:name (${productName})`)

        // // Options have constraints so we first check if we have options
        // // Add to option table
        // const { addOptionError } = await supabaseClient
        //     .from("option")
        //     .insert([{ product_id: productId, name: productName, slug: productSlug }]);
        // // If there is an error we need to abort the transaction and not attempt the others:

        // // If we have options check if/what constraints we have
        // // Add to constraint table
        // const { addConstraintError } = await supabaseClient
        //     .from("constraint")
        //     .insert([{ product_id: productId, name: productName, slug: productSlug, deliveryDays: deliveryDaysPropsValue, deliveryOptions: deliveryOptionsPropsValue, calibrationDayInterval: calibrationDayIntervalPropsValue, activityStandardSizes: activityStandardSizesPropsValue, contactOptions: contactOptionsPropsValue }]);

        // We've got so far, now we can set the loading state to complete:
        setAddingProduct(false); // Sets the loading state (completed)

        if (addProductError) {
            setAddProductError(addProductError.message);
        } else {
            handleAddProductCancel(); // Clear form state & close modal
        }
        // Sucess toast?
    }

    const handleAddCategoryCancel = () => {
        setCategoryName("");
        setCategoryDesc("");
        addCategoryModalOnClose();
    }

    const handleAddCategorySubmit = async (event) => {
        event.preventDefault(); // Prevents typical form submission behavior
        // Set loading to true
        setAddingCategory(true);
        // Add to database
        // Set loading to false
        // Clear form state
        // Close modal
        // Sucess toast?
    }


    return (

        <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }} bg="gray.50">
            <Container maxW={["100%"]} my="4">
                <Flex direction="row" minW="100%">
                    <Heading>Manage</Heading>
                    <Spacer />

                </Flex>
            </Container>
            <Tabs colorScheme="pink" defaultIndex={2}>
                <TabList>
                    <Tab >Orders</Tab>
                    <Tab isDisabled>Users</Tab>
                    <Tab >Products</Tab>
                </TabList>
                <TabPanels mt="8">
                    <TabPanel>
                        {/* <Heading>Orders</Heading> */}

                    </TabPanel>
                    <TabPanel>
                        {/* <Heading>Users</Heading> */}
                    </TabPanel>
                    <TabPanel>
                        {/* <Heading>Products</Heading> */}
                        <Stack direction="row">
                            <Box>
                                <Button onClick={addProductModalOnOpen} rightIcon={<AddIcon ml="2" />}>
                                    Add product
                                </Button>
                                <Modal
                                    onClose={addProductModalOnClose}
                                    isOpen={addProductModalIsOpen}
                                    isCentered
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <form onSubmit={addProductHandler}>
                                            <ModalHeader>Add Product</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody display={productModalStage === 0 ? "" : "none"} pb={6}>
                                                {addProductError && (
                                                    <Alert status="error" borderRadius="lg" mb="6">
                                                        <AlertIcon />
                                                        <Text textAlign="center">{addProductError}</Text>
                                                    </Alert>
                                                )}
                                                <FormControl isInvalid={productIsInvalidError.name}>
                                                    <FormLabel>Name</FormLabel>
                                                    <Input
                                                        placeholder="Product name"
                                                        onChange={(event) => handleSetProductName(event.target.value)}
                                                        value={productName}
                                                    />
                                                </FormControl>
                                                <FormControl isInvalid={productIsInvalidError.slug} mt={4}>
                                                    <FormLabel>Slug</FormLabel>
                                                    <InputGroup>
                                                        <InputLeftAddon children={"https://"} />
                                                        <Input
                                                            placeholder="product-slug-name"
                                                            onChange={(event) => setProductSlug(event.target.value)}
                                                            onInput={() => setAutoGenSlug(false)}
                                                            value={productSlug}
                                                        />
                                                    </InputGroup>
                                                    <FormHelperText>
                                                        A slug is used as the product's URL.
                                                    </FormHelperText>
                                                </FormControl>
                                                <FormControl isInvalid={productIsInvalidError.description} mt={4}>
                                                    <FormLabel>Description (optional)</FormLabel>
                                                    <Textarea
                                                        placeholder="Product description"
                                                        onChange={(event) => setProductDescription(event.target.value)}
                                                        value={productDescription}
                                                    />
                                                    <FormHelperText>
                                                        Description must have more than 10 characters.
                                                    </FormHelperText>
                                                </FormControl>
                                            </ModalBody>

                                            <ModalBody display={productModalStage === 1 ? "" : "none"} pb={6}>
                                                {addProductError && (
                                                    <Alert status="error" borderRadius="lg" mb="6">
                                                        <AlertIcon />
                                                        <Text textAlign="center">{addProductError}</Text>
                                                    </Alert>
                                                )}
                                                <FormControl isInvalid={productIsInvalidError.image}>
                                                    <FormLabel>Image (optional)</FormLabel>
                                                    <InputGroup maxH={10}>
                                                        <Box
                                                            position="relative"
                                                            width="100%"
                                                            mr="1px"
                                                            pr="1px"
                                                            borderColor="gray.300"
                                                            borderStyle="dashed"
                                                            borderWidth="1px"
                                                            rounded="md"
                                                            roundedRight={0}
                                                            transition="all 150ms ease-in-out"
                                                            _hover={{
                                                                borderColor: "gray.400"
                                                            }}
                                                            _active={{
                                                                outline: "1px solid",
                                                                outlineColor: "blue.500",
                                                                borderColor: "blue.500",
                                                                borderStyle: "solid",
                                                                mr: "2px",
                                                                pr: "0",
                                                            }}
                                                        >
                                                            <Text
                                                                zIndex={1}
                                                                position="absolute"
                                                                height="100%"
                                                                width="100%"
                                                                px="16px"
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                {productImage.length > 0 ? productImage[productImage.length - 1].name : "Select an image..."}
                                                            </Text>
                                                            <Input
                                                                zIndex={2}
                                                                position="absolute"
                                                                width="100%"
                                                                height="100%"
                                                                type="file"
                                                                accept="image/*"
                                                                opacity={0}
                                                                onClick={() => setProductImage({})}
                                                                onChange={(event) => setProductImage(event.target.files)}
                                                            />
                                                        </Box>
                                                        <InputRightAddon children={<AttachmentIcon />} />
                                                    </InputGroup>
                                                    <FormHelperText>
                                                        Select a product image to upload.
                                                    </FormHelperText>
                                                </FormControl>

                                                <FormControl mt={4}>
                                                    <FormLabel>Categories</FormLabel>
                                                    <Select
                                                        size="md"  // Default
                                                        isMulti
                                                        colorScheme="pink"
                                                        onChange={(value) => setCategoriesPropsValue(value)}
                                                        value={categoriesPropsValue}
                                                        options={productIsRadioactive ? [
                                                            {
                                                                label: "Radioactive",
                                                                value: "radioactive",
                                                            },
                                                            {
                                                                label: "Third Party Products",
                                                                value: "third-party",
                                                            },
                                                        ] : [
                                                            {
                                                                label: "Accessories",
                                                                value: "accessories",
                                                            },
                                                            {
                                                                label: "Third Party Products",
                                                                value: "third-party",
                                                            },
                                                        ]}
                                                    />
                                                    <FormHelperText>
                                                        Select 1 or more categories.
                                                    </FormHelperText>
                                                </FormControl>
                                                <FormControl mt={4}>
                                                    <FormLabel>Is radioactive?</FormLabel>
                                                    <Switch
                                                        value={productIsRadioactive}
                                                        isChecked={productIsRadioactive}
                                                        id="is-completed"
                                                        colorScheme="pink"
                                                        onChange={(event) => productIsRadioactiveHandler(event)}
                                                    />
                                                </FormControl>
                                            </ModalBody>

                                            <ModalBody display={productModalStage === 2 ? "" : "none"} pb={6}>
                                                {addProductError && (
                                                    <Alert status="error" borderRadius="lg" mb="6">
                                                        <AlertIcon />
                                                        <Text textAlign="center">{addProductError}</Text>
                                                    </Alert>
                                                )}

                                                <FormControl>
                                                    <FormLabel>Options & Constraints</FormLabel>
                                                    <Select
                                                        size="md"  // Default
                                                        isMulti
                                                        colorScheme="pink"
                                                        // How do I get the values / reset values of the select?
                                                        // The value is an array of objects with label and value properties
                                                        onChange={(value) => setConstraintPropsValue(value)}
                                                        value={constraintPropsValue}
                                                        options={productIsRadioactive ? [
                                                            {
                                                                label: "Delivery Day",
                                                                value: "delivery-day",
                                                                input: "delivery-day",
                                                                constraint: "delivery-days",
                                                                // constraintTwo: "ordering-deadline",
                                                                // make constraint into an array of strings?
                                                            },
                                                            {
                                                                label: "Delivery Option",
                                                                value: "delivery-option",
                                                                input: "delivery-option",
                                                                constraint: "delivery-options",
                                                            },
                                                            {
                                                                label: "Calibration Day (ART)",
                                                                input: "calibration-day",
                                                                value: "calibration-day",
                                                                constraint: "calibration-day-interval",
                                                            },
                                                            {
                                                                label: "Activity",
                                                                input: "activity",
                                                                value: "activity",
                                                            },
                                                            {
                                                                label: "Activity (Standard Sizes)",
                                                                input: "activity-standard-size",
                                                                value: "activity-standard-size",
                                                                constraint: "activity-standard-sizes",
                                                            },
                                                            {
                                                                label: "Contact",
                                                                input: "contact",
                                                                value: "contact",
                                                                constraint: "contact-options",
                                                            },
                                                        ] : [
                                                            {
                                                                label: "Delivery Day",
                                                                input: "delivery-day",
                                                                value: "delivery-day",
                                                                constraint: "delivery-days",
                                                            },
                                                            {
                                                                label: "Delivery Option",
                                                                input: "delivery-option",
                                                                value: "delivery-option",
                                                                constraint: "delivery-options",
                                                            },
                                                            {
                                                                label: "Contact",
                                                                input: "contact",
                                                                value: "contact",
                                                                constraint: "contact-options",
                                                            },
                                                        ]}
                                                    />
                                                    <FormHelperText>
                                                        Select 1 or more options, available constraints appear below.
                                                    </FormHelperText>

                                                    {/* // Display SelectDeliveryDays select input if that constraint is selected  */}
                                                    {constraintPropsValue.filter(option => option.constraint === "delivery-days").length === 1 ? <Box mt={4}><SelectDeliveryDays /></Box> : ""}

                                                    {constraintPropsValue.filter(option => option.constraint === "delivery-options").length === 1 ? <Box mt={4}><SelectDeliveryOptions /></Box> : ""}

                                                    {constraintPropsValue.filter(option => option.constraint === "calibration-day-interval").length === 1 ? <Box mt={4}><SelectCalibrationDayInterval /></Box> : ""}

                                                    {constraintPropsValue.filter(option => option.constraint === "activity-standard-sizes").length === 1 ? <Box mt={4}><SelectActivityStandardSizes /></Box> : ""}

                                                    {constraintPropsValue.filter(option => option.constraint === "contact-options").length === 1 ? <Box mt={4}><SelectContactOptions /></Box> : ""}


                                                </FormControl>
                                            </ModalBody>

                                            <ModalFooter>
                                                <ButtonGroup spacing="4">
                                                    <Button
                                                        onClick={() => handleAddProductCancel()}
                                                        colorScheme="purple"
                                                        type="reset"
                                                        isDisabled={addingProduct}
                                                        variant="outline"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    {/* <Button display={"none"} colorScheme="pink" type="submit" isLoading={addingProduct} rightIcon={<CheckIcon />}>
                                                        Add product
                                                    </Button> */}
                                                    <Button onClick={() => setProductModalStage(1)} display={productModalStage === 0 ? "flex" : "none"} colorScheme="pink" rightIcon={<ChevronRightIcon />}>
                                                        Next
                                                    </Button>
                                                    <ButtonGroup display={productModalStage === 1 ? "" : "none"} colorScheme="pink">
                                                        <Button onClick={() => setProductModalStage(productModalStage - 1)} leftIcon={<ChevronLeftIcon />} >
                                                            Back
                                                        </Button>
                                                        <Button onClick={() => setProductModalStage(productModalStage + 1)} rightIcon={<ChevronRightIcon />}>
                                                            Next
                                                        </Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup display={productModalStage === 2 ? "" : "none"} colorScheme="pink">
                                                        <Button onClick={() => setProductModalStage(productModalStage - 1)} leftIcon={<ChevronLeftIcon />} >
                                                            Back
                                                        </Button>
                                                        <Button colorScheme="pink" type="submit" isLoading={addingProduct} rightIcon={<CheckIcon />}>
                                                            Add product
                                                        </Button>
                                                    </ButtonGroup>
                                                </ButtonGroup>
                                            </ModalFooter>
                                        </form>
                                    </ModalContent>
                                </Modal>
                            </Box>
                            <Box>
                                <Button onClick={addCategoryModalOnOpen} rightIcon={<AddIcon ml="2" />}>Add category</Button>
                                <Modal
                                    onClose={addCategoryModalOnClose}
                                    isOpen={addCategoryModalIsOpen}
                                    isCentered
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <form onSubmit={handleAddCategorySubmit}>

                                            <ModalHeader>Add category</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                                {errorMessage && (
                                                    <Alert status="error" borderRadius="lg" mb="6">
                                                        <AlertIcon />
                                                        <Text textAlign="center">{errorMessage}</Text>
                                                    </Alert>
                                                )}
                                                <FormControl isRequired={true}>
                                                    <FormLabel>Category name</FormLabel>
                                                    <Input
                                                        placeholder="Category name"
                                                        onChange={(event) => setCategoryName(event.target.value)}
                                                        value={categoryName}
                                                    />
                                                </FormControl>
                                                <FormControl mt={4}>
                                                    <FormLabel>Category description</FormLabel>
                                                    <Textarea
                                                        placeholder="Category description"
                                                        onChange={(event) => setCategoryDesc(event.target.value)}
                                                        value={categoryDesc}
                                                    />
                                                </FormControl>
                                                <FormControl isInvalid={productIsInvalidError.image} mt={4}>
                                                    <FormLabel>Image (optional)</FormLabel>
                                                    <InputGroup maxH={10}>
                                                        <Box
                                                            position="relative"
                                                            width="100%"
                                                            mr="1px"
                                                            pr="1px"
                                                            borderColor="gray.300"
                                                            borderStyle="dashed"
                                                            borderWidth="1px"
                                                            rounded="md"
                                                            roundedRight={0}
                                                            transition="all 150ms ease-in-out"
                                                            _hover={{
                                                                borderColor: "gray.400"
                                                            }}
                                                            _active={{
                                                                outline: "1px solid",
                                                                outlineColor: "blue.500",
                                                                borderColor: "blue.500",
                                                                borderStyle: "solid",
                                                                mr: "2px",
                                                                pr: "0",
                                                            }}
                                                        >
                                                            <Text
                                                                zIndex={1}
                                                                position="absolute"
                                                                height="100%"
                                                                width="100%"
                                                                px="16px"
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                {productImage.length > 0 ? productImage[productImage.length - 1].name : "Select an image..."}
                                                            </Text>
                                                            <Input
                                                                zIndex={2}
                                                                position="absolute"
                                                                width="100%"
                                                                height="100%"
                                                                type="file"
                                                                accept="image/*"
                                                                opacity={0}
                                                                onClick={() => setProductImage({})}
                                                                onChange={(event) => setProductImage(event.target.files)}
                                                            />
                                                        </Box>
                                                        <InputRightAddon children={<AttachmentIcon />} />
                                                    </InputGroup>
                                                    <FormHelperText>
                                                        Select a product image to upload.
                                                    </FormHelperText>
                                                </FormControl>
                                            </ModalBody>
                                            <ModalFooter>
                                                <ButtonGroup spacing="4">
                                                    <Button colorScheme="purple" isDisabled={addingCategory} variant="outline" onClick={() => handleAddCategoryCancel()}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme="pink" isLoading={addingCategory} rightIcon={<CheckIcon />} type="submit" >
                                                        Add category
                                                    </Button>
                                                </ButtonGroup>
                                            </ModalFooter>
                                        </form>
                                    </ModalContent>
                                </Modal>
                            </Box>
                            <Box>
                                <Button rightIcon={<MinusIcon />} isDisabled>
                                    Remove category
                                </Button>
                            </Box>
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}