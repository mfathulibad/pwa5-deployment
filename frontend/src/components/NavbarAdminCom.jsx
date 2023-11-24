import React from "react";
import Swal from 'sweetalert2'
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  function handleLogout() {
    Cookies.remove("role");
    Cookies.remove("username");
    Cookies.remove("userAuth");
    Swal.fire({
      title: "Logout berhasil!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500, // 2000 milidetik (2 detik),
    });
    navigate("/home");
  }

  return (
    <header>
      {/* Navbar */}
      <Navbar expand="lg" bg="light" variant="light" fixed="top">
        <Container>
          {/* Navbar Brand (Logo) */}
          <Link to="/dashboard_admin">
            <Navbar.Brand>
              <img
                src="https://www.polban.ac.id/wp-content/uploads/2018/06/logo-polban-80.png"
                width="45"
                height="60"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </Link>

        {/* Navbar Toggler */}
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            {/* Beranda */}
            <Nav.Link as={Link} to="/dashboard_admin/dosen" style={{ fontWeight:"600" }}>
                Dosen
            </Nav.Link>
            {/* Mata Kuliah */}
            <Nav.Link as={Link} to="/dashboard_admin/mata_kuliah" style={{ fontWeight:"600" }}>
                Mata Kuliah
              </Nav.Link>
            </Nav>
            <Nav>
              {/* Logout */}
              <button
                type="button"
                className="btn btn-warning"
                style={{ fontWeight: "500" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Navbar */}
    </header>
  );
};

export default NavbarAdmin;
