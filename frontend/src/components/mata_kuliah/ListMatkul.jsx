import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Card, Modal, Button } from 'react-bootstrap'
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddMatkulComponent from './AddMatkulComponent';
import EditMatkulComponent from './EditMatkulComponent';
import './../style.css';
import BASE_URL from '../../../config';

const ListMatkulComponent = () => {
  const [matkulList, setMatkulList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMatkulId, setSelectedMatkulId] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedMatkulId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    
    setShowEditModal(false);
  };


  useEffect(() => {
    axios
      .get(`${BASE_URL}/mata_kuliah`)
      .then((response) => {
        const sortedMatkulList = response.data.sort((a, b) =>
          a.id_matkul.localeCompare(b.id_matkul, undefined, { numeric: true })
        );
        setMatkulList(sortedMatkulList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/mata_kuliah/${id}`)
          .then(() => {
            setMatkulList((prevMatkulList) =>
              prevMatkulList.filter(
                (mata_kuliah) => mata_kuliah.id_matkul !== id
              )
            );
            Swal.fire({
              title: "Berhasil menghapus data mata kuliah",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data mata kuliah", error);
          });
      }
    });
  };
  

  const filteredMatkulList = matkulList.filter((mata_kuliah) => {
    const fullName = `${mata_kuliah.nama_matkul} ${mata_kuliah.kode_matkul} ${mata_kuliah.kode_kelas} ${mata_kuliah.semester} ${mata_kuliah.perguruan_tinggi}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="container margin-class">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar Mata Kuliah</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari Mata Kuliah..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        </div>
        <button type="button" className="btn btn-success btn-sm" onClick={handleShowModal}>
          Tambah Mata Kuliah
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID Mata Kuliah</th>
            <th>Kode Mata Kuliah</th>
            <th>Nama Mata Kuliah</th>
            <th>Kode Kelas</th>
            <th>Perguruan Tinggi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMatkulList.map((mata_kuliah) => (
            <tr key={mata_kuliah.id_matkul}>
              <td>{mata_kuliah.id_matkul}</td>
              <td>{mata_kuliah.kode_matkul}</td>
              <td>{mata_kuliah.nama_matkul}</td>
              <td>{mata_kuliah.kode_kelas}</td>
              <td>{mata_kuliah.perguruan_tinggi}</td>
              <td>
                {/* <Link to={{ pathname: `/dosen/edit/${dosen.id_dosen}` }}> */}
                  <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(mata_kuliah.id_matkul)}>
                    <FaEdit />
                  </button>
                {/* </Link> */}
                <button
                  className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleDelete(mata_kuliah.id_matkul);
                    }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title>Tambah Mata Kuliah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMatkulComponent handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Mata Kuliah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMatkulComponent id={selectedMatkulId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListMatkulComponent;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const ListMatkulComponent = () => {
//   const [matkulList, setMatkulList] = useState([]);

//   useEffect(() => {
//     // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar dosen
//     axios.get('${BASE_URL}/mata_kuliah')
//       .then((response) => {
//         setMatkulList(response.data); // Mengatur data dosen ke dalam state
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle error
//       });
//   }, []); // Gunakan array kosong agar useEffect dijalankan hanya sekali saat komponen pertama kali dimuat

//   // Fungsi untuk menghapus data dosen berdasarkan ID
//   const handleDelete = (id) => {
//     // Lakukan permintaan DELETE ke backend endpoint dengan ID yang sesuai
//     axios.delete(`${BASE_URL}/mata_kuliah/${id}`)
//       .then(() => {
//         // Hapus data dosen dari state
//         setMatkulList((prevMatkulList) => prevMatkulList.filter((mata_kuliah) => mata_kuliah.id_matkul !== id));
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle error
//       });
//   };

//   return (
//     <div className="container mt-4 border">
//       <h2>List Mata Kuliah</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td><Link to={{ pathname: `/mata_kuliah/insert` }}>
//                 <button type="button" className="btn btn-success btn-sm"> Tambah </button>
//                 </Link>
//             </td>
//           </tr>
//           <tr>
//             <th>ID Matkul</th>
//             <th>Kode Matkul</th>
//             <th>Nama Matkul</th>
//             <th>Semester</th>
//             <th>Kode Kelas</th>
//             <th>Perguruan Tinggi</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matkulList.map((mata_kuliah) => (
//             <tr key={mata_kuliah.id_matkul}>
//               <td>{mata_kuliah.id_matkul}</td>
//               <td>{mata_kuliah.kode_matkul}</td>
//               <td>{mata_kuliah.nama_matkul}</td>
//               <td>{mata_kuliah.semester}</td>
//               <td>{mata_kuliah.kode_kelas}</td>
//               <td>{mata_kuliah.perguruan_tinggi}</td>
//               <td>
//               <Link to={{ pathname: `/mata_kuliah/edit/${mata_kuliah.id_matkul}` }}>
//                 <button type="button" className="btn btn-sm btn-success">
//                   Edit
//                 </button>
//               </Link>
//               <button className="btn btn-danger btn-sm ml-2"
//                   // Tambahkan fungsi onClick untuk tombol delete
//                   onClick={() => { handleDelete(mata_kuliah.id_matkul);}}
//                 >
//                 Delete
//               </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListMatkulComponent;
