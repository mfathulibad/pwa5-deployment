// routes/dosenRoute.js
const express = require("express");
const router = express.Router();
const penelitianController = require("../controllers/penelitianController");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/uploads/penelitian",
    filename: function(req, file, cb){
       cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
})

router.get('/penelitian', penelitianController.getAllPenelitian);
router.get('/penelitian/:id_penelitian', penelitianController.getPenelitianById);
router.post('/penelitian', upload.single('file'), penelitianController.insertPenelitian);
router.put('/penelitian/:id_penelitian', upload.single('file'), penelitianController.updatePenelitian);
router.delete('/penelitian/:id_penelitian', penelitianController.deletePenelitian);
router.get('/penelitian/dosen/:id_penelitian', penelitianController.getPenelitianByIdDosen);

module.exports = router;
