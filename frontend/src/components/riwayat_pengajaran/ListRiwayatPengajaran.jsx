import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from '../../../config';

const ListRiwayatPengajaranCom = ({ id }) => {
  const [listRiwayatPengajaran, setlistRiwayatPengajaran] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_pengajaran/${id}`)
      .then((response) => {
        setlistRiwayatPengajaran(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Kode Matkul</th>
            <th>Nama Matkul</th>
            <th>Semester</th>
            <th>Kode Kelas</th>
            <th>Perguruan Tinggi</th>
          </tr>
        </thead>
        <tbody>
          {listRiwayatPengajaran.map((riwayat_pengajaran) => (
            <tr key={riwayat_pengajaran.kode_matkul}>
              <td>{riwayat_pengajaran.kode_matkul}</td>
              <td>{riwayat_pengajaran.nama_matkul}</td>
              <td>{riwayat_pengajaran.semester} {riwayat_pengajaran.tahun}</td>
              <td>{riwayat_pengajaran.kode_kelas}</td>
              <td>{riwayat_pengajaran.perguruan_tinggi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRiwayatPengajaranCom;
