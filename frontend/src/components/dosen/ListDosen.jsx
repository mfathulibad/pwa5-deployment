import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Card, Modal, Button } from 'react-bootstrap'
import { FaSearch, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import AddDosenComponent from './AddDosenComponent';
import EditDosenComponent from './EditDosenComponent';
import './../style.css';
import BASE_URL from '../../../config';


const ListDosenComponent = () => {
  const [dosenList, setDosenList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDosenId, setSelectedDosenId] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (id) => {
    setSelectedDosenId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };


  useEffect(() => {
    axios
      .get(`${BASE_URL}/dosen`)
      .then((response) => {
        const sortedDosenList = response.data.sort((a, b) =>
          a.id_dosen.localeCompare(b.id_dosen, undefined, { numeric: true })
        );
        setDosenList(sortedDosenList);
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menghapus data dosen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/dosen/${id}`)
          .then(() => {
            setDosenList((prevDosenList) =>
              prevDosenList.filter((dosen) => dosen.id_dosen !== id)
            );
            Swal.fire({
              title: "Berhasil menghapus data dosen!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data dosen", error);
          });
      }
    });
  };
  

  const filteredDosenList = dosenList.filter((dosen) => {
    const fullName = `${dosen.nama} ${dosen.email} ${dosen.jabatan} ${dosen.jurusan}`;
    return fullName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="container margin-class">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Daftar Dosen</h2>
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
              placeholder="Cari dosen..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>
        </div>
        <button type="button" className="btn btn-success btn-sm" onClick={handleShowModal}>
          Tambah Dosen
        </button>
      </div>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID Dosen</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Jurusan</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDosenList.map((dosen) => (
            <tr key={dosen.id_dosen}>
              <td>{dosen.id_dosen}</td>
              <td>{dosen.nama}</td>
              <td>{dosen.jabatan}</td>
              <td>{dosen.jurusan}</td>
              <td>{dosen.email}</td>
              <td>{dosen.password}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleShowEditModal(dosen.id_dosen)}>
                  <FaEdit />
                 </button>
                <button
                  className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleDelete(dosen.id_dosen);
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
        <Modal.Title>Tambah Dosen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDosenComponent handleClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Dosen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDosenComponent id={selectedDosenId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListDosenComponent;
