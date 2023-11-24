import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaLock, FaUser } from "react-icons/fa";
import { Card } from "react-bootstrap";
import BASE_URL from '../../config';

function LoginCom() {
  const navigate = useNavigate(); // Use useNavigate
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        formData
      ); // Replace with your API endpoint
      if (response.data) {
        const userData = response.data[0];

        Cookies.set("role", userData.role, { expires: 1 });
        

        // navigate("/dashboard_admin/dosen"); // Navigate to home page
        if (userData.role === "Admin") {
          Swal.fire({
            title: "Login berhasil!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000, // 2000 milidetik (2 detik),
          });
          navigate("/dashboard_admin/dosen");
        } else if (userData.role === "Dosen") {
          try {
            const response = await axios.get(
              `${BASE_URL}/login/` + userData.id_user
            );
            const idDosen = response.data[0].id_dosen;
            Cookies.set("userAuth", idDosen, { expires: 1 });
            Swal.fire({
              title: "Login berhasil!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000, // 2000 milidetik (2 detik),
            });
            navigate("/dashboard_dosen/dosen/" + idDosen);
          } catch (err) {
            console.error(err);
          }
        } else {
          alert("Role tidak valid");
          console.log("Role tidak valid");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User tidak ditemukan!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.log("Tidak Ada User");
      }
      // You can perform actions like redirecting the user after successful login
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username atau password salah!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      setError("Login failed. Please check your credentials."); // Handle errors
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row shadow br-5">
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <img
            src="https://e-learning.polban.ac.id/pluginfile.php/1/theme_lambda/carousel_image_11/1618326726/PASCA.jpg"
            alt="Image"
            className="img-fluid"
          />
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center text-center">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-3" style={{ color: "#00008B" }}>
              Log In
            </h1>
            <div className="form-group mt-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="form-control form-control-user"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control form-control-user"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-warning btn-user btn-block mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCom;
