import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'; // Impor CSS Bootstrap
import { Link } from "react-router-dom";
import BASE_URL from '../../../config';

const ListPenelitianComponent = () => {
  const [penelitianList, setPenelitianList] = useState([]);

  useEffect(() => {
    // Lakukan permintaan GET ke backend endpoint untuk mendapatkan daftar dosen
    axios.get(`${BASE_URL}/penelitian`)
      .then((response) => {
        setPenelitianList(response.data); // Mengatur data dosen ke dalam state
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, []); // Gunakan array kosong agar useEffect dijalankan hanya sekali saat komponen pertama kali dimuat

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
          .delete(`${BASE_URL}/penelitian/${id}`)
          .then(() => {
            setPenelitianList((prevPenelitianList) => 
              prevPenelitianList.filter((penelitian) => penelitian.id_penelitian !== id
            ));
            Swal.fire({
              title: "Berhasil menghapus data penelitian",
              icon: "success"
            });
          })
          .catch((error) => {
            console.error("Gagal menghapus data penelitian", error);
          });
      }
    });
  };

  

  return (
    <div className="container margin-class">
      <h2>List Penelitian</h2>

      
      <table className="table">
        <thead>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to={{ pathname: `/penelitian/insert` }}>
                <button type="button" className="btn btn-success btn-sm"> Tambah </button>
                </Link>
            </td>
          </tr>
          <tr>
            <th>ID Penelitian</th>
            <th>Judul</th>
            <th>Tanggal Publikasi</th>
            <th>Bidang</th>
            <th>Penulis</th>
            <th>Link Penelitian</th>
          </tr>
        </thead>
        <tbody>
          {penelitianList.map((penelitian) => (
            <tr key={penelitian.id_penelitian}>
              <td>{penelitian.id_penelitian}</td>
              <td>{penelitian.judul}</td>
              <td>{penelitian.tanggal_publikasi}</td>
              <td>{penelitian.bidang}</td>
              <td>{penelitian.author}</td>
              {/* <td>{penelitian.link_penelitian}</td> */}
              <td>
                <Link to={{ pathname: `/penelitian/edit/${penelitian.id_penelitian}` }}>
                  <button type="button" className="btn btn-success btn-sm ml-2">
                    Edit
                  </button>
                </Link>
                <button className="btn btn-danger btn-sm ml-2"
                  // Tambahkan fungsi onClick untuk tombol delete
                  onClick={() => { handleDelete(penelitian.id_penelitian);}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPenelitianComponent;
