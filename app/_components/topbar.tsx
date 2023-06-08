
import {
    MoonIcon,
    SunIcon
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Heading,
    HStack,
    Spacer,
    useColorMode
} from "@chakra-ui/react";

const Topbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg="" py={3} mb={4} boxShadow="md">
                <HStack px={4}>
                    <Heading fontSize="xl">VocaBook</Heading>
                    <Spacer />
                    <ButtonGroup size="sm" variant="ghost">
                        <Button onClick={() => toggleColorMode()}>
                            {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </ButtonGroup>
                </HStack>
            </Box>
        </>
    );
};

export default Topbar;