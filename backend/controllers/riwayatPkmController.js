const riwayatPkmModel = require('../models/riwayatPkm');

const getAllRiwayatPKM = (req, res) => {
  riwayatPkmModel.getAllRiwayatPKM((err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

const getRiwayatPKMExceptDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  riwayatPkmModel.getRiwayatPKMExceptDosen(id_dosen, (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.send(result.rows);
      } else {
        res.status(404).send('Data PKM tidak ditemukan untuk dosen dengan ID tertentu');
      }
    } else {
      res.status(500).send(err.message);
    }
  });
}

const getRiwayatPKMById = (req, res) => {
  const id_riwayatpkm = req.params.id_riwayatpkm;
  riwayatPkmModel.getRiwayatPKMById(id_riwayatpkm, (err, result) => {
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

const getDosenByIdPKM = (req, res) => {
  const id_pkm = req.params.id_pkm;
  riwayatPkmModel.getDosenByIdPKM(id_pkm, (err, result) => {
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

const getPKMByIdDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  riwayatPkmModel.getPKMByIdDosen(id_dosen, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

const insertRiwayatPKM = (req, res) => {
  const { id_pkm, id_dosen } = req.body;
  riwayatPkmModel.insertRiwayatPKM(id_pkm, id_dosen, (err, result) => {
    if (!err) {
      res.send('Insert success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

const updateRiwayatPKM = (req, res) => {
  const id_riwayatpkm = req.params.id_riwayatpkm;
  const { id_pkm, id_dosen } = req.body;
  riwayatPkmModel.updateRiwayatPKM(id_riwayatpkm, id_pkm, id_dosen, (err, result) => {
    if (!err) {
      res.send('Update success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

const deleteRiwayatPKM = (req, res) => {
  const id_riwayatpkm = req.params.id_riwayatpkm;
  riwayatPkmModel.deleteRiwayatPKM(id_riwayatpkm, (err, result) => {
    if (!err) {
      res.send('Delete success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

module.exports = {
  getAllRiwayatPKM,
  getRiwayatPKMById,
  getDosenByIdPKM,
  getPKMByIdDosen,
  deleteRiwayatPKM,
  insertRiwayatPKM,
  updateRiwayatPKM,
  getRiwayatPKMExceptDosen,
};
