import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddRiwayatPendidikanComponent = ({ id }) => {
  const [formData, setFormData] = useState({
    id_dosen: id,
    jenjang_pendidikan: '',
    nama_institusi: '',
    tahun_lulus: ''
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
    axios.post(`${BASE_URL}/riwayat_pendidikan`, formData)
      .then((response) => {
        Swal.fire({
          title: 'Berhasil menambah data pendidikan',
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
        console.error("Gagal menambah data pendidikan",error);
        // Handle error
      });
  };

  const [dosenList, setDosenList] = useState([]);

  useEffect(() => {
    // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar dosen
    axios.get(`${BASE_URL}/dosen`)
      .then((response) => {
        setDosenList(response.data); // Mengatur data dosen ke dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  return (
    <div className="container">
      {/* <h2 className="mt-4">Add riwayat</h2> */}
      <form onSubmit={handleSubmit}>
        {/* {<div className="mb-3">
          <label className="form-label">id</label>
          <input
            type="text"
            name="id_pendidikan"
            value={formData.id_pendidikan}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>} */}
         <div className="mb-3">
          <label className="form-label">Nama Dosen</label>
          <select
            name="id_dosen"
            value={formData.id_dosen}
            onChange={handleChange}
            className="form-control"
            required
            disabled
          >
            {
              dosenList.map((element) => (
                <option key={element.id_dosen} value={element.id_dosen}>{element.nama}</option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Jenjang Pendidikan</label>
          <input
            type="text"
            name="jenjang_pendidikan"
            value={formData.jenjang_pendidikan}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Institusi</label>
          <input
            type="text"
            name="nama_institusi"
            value={formData.nama_institusi}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tahun Lulus</label>
          <input
            type="text"
            name="tahun_lulus"
            value={formData.tahun_lulus}
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

export default AddRiwayatPendidikanComponent;