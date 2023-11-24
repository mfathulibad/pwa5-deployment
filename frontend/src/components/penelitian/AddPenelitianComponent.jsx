import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddPenelitianComponent = ({ id }) => {

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
    id_penelitian: '',
    judul: '',
    tanggal_publikasi: '',
    bidang: '',
    author: id,
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
    axios.post(`${BASE_URL}/penelitian`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: 'Berhasil menambah data penelitian',
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
        console.error("Gagal menambah data penelitian",error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* <h2 className="mt-4">Add Penelitian</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Publikasi</label>
          <input
            type="date"
            name="tanggal_publikasi"
            value={formData.tanggal_publikasi}
            onChange={handleChange}
            className="form-control"
            required                                                                                                                                                                                                                                                                                                        
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bidang</label>
          <input
            type="text"
            name="bidang"
            value={formData.bidang}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <select
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
            required
            disabled
          >
            {/* <option value="">Select an author</option> */}
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

export default AddPenelitianComponent;