import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from "js-cookie";
import BASE_URL from '../../../config';

const AddDosenComponent = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    jabatan: "",
    jurusan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your backend endpoint
    axios
      .post(`${BASE_URL}/dosen`, formData)
      .then((response) => {
        Swal.fire({
          title: 'Berhasil Menambah Data Dosen',
          text: 'Data dosen berhasil ditambahkan.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000, // 2000 milidetik (2 detik),
          didClose: () => {
            // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
            window.location.reload();
          }
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* <h2 className="mt-4">Add Dosen</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jabatan</label>
          <input
            type="text"
            name="jabatan"
            value={formData.jabatan}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jurusan</label>
          <input
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    
  );
};

export default AddDosenComponent;
