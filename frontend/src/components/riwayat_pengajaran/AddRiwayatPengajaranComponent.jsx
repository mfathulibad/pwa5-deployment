import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const AddRiwayatPengajaranComponent = ({ id }) => {

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

  const [matkulList, setMatkulList] = useState([]);

  useEffect(() => {
    // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar mata_kuliah
    axios.get(`${BASE_URL}/mata_kuliah`)
      .then((response) => {
        setMatkulList(response.data); // Mengatur data dosen ke dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const [formData, setFormData] = useState({
    id_dosen: id,
    semester:'',
    tahun:''
  });

  const [formDataMatkul, setFormDataMatkul] = useState({
    id_matkul: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedMatkul = matkulList.find((matkul) => matkul.id_matkul === value);

    if (selectedMatkul) {
      // Destructure the matkul object to get the required values
      const { kode_matkul, kode_kelas, perguruan_tinggi } = selectedMatkul;
  
      setFormDataMatkul({
        ...formDataMatkul,
        [name]: value,
        kode_matkul: kode_matkul,
        kode_kelas: kode_kelas,
        perguruan_tinggi: perguruan_tinggi,
      });
    } else {
      // Clear the values if no matching matkul is found
      setFormDataMatkul({
        ...formDataMatkul,
        [name]: value,
        kode_matkul: '',
        kode_kelas: '',
        perguruan_tinggi: '',
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Extract id_dosen and id_matkul from the formData
    const { id_dosen, semester, tahun } = formData;
    const { id_matkul } = formDataMatkul;
  
    // Make a POST request to your backend endpoint with id_dosen and id_matkul
    axios.post(`${BASE_URL}/riwayat_pengajaran`, { id_dosen, id_matkul, semester, tahun })
      .then((response) => {
        Swal.fire({
          title: 'Berhasil menambah data pengajaran',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000, // 2000 milidetik (2 detik),
          didClose: () => {
            // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
            window.location.reload();
          }
        });
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Gagal menambah data pengajaran",error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* <h2 className="mt-4">Riwayat Pengajaran</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Dosen</label>
          <select
            name="id_dosen"
            value={formData.id_dosen}
            // onChange={handleChange}
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
          {/* <select
            name="id_dosen"
            value={formData.id_dosen}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Pilih Dosen</option>
            {
              dosenList.map((element) => (
                <option key={element.id_dosen} value={element.id_dosen}>{element.nama}</option>
              ))
            }
          </select> */}
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Mata Kuliah</label>
          <select
            name="id_matkul"
            value={formDataMatkul.id_matkul}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Pilih Mata Kuliah</option>
            {
              matkulList.map((element) => (
                <option key={element.id_matkul} value={element.id_matkul}>{element.nama_matkul}</option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label>Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Pilih Semester</option>
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Tahun</label>
              <input
                type="text"
                className="form-control"
                onChange={handleInputChange}
                name="tahun"
                value={formData.tahun}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Kode Mata Kuliah</label>
          <input
          type="text"
          className="form-control"
          name="kode_matkul"
          value={formDataMatkul.kode_matkul} // Display kode_matkul from the state
          disabled
          />
        </div>
        <div className="mb-3">
          <label>Kode Kelas</label>
          <input
          type="text"
          className="form-control"
          name="kode_kelas"
          value={formDataMatkul.kode_kelas}
          disabled
          />
        </div>
        <div className="mb-3">
          <label>Perguruan Tinggi</label>
          <input
          type="text"
          className="form-control"
          name="perguruan_tinggi"
          value={formDataMatkul.perguruan_tinggi}
          disabled
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddRiwayatPengajaranComponent;