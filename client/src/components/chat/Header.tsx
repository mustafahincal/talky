import React, { useEffect } from "react";
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
import { useUserContext } from "../../contexts/UserContext";
import styles from "./styles.module.css";
import chatSvg from "../../assets/chat.svg";

const Header = () => {
  const { logout, currentUser } = useAuthContext();
  const { users, getAllUsers } = useUserContext();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClickChat = (userId: string) => {};

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
              <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-5">
                <NavDropdown
                  title="Users"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                  className={styles.headerDropdownContainer}
                >
                  <div className={styles.dropdownItemsContainer}>
                    <div className={styles.dropdownSearch}>
                      <div className="d-flex">
                        <input type="text" placeholder="Search" />
                        <Button variant="outline-success">Search</Button>
                      </div>
                    </div>
                    {users.map((user) => (
                      <div
                        onClick={() => handleClickChat(user._id)}
                        key={user._id}
                        className={styles.dropdownItem}
                      >
                        <span>{user.name}</span>
                        <img src={chatSvg} alt="" />
                      </div>
                    ))}
                  </div>
                </NavDropdown>

                <button onClick={logout}>
                  <Nav.Link href="#action2">
                    <img src={logoutIcon} alt="" />
                  </Nav.Link>
                </button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
