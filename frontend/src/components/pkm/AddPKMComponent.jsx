import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddPKMComponent = ({ id }) => {

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

  const [formData, setFormData] = useState({
    id_pkm: '',
    judul_pkm: '',
    tahun_pkm: '',
    bidang_pkm: '',
    kontributor: id,
    file: null
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ['file']: e.target.files[0],
    });

  }

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
    axios.post(`${BASE_URL}/pkm`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: 'Berhasil Menambah Data PKM',
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
        console.error("Gagal menambah data PKM",error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* <h2 className="mt-4">Add PKM</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="judul_pkm"
            value={formData.judul_pkm}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tahun</label>
          <input
            type="text"
            name="tahun_pkm"
            value={formData.tahun_pkm}
            onChange={handleChange}
            className="form-control"
            required                                                                                                                                                                                                                                                                                                        
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bidang</label>
          <input
            type="text"
            name="bidang_pkm"
            value={formData.bidang_pkm}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kontributor</label>
          <select
            name="kontributor"
            value={formData.kontributor}
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
          <label className="form-label">File</label>
          <input
            type="file"
            name="file"
            // value={formData.file}
            accept='application/pdf'
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddPKMComponent;