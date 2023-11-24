import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

function EditMatkulComponent({ id }) {
    const [formData, setFormData] = useState({
    id_matkul: "",
    kode_matkul: "",
    nama_matkul: "",
    kode_kelas: "",
    perguruan_tinggi: "",
  });

  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/mata_kuliah/${id}`);
        const rows = response.data.rows[0];
        setFormData(response.data.rows[0]);
        console.log(id);
        console.log(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  // Function to handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle the form submission for updating dosen
  const handleUpdateMatkul = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/mata_kuliah/${id}`, formData);
      console.log(response.data);
      Swal.fire({
        title: 'Berhasil mengedit data mata kuliah',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, // 2000 milidetik (2 detik),
        didClose: () => {
          // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Gagal mengedit data mata kuliah", error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Edit Dosen</h2> */}
      <form onSubmit={handleUpdateMatkul}>
      {/* <div className="form-group">
          <label>ID Mata Kuliah</label>
          <input
            type="text"
            className="form-control"
            name="id_maktul"
            value={id}
            // onChange={handleInputChange}
            disabled
          />
        </div> */}
        <div className="form-group">
          <label>Kode Mata Kuliah</label>
          <input
            type="text"
            className="form-control"
            name="kode_matkul"
            value={formData.kode_matkul}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nama Mata Kuliah</label>
          <input
            type="text"
            className="form-control"
            name="nama_matkul"
            value={formData.nama_matkul}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Kode Kelas</label>
          <select
              name="kode_kelas"
              value={formData.kode_kelas}
              onChange={handleInputChange}
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
        <div className="form-group">
          <label>Perguruan Tinggi</label>
          <input
            type="text"
            className="form-control"
            name="perguruan_tinggi"
            value={formData.perguruan_tinggi}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditMatkulComponent;
