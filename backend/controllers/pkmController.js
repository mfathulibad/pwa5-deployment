const pkmModel = require('../models/pkm');
const fs = require('fs');
// import path from "path";

const getPKMById = (req, res) => {
  const id_pkm = req.params.id_pkm;
  pkmModel.getPKMById(id_pkm, (err, result) => {
      if (!err) {
          if (result) {
              res.send(result);
          } else {
              res.status(404).send('PKM tidak ditemukan');
          }
      } else {
          res.status(500).send(err.message);
      }
  });
}

const getPKMByIdDosen = (req, res) => {
  const id_pkm = req.params.id_pkm;
  pkmModel.getPKMById(id_pkm, (err, result) => {
      if (!err) {
          if (result) {
              res.send(result.rows);
          } else {
              res.status(404).send('PKM tidak ditemukan');
          }
      } else {
          res.status(500).send(err.message);
      }
  });
}

const getAllPKM = (req, res) => {
  pkmModel.getAllPKM((err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

const insertPKM = (req, res) => {
  
  const { judul_pkm, tahun_pkm, bidang_pkm, kontributor } = req.body;

  pkmModel.insertPKM(judul_pkm, tahun_pkm, bidang_pkm, kontributor, req.file.filename, (err, result) => {
    if (!err) {
      res.send('Insert success');
    } else {
      res.status(500).send(err.message);
    }
  });  
}

const updatePKM = (req, res) => {
  const id_pkm = req.params.id_pkm;

  const { judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm } = req.body;

  const link_baru = req.file ? req.file.filename : link_pkm

  if(req.file) {
    var deletedFile = './public/uploads/pkm/' + link_pkm
    if (fs.existsSync(deletedFile)) {
        fs.unlink(deletedFile, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
    }
  }

  pkmModel.updatePKM(id_pkm, judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_baru, (err, result) => {
    if (!err) {
      res.send('Update success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

const deletePKM = (req, res) => {
  const id_pkm = req.params.id_pkm;
  
  pkmModel.deletePKM(id_pkm, (err, result) => {
    if (!err) {
      res.send('Delete success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

module.exports = {
  getAllPKM,
  getPKMById,
  getPKMByIdDosen,
  insertPKM,
  updatePKM,
  deletePKM
};




// const pkmModel = require('../models/pkm');
// const fs = require('fs');

// const getAllPKM = (req, res) => {
//   pkmModel.getAllPKM((err, result) => {
//     if (!err) {
//       res.send(result.rows);
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// const getPKMById = (req, res) => {
//   const id_pkm = req.params.id_pkm;
//   pkmModel.getPKMById(id_pkm, (err, result) => {
//     if (!err) {
//       if (result) {
//         res.send(result);
//       } else {
//         res.status(404).send('PKM tidak ditemukan');
//       }
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// const getPKMByIdDosen = (req, res) => {
//   const id_dosen = req.params.id_dosen;
//   pkmModel.getPKMByIdDosen(id_dosen, (err, result) => {
//     if (!err) {
//       if (result) {
//         res.send(result.rows);
//       } else {
//         res.status(404).send('PKM tidak ditemukan');
//       }
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// const insertPKM = (req, res) => {
  
//   const {judul_pkm, tahun_pkm, bidang_pkm, kontributor } = req.body;

//   pkmModel.insertPKM(judul_pkm, tahun_pkm, bidang_pkm, kontributor, req.file.filename, (err, result) => {
//     if (!err) {
//       res.send('Insert success');
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// const updatePKM = (req, res) => {
//   const id_pkm = req.params.id_pkm;
  
//     const { judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_pkm } = req.body;
  
//     const link_baru = req.file ? req.file.filename : link_pkm
  
//     if(req.file) {
//       var deletedFile = './public/uploads/pkm/' + link_pkm
//       if (fs.existsSync(deletedFile)) {
//           fs.unlink(deletedFile, (err) => {
//               if (err) {
//                   console.log(err);
//               }
//               console.log('deleted');
//           })
//       }
//     }
  
//     pkmModel.updatePKM(id_pkm, judul_pkm, tahun_pkm, bidang_pkm, kontributor, link_baru, (err, result) => {
//       if (!err) {
//         res.send('Update success');
//       } else {
//         res.status(500).send(err.message);
//       }
//     });
// }

// const deletePKM = (req, res) => {
//   const id_pkm = req.params.id_pkm;
//   pkmModel.deletePKM(id_pkm, (err, result) => {
//     if (!err) {
//       res.send('Delete success');
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// }

// module.exports = {
//   getAllPKM,
//   getPKMById,
//   getPKMByIdDosen,
//   insertPKM,
//   updatePKM,
//   deletePKM,
// };