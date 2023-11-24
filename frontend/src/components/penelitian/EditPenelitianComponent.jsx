import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

function EditPenelitianComponent({ id }) {
    const [formData, setFormData] = useState({
    id_penelitian: "",
    judul: "",
    tanggal_publikasi: "",
    bidang: "",
    author: "",
    // link_penelitian: "",
    file: null,
    nama:""
  });

  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      ['file']: e.target.files[0],
    });

  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3100/penelitian/${id}`);
        if (response.data.rows.length > 0) {
          const rows = response.data.rows[0];
          setFormData(response.data.rows[0]);
          console.log(id);
          console.log(rows);
        }
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
  const handleUpdatePenelitian = async (e) => {
    e.preventDefault();
    const { id_penelitian, judul, bidang, tanggal_publikasi, author, file } = formData;
    try {
      const response = await axios.put(`http://localhost:3100/penelitian/${id}`, { id_penelitian, judul, bidang, tanggal_publikasi, author, file }, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response.data);
      Swal.fire({
        title: 'Berhasil mengedit data penelitian',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, // 2000 milidetik (2 detik),
        didClose: () => {
          // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Gagal mengedit data penelitian", error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Edit Penelitian</h2> */}
      <form onSubmit={handleUpdatePenelitian}>
      {/* <div className="form-group">
          <label>Id Penelitian</label>
          <input
            type="text"
            className="form-control"
            name="id_penelitian"
            value={id}
            // onChange={handleInputChange}
            disabled
          />
        </div> */}
        <div className="form-group">
          <label>Judul</label>
          <input
            type="text"
            className="form-control"
            name="judul"
            id="judul"
            value={formData.judul}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tanggal Publikasi</label>
          <input
            type="date"
            className="form-control"
            name="tanggal_publikasi"
            value={formatDate(formData.tanggal_publikasi)}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Bidang</label>
          <input
            type="text"
            className="form-control"
            name="bidang"
            value={formData.bidang}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <select
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            disabled
          >
          <option value={formData.author}>{formData.nama}</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">File</label>
          <input
            type="file"
            name="file"
            accept='application/pdf'
            // value={formData.link_penelitian}
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPenelitianComponent;
