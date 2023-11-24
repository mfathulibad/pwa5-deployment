const pengajaranModel = require("../models/riwayat_pengajaran");

const getAllPengajaran = (req, res) => {
  pengajaranModel.getAllPengajaran((err, result) => {
    if (!err) {
      res.send(result.rows);
    }else {
      res.status(500).send(err.message);
    }
  });
}

const getPengajaranById = (req, res) => {
  const id_pengajaran = req.params.id_pengajaran;
  pengajaranModel.getPengajaranById(id_pengajaran, (err, result) => {
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

const insertPengajaran = (req, res) => {
    const { id_matkul, id_dosen, semester, tahun } = req.body;
    pengajaranModel.insertPengajaran(id_matkul, id_dosen, semester, tahun, (err, result) => {
      if (!err) {
        res.send('Insert success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const updatePengajaran = (req, res) => {
    const id_pengajaran = req.params.id_pengajaran;
    const { id_matkul, id_dosen, semester, tahun } = req.body;
    pengajaranModel.updatePengajaran(id_pengajaran, id_matkul, id_dosen, semester, tahun, (err, result) => {
      if (!err) {
        res.send('Update success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const deletePengajaran = (req, res) => {
    const id_pengajaran = req.params.id_pengajaran;
   pengajaranModel.deletePengajaran(id_pengajaran, (err, result) => {
      if (!err) {
        res.send('Delete success');
      } else {
        res.status(500).send(err.message);
      }
    });
}

const getPengajaranByIdDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  pengajaranModel.getPengajaranByIdDosen(id_dosen, (err, result) => {
    if(!err){
      res.send (result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

module.exports = {
    getAllPengajaran,
    getPengajaranById,
    insertPengajaran,
    updatePengajaran,
    deletePengajaran,
    getPengajaranByIdDosen
};