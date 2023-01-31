import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";

const Home = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        padding={"3"}
        bg="white"
        w={"100%"}
        margin="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} color="black">
          Chat - App
        </Text>
      </Box>
      <Box bg="white" w={"100%"} borderRadius={"lg"} borderWidth="1px">
        <Tabs isFitted>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
