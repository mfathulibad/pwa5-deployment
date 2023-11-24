import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

function EditRiwayatPengajaranComponent({ id }) {
  const [formData, setFormData] = useState({
    id_dosen: '',
    nama: '',
    kode_matkul: '',
    semester: '',
    tahun: '',
    nama_matkul: '',
  });

  const [formDataMatkul, setFormDataMatkul] = useState({
    id_matkul:''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/riwayat_pengajaran/${id}`);
        const rows = response.data.rows[0];
        setFormData(response.data.rows[0]);
        setFormDataMatkul(response.data.rows[0]);
        console.log(id);
        console.log(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, [id]);

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


  // Function to handle input changes for editing
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormDataUpdated({ ...formDataUpdated, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Function to handle the form submission for updating dosen
  const handleUpdateRiwayatPengajaran = async (e) => {
    e.preventDefault();
    const { id_dosen, semester, tahun } = formData;
    const { id_matkul } = formDataMatkul;
    try {
      const response = await axios.put(`${BASE_URL}/riwayat_pengajaran/${id}`, { id_dosen, id_matkul, semester, tahun });
      console.log(response.data);
      Swal.fire({
        title: 'Berhasil mengedit data pengajaran',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, // 2000 milidetik (2 detik),
        didClose: () => {
          // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Gagal menghapus data pengajaran", error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Edit Dosen</h2> */}
      <form onSubmit={handleUpdateRiwayatPengajaran}>
      {/* <div className="form-group">
          <label>id_pengajaran</label>
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
        <div className="mb-3">
          <label className="form-label">Nama Mata Kuliah</label>
          <select
            name="id_matkul"
            // value={formDataMatkul.id_matkul}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value={formDataMatkul.id_matkul}>{formDataMatkul.nama_matkul}</option>
            {
              matkulList.map((element) => (
                element.nama_matkul !== formDataMatkul.nama_matkul ? (
                  <option key={element.id_matkul} value={element.id_matkul}>
                    {element.nama_matkul}
                  </option>
                ) : null
            ))}
          </select>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label>Semester</label>
              <select
                name="semester"
                className="form-control"
                value={formData.semester}
                onChange={handleInputChange}
                required
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Tahun</label>
              <input
                type="text"
                className="form-control"
                name="tahun"
                value={formData.tahun}
                onChange={handleInputChange}
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
        
        <button type="submit" className="btn btn-primary mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditRiwayatPengajaranComponent;
