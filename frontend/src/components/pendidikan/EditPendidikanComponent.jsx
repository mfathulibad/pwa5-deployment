import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

function EditRiwayatComponent({ id }) {
  const [formData, setFormData] = useState({
    id_pendidikan: "",
    jenjang_pendidikan: "",
    nama_institusi: "",
    tahun_lulus: "",
    id_dosen: "",
    nama: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/riwayat_pendidikan/${id}`);
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

  // Function to handle the form submission for updating penelitian
  const handleUpdatePendidikan = async (e) => {
    e.preventDefault();
    const { jenjang_pendidikan, nama_institusi, tahun_lulus } = formData
    try {
      const response = await axios.put(`${BASE_URL}/riwayat_pendidikan/${id}`, { jenjang_pendidikan, nama_institusi, tahun_lulus });
      console.log(response.data);
      Swal.fire({
        title: 'Berhasil mengedit data pendidikan',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, // 2000 milidetik (2 detik),
        didClose: () => {
          // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Gagal menghapus data pendidikan", error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Edit Pendidikan</h2> */}
      <form onSubmit={handleUpdatePendidikan}>
      {/* <div className="form-group">
          <label>Id Pendidikan</label>
          <input
            type="text"
            className="form-control"
            name="id_pendidikan"
            value={id}
            // onChange={handleInputChange}
            disabled
          />
        </div> */}
        <div className="form-group">
          <label>Dosen</label>
          <select
            type="text"
            className="form-control"
            name="nama"
            value={formData.id_dosen}
            // onChange={handleInputChange}
            disabled
          >
          <option value={formData.id_dosen}>{formData.nama}</option>
          </select>
        </div>
        <div className="form-group">
          <label>Jenjang Pendidikan</label>
          <input
            type="text"
            className="form-control"
            name="jenjang_pendidikan"
            value={formData.jenjang_pendidikan}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nama Institusi</label>
          <input
            type="text"
            className="form-control"
            name="nama_institusi"
            value={formData.nama_institusi}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tahun Lulus</label>
          <input
            type="text"
            className="form-control"
            name="tahun_lulus"
            value={formData.tahun_lulus}
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

export default EditRiwayatComponent;
