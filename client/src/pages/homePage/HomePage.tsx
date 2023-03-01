import { Container, Tab, Tabs } from "react-bootstrap";
import Login from "../../components/authentication/Login";
import SignUp from "../../components/authentication/SignUp";

const HomePage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Container className="w-25 bg-light p-3 border border-dark">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3 "
          fill
        >
          <Tab eventKey="profile" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="home" title="Signup">
            <SignUp />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default HomePage;
