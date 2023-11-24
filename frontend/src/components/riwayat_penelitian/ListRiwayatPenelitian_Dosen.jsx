import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import { Card, Modal, Button } from 'react-bootstrap'
import { FaSearch, FaEdit, FaTrash, FaFile, FaPlus  } from 'react-icons/fa';
import AddPenulisPenelitianComponent from '../riwayat_penelitian/AddRiwayatPenelitianComponent';
import AddPenelitianComponent from '../penelitian/AddPenelitianComponent';
import EditPenelitianComponent from '../penelitian/EditPenelitianComponent';
import '../style.css';
import BASE_URL from '../../../config';

import { Link } from "react-router-dom";

const ListRiwayatPenelitianCom = ({ id }) => {
  const [listRiwayatPenelitian, setlistRiwayatPenelitian] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTambahPenulisModal, setShowTambahPenelitianModal] = useState(false);
  const [selectedPenelitianId, setSelectedPenelitianId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedPenelitianId(id)
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedPenelitianId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowAddAuthorModal = (id) => {
    setSelectedPenelitianId(id);
    setShowTambahPenelitianModal(true);
  };

  const handleCloseAddAuthorModal = () => {
    setShowTambahPenelitianModal(false);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_penelitian/${id}`)
      .then((response) => {
        const sortedRiwayatPenelitianList = response.data.sort((a, b) =>
          b.tanggal_publikasi.localeCompare(a.tanggal_publikasi, undefined, { numeric: false })
        );
        setlistRiwayatPenelitian(sortedRiwayatPenelitianList); // Mengatur data dosen ke dalam state
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

   // Fungsi untuk menghapus data penelitian berdasarkan ID
   const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data penelitian",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/riwayat_penelitian/${id}`)
          .then(() => {
            setlistRiwayatPenelitian((prevRiwayatPenelitianList) =>
              prevRiwayatPenelitianList.filter(
                (riwayat_penelitian) =>
                  riwayat_penelitian.id_riwayatpenelitian !== id
              )
            );
            Swal.fire({
              title: "Berhasil menghapus data penelitian",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data penelitian", error);
          });
      }
    });
  };
  

  const filteredRiwayatPenelitianList = listRiwayatPenelitian.filter((riwayat_penelitian) => {
    const fullName = `${riwayat_penelitian.judul} ${riwayat_penelitian.tanggal_publikasi} ${riwayat_penelitian.bidang} ${riwayat_penelitian.nama}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div className="container" style={{ marginTop: "-80px" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar Penelitian</h2>
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
              placeholder="Cari Penelitian..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        </div>
        <button type="button" className="btn btn-success btn-sm" onClick={() => handleShowModal(id)}>
          Tambah Penelitian
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Judul</th>
            <th>Tanggal Publikasi</th>
            <th>Bidang</th>
            <th>Author</th>
            <th>Link Penelitian</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRiwayatPenelitianList.map((riwayat_penelitian) => (
            <tr key={riwayat_penelitian.id_riwayatpenelitian}>
              <td>{riwayat_penelitian.judul}</td>
              <td>{formatDate(riwayat_penelitian.tanggal_publikasi)}</td>
              <td>{riwayat_penelitian.bidang}</td>
              <td>{riwayat_penelitian.nama}</td>
              {/* <td>{riwayat_penelitian.author}</td> */}
              <td>
                <a className="btn btn-primary btn-sm" target="_blank" href={`${BASE_URL}/static/uploads/penelitian/`+riwayat_penelitian.link_penelitian}><FaFile></FaFile> Lihat File</a>
              </td>
                
              <td>
                <button className="btn btn-success btn-sm" onClick={() => { handleShowAddAuthorModal(riwayat_penelitian.id_penelitian);}}>
                  <FaPlus  />
                </button>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(riwayat_penelitian.id_penelitian)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => { handleDelete(riwayat_penelitian.id_riwayatpenelitian); }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title>Tambah Penelitian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPenelitianComponent id={selectedPenelitianId} handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Penelitian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPenelitianComponent id={selectedPenelitianId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showTambahPenulisModal} onHide={handleCloseAddAuthorModal}>
        <Modal.Header closeButton>
        <Modal.Title>Tambah Penulis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPenulisPenelitianComponent id={selectedPenelitianId} handleClose={handleCloseAddAuthorModal} />
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default ListRiwayatPenelitianCom;
