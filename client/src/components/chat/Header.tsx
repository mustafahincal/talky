import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import chatSvg from "../../assets/chat.svg";
import logoutIcon from "../../assets/logout.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./styles.module.css";

const Header = () => {
  const { logout, currentUser } = useAuthContext();
  const { filteredUsers, getAllUsers, getFilteredUsers } = useUserContext();
  const { accessChat } = useChatContext();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClickChat = (userId: string) => {
    accessChat(userId);
  };

  const handleClickSearch = () => {
    getFilteredUsers(search);
  };

  return (
    <>
      <Navbar
        key={"sm"}
        bg="light"
        expand={"sm"}
        className="mb-3 border border-dark bg-white"
      >
        <Container>
          <Navbar.Brand href="#" style={{ fontSize: "30px" }}>
            Talky
          </Navbar.Brand>
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
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          type="text"
                          placeholder="Search"
                        />
                        <Button
                          onClick={handleClickSearch}
                          variant="outline-success"
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                    {filteredUsers.map((user) => (
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
