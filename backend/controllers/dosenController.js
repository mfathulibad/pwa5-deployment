const dosenModel = require("../models/dosen");

const getAllDosen = (req, res) => {
  dosenModel.getAllDosen((err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
};

const getAllUser = (req, res) => {
  dosenModel.getAllUser((err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.status(500).send(err.message);
    }
  });
};

const getDosenById = (req, res) => {
  const id_dosen = req.params.id_dosen;
  dosenModel.getDosenById(id_dosen, (err, result) => {
    if (!err) {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Dosen tidak ditemukan");
      }
    } else {
      res.status(500).send(err.message);
    }
  });
};

const insertDosen = (req, res) => {
  const { nama, email, jabatan, jurusan } = req.body;
  dosenModel.insertDosen(nama, email, jabatan, jurusan, (err, result) => {
    if (!err) {
      res.send("Insert success");
    } else {
      res.status(500).send(err.message);
    }
  });
};

const updateDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  const { nama, email, jabatan, jurusan } = req.body;
  dosenModel.updateDosen(
    nama,
    email,
    jabatan,
    jurusan,
    id_dosen,
    (err, result) => {
      if (!err) {
        res.send("Update success");
      } else {
        res.status(500).send(err.message);
      }
    }
  );
};

const deleteDosen = (req, res) => {
  const id_dosen = req.params.id_dosen;
  dosenModel.deleteDosen(id_dosen, (err, result) => {
    if (!err) {
      res.send("Delete success");
    } else {
      res.status(500).send(err.message);
    }
  });
};

const getUserByUsername = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  dosenModel.getUserByUsername(username, password, (err, result) => {
    if (!err) {
      if (result) {
        res.send(result.rows);
      } else {
        res.status(404).send("Akun tidak ditemukan");
      }
    } else {
      res.status(500).send(err.message);
    }
  });
};

const getDosenByIdUser = (req, res) => {
  const id_user = req.params.id_user;
  dosenModel.getDosenByIdUser(id_user, (err, result) => {
    if (!err) {
      if (result) {
        res.send(result.rows);
      } else {
        res.status(404).send("Akun tidak ditemukan");
      }
    } else {
      res.status(500).send(err.message);
    }
  });
};

module.exports = {
  getAllDosen,
  getDosenById,
  insertDosen,
  updateDosen,
  deleteDosen,
  getUserByUsername,
  getDosenByIdUser
};
