import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import BASE_URL from '../../config';

const MyNavbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Navbar expand="lg" bg="light" variant="light" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#">
          <img
            src="https://www.polban.ac.id/wp-content/uploads/2018/06/logo-polban-80.png"
            width="45"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggler */}
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            {/* Beranda */}
            <Nav.Link style={{ color: "black" }}>
              {isHome ? (
                <ScrollLink
                  activeClass=""
                  to="beranda"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={150}
                >
                  Beranda
                </ScrollLink>
              ) : (
                <Link to="/home">Beranda</Link>
              )}
            </Nav.Link>

            {/* Dosen */}
            <Nav.Link style={{ color: "black" }}>
              {isHome ? (
                <ScrollLink
                  activeClass=""
                  to="dosen"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={150}
                >
                  Dosen
                </ScrollLink>
              ) : (
                <Link to="/home">Dosen</Link>
              )}
            </Nav.Link>
          </Nav>

          <Nav>
            {/* Login */}
            <Link to={{ pathname: "/login" }}>
              <Button variant="warning" style={{ fontWeight: "500" }}>
                Login
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
