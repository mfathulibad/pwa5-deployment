const riwayatPenelitianModel = require("../models/riwayatPenelitian");

const getRiwayatPenelitianById = (req, res) => {
  const id_riwayatpenelitian = req.params.id_riwayatpenelitian;
  riwayatPenelitianModel.getRiwayatPenelitianById(id_riwayatpenelitian, (err, result) => {
      if (!err) {
          if (result) {
              res.send(result);
          } else {
              res.status(404).send('Penelitian tidak ditemukan');
          }
      } else {
          res.status(500).send(err.message);
      }
  });
}

const getRiwayatPenelitianExceptDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  riwayatPenelitianModel.getRiwayatPenelitianExceptDosen(id_dosen, (err, result) => {
      if (!err) {
          if (result.rows.length > 0) {
              res.send(result.rows);
          } else {
              res.status(404).send('Data penelitian tidak ditemukan untuk dosen dengan ID tertentu');
          }
      } else {
          res.status(500).send(err.message);
      }
  });
}

const getDosenByIdPenelitian = (req, res) => {
  const id_penelitian = req.params.id_penelitian;
  riwayatPenelitianModel.getDosenByIdPenelitian(id_penelitian, (err, result) => {
      if (!err) {
          if (result) {
              res.send(result.rows);
          } else {
              res.status(404).send('Penelitian tidak ditemukan');
          }
      } else {
          res.status(500).send(err.message);
      }
  });
}

const getAllRiwayatPenelitian = (req, res) => {
  riwayatPenelitianModel.getAllRiwayatPenelitian((err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}

const insertRiwayatPenelitian = (req, res) => {
  const {id_dosen, id_penelitian} = req.body;

  riwayatPenelitianModel.insertRiwayatPenelitian(id_dosen, id_penelitian, (err, result) => {
    if (!err) {
      res.send('Insert success');
    } else {
      res.status(500).send(err.message);
    }

  });  
}

const updateRiwayatPenelitian = (req, res) => {
  const id_riwayatpenelitian = req.params.id_riwayatpenelitian;
  const {id_penelitian, id_dosen} = req.body;
  riwayatPenelitianModel.updateRiwayatPenelitian(id_riwayatpenelitian,id_penelitian, id_dosen, (err, result) => {
    if (!err) {
      res.send('Update success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

const deleteRiwayatPenelitian = (req, res) => {
  const id_riwayatpenelitian = req.params.id_riwayatpenelitian;
  
  riwayatPenelitianModel.deleteRiwayatPenelitian(id_riwayatpenelitian, (err, result) => {
    if (!err) {
      res.send('Delete success');
    } else {
      res.status(500).send(err.message);
    }
  });
}

const getPenelitianByIdDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  riwayatPenelitianModel.getPenelitianByIdDosen(id_dosen, (err, result) => {
    if(!err){
      res.send (result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
}


module.exports = {
  getAllRiwayatPenelitian,
  getRiwayatPenelitianById,
  getDosenByIdPenelitian,
  insertRiwayatPenelitian,
  updateRiwayatPenelitian,
  deleteRiwayatPenelitian,
  getPenelitianByIdDosen,
  getRiwayatPenelitianExceptDosen
};


