import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddRiwayatPenelitianComponent = ({ id }) => {

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

  const [penelitianList, setPenelitianList] = useState([]);

  useEffect(() => {
    // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar mata_kuliah
    axios.get(`${BASE_URL}/penelitian`)
      .then((response) => {
        setPenelitianList(response.data); // Mengatur data dosen ke dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const [formData, setFormData] = useState({
    id_dosen: '',
    id_penelitian: id
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
    
    const { id_dosen, id_penelitian } = formData;

    // Make a POST request to your backend endpoint
    axios.post(`${BASE_URL}/riwayat_penelitian`, { id_dosen, id_penelitian })
      .then((response) => {
        Swal.fire({
          title: 'Berhasil menambah Penulis',
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
        console.error("Gagal menambah Penulis",error);
        // Handle error
      });

    
  };


  return (
    <div className="container">
      <h2 className="mt-4">Add Author Penelitian</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Dosen</label>
          <select
            name="id_dosen"
            value={formData.id_dosen}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Pilih Dosen</option>
            {
              dosenList.map((element) => (
                <option key={element.id_dosen} value={element.id_dosen}>{element.nama}</option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Judul Penelitian</label>
          <select
            name="id_penelitian"
            value={formData.id_penelitian}
            onChange={handleChange}
            className="form-control"
            required
            disabled
          >
            {
              penelitianList.map((element) => (
                <option key={element.id_penelitian} value={element.id_penelitian}>{element.judul}</option>
              ))
            }
          </select>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddRiwayatPenelitianComponent;