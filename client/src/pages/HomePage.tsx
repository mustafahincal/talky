import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { Button, Container, Tab, Tabs } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <Container className="w-50">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="profile" title="Signup">
            <SignUp />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default HomePage;
