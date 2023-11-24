import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddMatkulComponent = () => {

  const [formData, setFormData] = useState({
    kode_matkul: '',
    nama_matkul: '',
    nama_dosen: '',
    kode_kelas: '',
    perguruan_tinggi: '',
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
    axios.post(`${BASE_URL}/mata_kuliah`, formData)
      .then((response) => {
        Swal.fire({
          title: 'Berhasil menambah data mata kuliah',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000, // 2000 milidetik (2 detik),
          didClose: () => {
            // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
            window.location.reload();
          }
        });
        console.log(response.data);
        // Handle success or redirection here
      })
      .catch((error) => {
        console.error("Gagal menambah data mata kuliah",error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* <h2 className="mt-4">Add Mata Kuliah</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Kode Mata Kuliah</label>
          <input
            type="text"
            name="kode_matkul"
            value={formData.kode_matkul}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Mata Kuliah</label>
          <input
            type="text"
            name="nama_matkul"
            value={formData.nama_matkul}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kode Kelas</label>
            <select
              name="kode_kelas"
              value={formData.kode_kelas}
              onChange={handleChange}
              className="form-control"
              required
            >
            <option value="">Pilih Kode Kelas</option>
            <option value="1ATI3">1ATI3</option>
            <option value="1BTI3">1BTI3</option>
            <option value="1ATI4">1ATI4</option>
            <option value="1BTI4">1BTI4</option>
            <option value="2ATI3">2ATI3</option>
            <option value="2BTI3">2BTI3</option>
            <option value="2ATI4">2ATI4</option>
            <option value="2BTI4">2BTI4</option>
            <option value="3ATI3">3ATI3</option>
            <option value="3BTI3">3BTI3</option>
            <option value="3ATI4">3ATI4</option>
            <option value="3BTI4">3BTI4</option>
            <option value="4ATI4">4ATI4</option>
            <option value="4BTI4">4BTI4</option>
            </select>
          </div>

        <div className="mb-3">
          <label className="form-label">Perguruan Tinggi</label>
          <input
            type="text"
            name="perguruan_tinggi"
            value={formData.perguruan_tinggi}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMatkulComponent;