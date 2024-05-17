import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useAdminLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { adlogout } from "../slices/adminAuthSlice";

const AdminHeader = () => {
    const  adminInfo  = useSelector((state) => state.adminAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useAdminLogoutMutation();
    console.log(adminInfo);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(adlogout());
      console.log("going to logout");
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo.adminInfo ? (
                <>
                  <NavDropdown title={adminInfo.adminInfo.name} id="username">
                 
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default  AdminHeader;
