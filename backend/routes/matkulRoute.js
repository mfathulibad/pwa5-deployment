// routes/pengajaranRoute.js
const express = require("express");
const router = express.Router();
const matkulController = require("../controllers/matkulController");

router.get('/mata_kuliah', matkulController.getAllMatkul);
router.get('/mata_kuliah/:id_matkul', matkulController.getMatkulById);
router.post('/mata_kuliah', matkulController.insertMatkul);
router.put('/mata_kuliah/:id_matkul', matkulController.updateMatkul);
router.delete('/mata_kuliah/:id_matkul', matkulController.deleteMatkul);

module.exports = router;
