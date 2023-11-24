import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaFile, FaPlus } from 'react-icons/fa';
import AddPenulisPkmComponent from '../riwayatPkm/AddRiwayatPKMComponent';
import AddPKMComponent from '../pkm/AddPKMComponent';
import EditPKMComponent from '../pkm/EditPKMComponent';
import BASE_URL from '../../../config';

const ListRiwayatPKMComponentDosen = ({ id }) => {
  // State untuk menyimpan data riwayat PKM
  const [listRiwayatPKM, setlistRiwayatPKM] = useState([]);
  
  // State untuk menangani input pencarian
  const [searchText, setSearchText] = useState("");
  
  // State untuk menangani modal tambah data PKM
  const [showModal, setShowModal] = useState(false);
  
  // State untuk menangani modal edit data PKM
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddAuthorModal, setAddAuthorModal] = useState(false);
  
  // State untuk menyimpan ID PKM yang akan diubah
  const [selectedPKMId, setSelectedPKMId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedPKMId(id)
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedPKMId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowAddAuthorModal = (id) => {
    setSelectedPKMId(id);
    setAddAuthorModal(true);
  };

  const handleCloseAddAuthorModal = () => {
    setAddAuthorModal(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayatpkm/${id}`)
      .then((response) => {
        const sortedRiwayatPKMList = response.data.sort((a, b) => {
          if (a.tahun_pkm === b.tahun_pkm) {
            return a.judul_pkm.localeCompare(b.judul_pkm);
          }
          return a.tahun_pkm - b.tahun_pkm;
        });
        setlistRiwayatPKM(sortedRiwayatPKMList); // Mengatur data dosen ke dalam state
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  // Fungsi untuk menghapus data PKM berdasarkan ID
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data PKM!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/riwayatpkm/${id}`)
          .then(() => {
            setlistRiwayatPKM((prevRiwayatPKMList) =>
              prevRiwayatPKMList.filter((riwayat_pkm) => riwayat_pkm.id_riwayatpkm !== id)
            );
            Swal.fire({
              title: "Berhasil menghapus data PKM",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data PKM", error);
          });
      }
    });
  };
  

  // Menghasilkan daftar riwayat PKM yang sudah difilter berdasarkan input pencarian
  const filteredPKMList = listRiwayatPKM.filter((riwayat_pkm) => {
    const fullName = `${riwayat_pkm.judul_pkm} ${riwayat_pkm.tahun_pkm} ${riwayat_pkm.bidang_pkm} ${riwayat_pkm.nama}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div className="container" style={{marginTop:'30px'}}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar PKM</h2>
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
              placeholder="Cari PKM..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <button type="button" className="btn btn-success btn-sm" onClick={() => handleShowModal(id)}>
          Tambah PKM
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Judul</th>
            <th>Tahun PKM</th>
            <th>Bidang PKM</th>
            <th>Kontributor</th>
            <th>Link PKM</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPKMList.map((riwayat_pkm) => (
            <tr key={riwayat_pkm.id_riwayatpkm}>
              <td>{riwayat_pkm.judul_pkm}</td>
              <td>{riwayat_pkm.tahun_pkm}</td>
              <td>{riwayat_pkm.bidang_pkm}</td>
              <td>{riwayat_pkm.nama}</td>
              <td>
                <a className="btn btn-primary btn-sm mr-2" target="_blank" href={`${BASE_URL}/static/uploads/pkm/`+riwayat_pkm.link_pkm}><FaFile></FaFile> Lihat File</a></td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => { handleShowAddAuthorModal(riwayat_pkm.id_pkm);}}>
                  <FaPlus  />
                </button>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(riwayat_pkm.id_pkm)}>
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    handleDelete(riwayat_pkm.id_riwayatpkm);
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
          <Modal.Title>Tambah PKM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPKMComponent id={selectedPKMId} handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit PKM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPKMComponent id={selectedPKMId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showAddAuthorModal} onHide={handleCloseAddAuthorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Penulis PKM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPenulisPkmComponent id={selectedPKMId} handleClose={handleCloseAddAuthorModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListRiwayatPKMComponentDosen;