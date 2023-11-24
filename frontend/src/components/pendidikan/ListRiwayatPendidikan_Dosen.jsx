import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Modal, Button } from 'react-bootstrap'
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddPendidikanComponent from '../pendidikan/AddPendidikanComponent';
import EditPendidikanComponent from '../pendidikan/EditPendidikanComponent';
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

import { Link } from "react-router-dom";

const ListRiwayatPendidikanCom = ({ id }) => {
  const [listRiwayatPendidikan, setlistRiwayatPendidikan] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPendidikanId, setSelectedPendidikanId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedPendidikanId(id)
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedPendidikanId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_pendidikan/${id}`)
      .then((response) => {
        const sortedRiwayatPendidikanList = response.data.sort((a, b) => {
          if (a.tahun_lulus === b.tahun_lulus) {
            return a.jenjang_pendidikan.localeCompare(b.jenjang_pendidikan);
          }
          return a.tahun_lulus - b.tahun_lulus;
        });
        setlistRiwayatPendidikan(sortedRiwayatPendidikanList);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data pendidikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/riwayat_pendidikan/${id}`)
          .then(() => {
            setlistRiwayatPendidikan((prevRiwayatPendidikanList) =>
              prevRiwayatPendidikanList.filter(
                (riwayat_pendidikan) =>
                  riwayat_pendidikan.id_pendidikan !== id
              )
            );
            Swal.fire({
              title: "Berhasil menghapus data pendidikan",
              icon: "success",
              didClose: () => {
                // Logika untuk pindah ke halaman tertentu setelah SweetAlert ditutup
                window.location.reload();
              },
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data pendidikan", error);
          });
      }
    });
  };
  

  const filteredPendidikanList = listRiwayatPendidikan.filter((riwayat_pendidikan) => {
    const fullName = `${riwayat_pendidikan.jenjang_pendidikan} ${riwayat_pendidikan.nama_institusi} ${riwayat_pendidikan.tahun_lulus}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="container" style={{marginTop:'30px'}}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar Pendidikan</h2>
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
              placeholder="Cari Pendidikan..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        </div>
        <button type="button" className="btn btn-success btn-sm" onClick={() => handleShowModal(id)}>
          Tambah Pendidikan
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Jenjang Pendidikan</th>
            <th>Nama Institusi</th>
            <th>Tahun Lulus</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPendidikanList.map((riwayat_pendidikan) => (
            <tr key={riwayat_pendidikan.jenjang_pendidikan}>
              <td>{riwayat_pendidikan.jenjang_pendidikan}</td>
              <td>{riwayat_pendidikan.nama_institusi}</td>
              <td>{riwayat_pendidikan.tahun_lulus}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(riwayat_pendidikan.id_pendidikan)}>
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleDelete(riwayat_pendidikan.id_pendidikan);
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
        <Modal.Title>Tambah Pendidikan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPendidikanComponent id={selectedPendidikanId} handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Pendidikan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPendidikanComponent id={selectedPendidikanId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListRiwayatPendidikanCom;
