import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddRiwayatPKMComponent = ({ id }) => {
  // State untuk daftar dosen
  const [dosenList, setDosenList] = useState([]);

  // Mengambil data dosen dari backend
  useEffect(() => {
    axios.get(`${BASE_URL}/dosen`)
      .then((response) => {
        setDosenList(response.data); // Menyimpan data dosen dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  // State untuk daftar PKM
  const [pkmList, setPKMList] = useState([]);

  // Mengambil data PKM dari backend
  useEffect(() => {
    axios.get(`${BASE_URL}/pkm`)
      .then((response) => {
        setPKMList(response.data); // Menyimpan data PKM dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  // State untuk data formulir
  const [formData, setFormData] = useState({
    id_dosen: '',
    id_pkm: id
  });

  // Fungsi untuk meng-handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk meng-handle pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { id_pkm, id_dosen } = formData;

    // Melakukan permintaan POST ke endpoint backend
    axios.post(`${BASE_URL}/riwayatpkm`, { id_pkm, id_dosen })
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
          <label className="form-label">Judul PKM</label>
          <select
            name="id_pkm"
            value={formData.id_pkm}
            onChange={handleChange}
            className="form-control"
            required
            disabled
          >
            <option value="">Pilih Judul PKM</option>
            {
              pkmList.map((element) => (
                <option key={element.id_pkm} value={element.id_pkm}>{element.judul_pkm}</option>
              ))
            }
          </select>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddRiwayatPKMComponent;