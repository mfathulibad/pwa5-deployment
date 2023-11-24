import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Card, Modal, Button } from 'react-bootstrap'
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddPengajaranComponent from '../riwayat_pengajaran/AddRiwayatPengajaranComponent';
import EditPengajaranComponent from '../riwayat_pengajaran/EditRiwayatPengajaranComponent';
import BASE_URL from '../../../config';

import { Link } from "react-router-dom";

const ListRiwayatPengajaranCom = ({ id }) => {
  const [listRiwayatPengajaran, setlistRiwayatPengajaran] = useState([]);
  // const [pengajarannList, setPenelitiaList] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPengajaranId, setSelectedPengajaranId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedPengajaranId(id);
    setShowModal(true);
  }
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedPengajaranId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    
    setShowEditModal(false);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_pengajaran/${id}`)
      .then((response) => {
        const sortedRiwayatPengajaranList = response.data.sort((a, b) => {
          if (a.tahun === b.tahun) {
            return a.nama_matkul.localeCompare(b.nama_matkul);
          }
          return a.tahun - b.tahun;
        });
        setlistRiwayatPengajaran(sortedRiwayatPengajaranList); // Mengatur data dosen ke dalam state
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
      text: "Anda akan menghapus data pengajaran",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/riwayat_pengajaran/${id}`)
          .then(() => {
            setlistRiwayatPengajaran((prevRiwayatPengajaranList) =>
              prevRiwayatPengajaranList.filter(
                (riwayat_pengajaran) =>
                  riwayat_pengajaran.id_pengajaran !== id
              )
            );
            Swal.fire({
              title: "Berhasil menghapus data pengajaran",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data pengajaran", error);
          });
      }
    });
  };
  
  const filteredPengajaranList = listRiwayatPengajaran.filter((riwayat_pengajaran) => {
    const fullName = `${riwayat_pengajaran.kode_matkul} ${riwayat_pengajaran.nama_matkul} ${riwayat_pengajaran.semester} ${riwayat_pengajaran.tahun} ${riwayat_pengajaran.kode_kelas} ${riwayat_pengajaran.perguruan_tinggi}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="container" style={{marginTop:'30px'}}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar Pengajaran</h2>
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
        <button type="button" className="btn btn-success btn-sm" onClick={() => handleShowModal(id)}>
          Tambah Pengajaran
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Kode Mata Kuliah</th>
            <th>Nama Mata Kuliah</th>
            <th>Semester</th>
            <th>Kode Kelas</th>
            <th>Perguruan Tinggi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPengajaranList.map((riwayat_pengajaran) => (
            <tr key={riwayat_pengajaran.kode_matkul}>
              <td>{riwayat_pengajaran.kode_matkul}</td>
              <td>{riwayat_pengajaran.nama_matkul}</td>
              <td>{riwayat_pengajaran.semester} {riwayat_pengajaran.tahun}</td>
              <td>{riwayat_pengajaran.kode_kelas}</td>
              <td>{riwayat_pengajaran.perguruan_tinggi}</td>
              <td>
                {/* <Link to={{ pathname: `/dosen/edit/${dosen.id_dosen}` }}> */}
                  <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(riwayat_pengajaran.id_pengajaran)}>
                    <FaEdit />
                  </button>
                {/* </Link> */}
                <button
                  className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleDelete(riwayat_pengajaran.id_pengajaran);
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
        <Modal.Title>Tambah Pengajaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPengajaranComponent id={selectedPengajaranId} handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Pengajaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPengajaranComponent id={selectedPengajaranId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListRiwayatPengajaranCom;
