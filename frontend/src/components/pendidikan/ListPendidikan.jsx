import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BASE_URL from '../../../config';

const ListRiwayatPendidikanCom = ({ id }) => {
  const [listRiwayatPendidikan, setlistRiwayatPendidikan] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_dosen/riwayat_pendidikan/${id}`)
      .then((response) => {
        const sortedRiwayatPendidikan = response.data.sort((a, b) => {
          if (a.tahun_lulus === b.tahun_lulus) {
            return a.jenjang_pendidikan.localeCompare(b.jenjang_pendidikan);
          }
          return a.tahun_lulus - b.tahun_lulus;
        });
        setlistRiwayatPendidikan(sortedRiwayatPendidikan);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-4" style={{ textAlign: "left" }}>
      <ul style={{ paddingLeft: "20px" }}>
        {listRiwayatPendidikan.map((riwayat_pendidikan) => (
          <li key={riwayat_pendidikan.id_pendidikan}>
            <div>
              <p>{riwayat_pendidikan.jenjang_pendidikan}, {riwayat_pendidikan.tahun_lulus}, {riwayat_pendidikan.nama_institusi}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>  
  );
};

export default ListRiwayatPendidikanCom;
