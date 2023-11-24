import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

function EditPKMComponent({ id }) {
  // State untuk menyimpan data PKM yang akan diedit
  const [formData, setFormData] = useState({
    id_pkm: "",
    judul_pkm: '',
    tahun_pkm: '',
    bidang_pkm: '',
    kontributor: '',
    nama: '',
    file: null
  });

  // Menggunakan useEffect untuk mengambil data PKM dari server
  useEffect(() => {
    async function fetchData() {
      try {
        // Melakukan permintaan GET ke backend untuk mendapatkan data PKM berdasarkan ID
        const response = await axios.get(`${BASE_URL}/pkm/${id}`);
        const rows = response.data.rows[0];
        
        // Mengatur data PKM ke dalam state formData
        setFormData(response.data.rows[0]);
        
        // Logging informasi terkait data
        console.log(id);
        console.log(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Memanggil fungsi fetchData saat komponen dimuat atau nilai 'id' berubah
    fetchData();
  }, [id]);

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      ['file']: e.target.files[0],
    });

  }

  // Function untuk menangani perubahan input pada formulir penyuntingan PKM
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function untuk menangani pengiriman perubahan data PKM ke server
  const handleUpdatePKM = async (e) => {
    e.preventDefault();
    const { id_pkm, judul_pkm, bidang_pkm, tahun_pkm, kontributor, file } = formData;
    try {
      // Melakukan permintaan PUT untuk memperbarui data PKM berdasarkan ID
      const response = await axios.put(`${BASE_URL}/pkm/${id}`, { id_pkm, judul_pkm, bidang_pkm, tahun_pkm, kontributor, file }, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response.data);
      Swal.fire({
        title: 'Berhasil mengedit data PKM',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, // 2000 milidetik (2 detik),
        didClose: () => {
          // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Gagal mengedit data PKM", error);
    }
  };

  return (
    <div className="container">
      {/* Formulir penyuntingan PKM */}
      <form onSubmit={handleUpdatePKM}>
        {/* <div className="form-group">
          <label>ID PKM</label>
          <input
            type="text"
            className="form-control"
            name="id_pkm"
            value={id}
            disabled // Input ID PKM diatur ke mode disabled
          />
        </div> */}
        <div className="form-group">
          <label>Judul PKM</label>
          <input
            type="text"
            className="form-control"
            name="judul_pkm"
            value={formData.judul_pkm}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tahun PKM</label>
          <input
            type="text"
            className="form-control"
            name="tahun_pkm"
            value={formData.tahun_pkm}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Bidang PKM</label>
          <input
            type="text"
            className="form-control"
            name="bidang_pkm"
            value={formData.bidang_pkm}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Kontributor</label>
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

export default EditPKMComponent;