import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import logoutIcon from "../../assets/logout.svg";
import { useAuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { logout, currentUser } = useAuthContext();

  return (
    <>
      <Navbar key={"sm"} bg="light" expand={"sm"} className="mb-3">
        <Container>
          <Navbar.Brand href="#">Chat App</Navbar.Brand>
          <div className="mx-3 bg-danger d-flex align-items-center gap-2  py-2 px-2 rounded text-white">
            <img
              src={`${process.env.REACT_APP_PUBLIC}${currentUser?.image}`}
              width="30px"
              height="30px"
              alt=""
            />
            <div>{currentUser?.name}</div>
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <button onClick={logout}>
                  <Nav.Link href="#action2">
                    <img src={logoutIcon} alt="" />
                  </Nav.Link>
                </button>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
