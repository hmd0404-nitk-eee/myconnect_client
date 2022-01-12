import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const path =
    window.location.pathname === "/"
      ? "home"
      : window.location.pathname.substring(1);

  const handleItemClick = (e) => {
    var link = document.getElementById(path);
    link.classList.add("active");
  };

  const navbar = user ? (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa fa-connectdevelop"></i>&nbsp;&nbsp;MyConnect, {user.username}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            style={{ marginLeft: "auto" }}
          >
            <Nav.Link href="/register" as={Link} to="/updates">
              Future Updates
            </Nav.Link>
            <Nav.Link onClick={logout} >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa fa-connectdevelop"></i>&nbsp;&nbsp;MyConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={window.location.pathname}
            style={{ marginLeft: "auto" }}
            onSelect={handleItemClick}
          >
            <Nav.Link href="/" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link href="/register" as={Link} to="/updates">
              Future Updates
            </Nav.Link>
            <Nav.Link href="/login" as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link href="/register" as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return navbar;
}

export default NavBar;
