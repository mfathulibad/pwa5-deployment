const pendidikanModel = require("../models/pendidikan");

const getAllPendidikan = (req, res) => {
  pendidikanModel.getAllPendidikan((err, result) => {
    if (!err) {
      res.send(result.rows);
    }else {
      res.status(500).send(err.message);
    }
  });
}

const getPendidikanById = (req, res) => {
  const id_pendidikan = req.params.id_pendidikan;
  pendidikanModel.getPendidikanById(id_pendidikan, (err, result) => {
    if (!err) {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send('Mata Kuliah tidak ditemukan');
      }
    } else {
      res.status(500).send(err.message);
    }
  });
}

const insertPendidikan = (req, res) => {
    const { jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen } = req.body;
    pendidikanModel.insertPendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, (err, result) => {
      if (!err) {
        res.send('Insert success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const updatePendidikan = (req, res) => {
    const id_pendidikan = req.params.id_pendidikan;
    const { jenjang_pendidikan, nama_institusi, tahun_lulus } = req.body;
    pendidikanModel.updatePendidikan(id_pendidikan, jenjang_pendidikan, nama_institusi, tahun_lulus, (err, result) => {
      if (!err) {
        res.send('Update success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const deletePendidikan = (req, res) => {
    const id_pendidikan = req.params.id_pendidikan;
   pendidikanModel.deletePendidikan(id_pendidikan, (err, result) => {
      if (!err) {
        res.send('Delete success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const getPendidikanByIdDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  pendidikanModel.getPendidikanByIdDosen(id_dosen, (err, result) => {
    if(!err){
      res.send (result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

module.exports = {
    getAllPendidikan,
    getPendidikanById,
    insertPendidikan,
    updatePendidikan,
    deletePendidikan,
    getPendidikanByIdDosen
};

// const riwayatPendidikanModel = require('../models/pendidikan');

// const getAllRiwayatPendidikan = (req, res) => {
//     riwayatPendidikanModel.getAllRiwayatPendidikan((err, result) =>{
//         if (!err){
//             res.send(result.rows);
//         }else {
//             res.status(500).send(err.massage);
//         }
//     }); 
// }

// const getRiwayatPendidikanById = (req, res) => {
//   const id_pendidikan = req.params.id_pendidikan;
//   riwayatPendidikanModel.getRiwayatPendidikanById(id_pendidikan, (err, result) => {
//       if (!err) {
//           if (result) {
//               res.send(result.rows);
//           } else {
//               res.status(404).send('Penelitian tidak ditemukan');
//           }
//       } else {
//           res.status(500).send(err.message);
//       }
//   });
// }

// const getRiwayatPendidikanByIdDosen = (req, res) => {
//   const id_dosen = req.params.id_dosen;
//   riwayatPendidikanModel.getRiwayatPendidikanByIdDosen(id_dosen, (err, result) => {
//       if (!err) {
//           if (result) {
//               res.send(result.rows);
//           } else {
//               res.status(404).send('Penelitian tidak ditemukan');
//           }
//       } else {
//           res.status(500).send(err.message);
//       }
//   });
// }

// const insertRiwayatPendidikan = (req, res) => {
//   const { jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen } = req.body;
//   riwayatPendidikanModelModel.insertRiwayatPendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, (err, result) => {
//     if (!err) {
//       res.send('Insert success');
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// // const insertRiwayatPendidikan = (req, res) => {
// //     const {jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen} = req.body;
// //     riwayatPendidikanModel.insertRiwayatPendidikan(jenjang_pendidikan, nama_institusi, tahun_lulus, id_dosen, ( err, result)=>{
// //         if(!err ){
// //             res.send('Insert success');
// //         }else {
// //             res.status(500).send(err.massage);
// //         }
// //     });
// // }

// const updateRiwayatPendidikan = (req, res) => {
//     const id_pendidikan = req.params.id_pendidikan;
//     const { jenjang_pendidikan, nama_institusi, tahun_lulus } = req.body;
//     riwayatPendidikanModel.updateRiwayatPendidikan(id_pendidikan, jenjang_pendidikan, nama_institusi, tahun_lulus, (err, result) => {
//       if (!err) {
//         res.send('Update success');
//       } else {
//         res.status(500).send(err.message);
//       }
//     });
//   }

// const deleteRiwayatPendidikan = (req, res) => {
//     const id_pendidikan = req.params.id_pendidikan;
//     riwayatPendidikanModel.deleteRiwayatPendidikan(id_pendidikan, (err, result) => {
//       if (!err) {
//         res.send('Delete success');
//       } else {
//         res.status(500).send(err.message);
//       }
//     });
//   }

// module.exports = {
//     getAllRiwayatPendidikan,
//     getRiwayatPendidikanById,
//     getRiwayatPendidikanByIdDosen,
//     insertRiwayatPendidikan,
//     updateRiwayatPendidikan,
//     deleteRiwayatPendidikan
// };