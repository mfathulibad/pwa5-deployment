import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie";
import BASE_URL from '../../config';

function NavbarDosen({ id }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_dosen: "",
    nama: "",
    email: "",
    jabatan: "",
    jurusan: "",
    id_user: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/dosen/${id}`);
        const rows = response.data.rows[0];
        setFormData(response.data.rows[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

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
          <Navbar.Toggle aria-controls="navbarExample01" />
          <Navbar.Collapse id="navbarExample01">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to={`/dashboard_dosen/dosen/${id}`}>
                Profil
              </Nav.Link> */}
              {/* <Nav.Link as={Link} to={`/dashboard_dosen/pendidikan/${id}`}>
                Pendidikan
              </Nav.Link> */}
              {/* <Nav.Link as={Link} to={`/dashboard_dosen/penelitian/${id}`}>
                Penelitian
              </Nav.Link>
              <Nav.Link as={Link} to={`/dashboard_dosen/author_penelitian/:${id}`}>
                Kontributor Penelitian
              </Nav.Link>  */}
              {/* <Nav.Link as={Link} to={`/dashboard_dosen/pkm/${id}`}>
                PKM
              </Nav.Link> */}
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
}

export default NavbarDosen;
