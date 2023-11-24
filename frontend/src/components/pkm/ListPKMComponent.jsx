import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddPKMComponent from './AddPKMComponent';
import EditPKMComponent from './EditPKMComponent';
import BASE_URL from '../../../config';

const ListPKMComponent = () => {
  // State dan variabel
  const [pkmList, setPKMList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPKMId, setSelectedPKMId] = useState(null);

  // Fungsi untuk menampilkan modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Fungsi untuk menampilkan modal penyuntingan
  const handleShowEditModal = (id) => {
    setSelectedPKMId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  // Mengambil data PKM dari server menggunakan useEffect
  useEffect(() => {
    axios
      .get(`${BASE_URL}/pkm`)
      .then((response) => {
        const sortedPKMList = response.data.sort((a, b) =>
          a.id_pkm.localeCompare(b.id_pkm, undefined, { numeric: true })
        );
        setPKMList(sortedPKMList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fungsi untuk menghapus PKM
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data PKM",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/pkm/${id}`)
          .then(() => {
            setPKMList((prevPKMList) => prevPKMList.filter((pkm) => pkm.id_pkm !== id));
            Swal.fire({
              title: "Berhasil menghapus data PKM",
              icon: "success"
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data PKM", error);
          });
      }
    });
  };

  // Membuat daftar PKM yang difilter berdasarkan kata kunci pencarian
  const filteredPKMList = pkmList.filter((pkm) => {
    const fullName = `${pkm.judul_pkm} ${pkm.tahun_pkm} ${pkm.bidang_pkm} ${pkm.kontributor} ${pkm.link_pkm}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="container margin-class">
      {/* Tampilan daftar PKM */}
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
        <button type="button" className="btn btn-success btn-sm" onClick={handleShowModal}>
          Tambah PKM
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID PKM</th>
            <th>Judul PKM</th>
            <th>Tahun PKM</th>
            <th>Bidang PKM</th>
            <th>Link PKM</th>
            <th>Kontributor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPKMList.map((pkm) => (
            <tr key={pkm.id_pkm}>
              <td>{pkm.id_pkm}</td>
              <td>{pkm.judul_pkm}</td>
              <td>{pkm.tahun_pkm}</td>
              <td>{pkm.bidang_pkm}</td>
              <td>
                <a
                  href={pkm.link_pkm}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pkm.link_pkm}
                </a>
              </td>
              <td>{pkm.kontributor}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(pkm.id_pkm)}>
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    handleDelete(pkm.id_pkm);
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
          <AddPKMComponent handleClose={handleCloseModal} />
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
    </div>
  );
};

export default ListPKMComponent;