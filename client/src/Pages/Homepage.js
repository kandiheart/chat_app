import React from "react";
import { Container, Box, Text, Tabs, Tab, TabPanels, TabList, TabPanel } from '@chakra-ui/react';
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const Homepage = () => {
    return <Container maxW="xl" centerContent>
        <Box display="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
            <Text fontSize={'4xl'} fontFamily='Orbitron' color={"black"}>Chat-App</Text>
        </Box>
        <Box bg={"white"} w="100%" p={4} borderRadius="lg" borderWidth="1px" color={"black"}>
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab width={"50%"}>Login</Tab>
                <Tab width={"50%"}>Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <Login />
                </TabPanel>
                <TabPanel>
                <Signup />
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
    </Container>;
};

export default Homepage;