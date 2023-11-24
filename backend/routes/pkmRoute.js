// const express = require("express");
// const router = express.Router();
// const pkmController = require("../controllers/pkmController");

// router.get('/pkm', pkmController.getAllPKM);
// router.get('/pkm/:id_pkm', pkmController.getPKMById);
// router.get('/pkm/dosen/:id_pkm', pkmController.getPKMByIdDosen);
// router.post('/pkm', pkmController.insertPKM);
// router.put('/pkm/:id_pkm', pkmController.updatePKM);
// router.delete('/pkm/:id_pkm', pkmController.deletePKM);

// module.exports = router;

const express = require("express");
const router = express.Router();
const pkmController = require("../controllers/pkmController");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/uploads/pkm",
    filename: function(req, file, cb){
       cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
})

router.get('/pkm', pkmController.getAllPKM);
router.get('/pkm/:id_pkm', pkmController.getPKMById);
router.post('/pkm', upload.single('file'), pkmController.insertPKM);
router.put('/pkm/:id_pkm', upload.single('file'), pkmController.updatePKM);
router.delete('/pkm/:id_pkm', pkmController.deletePKM);
router.get('/pkm/dosen/:id_pkm', pkmController.getPKMByIdDosen);

module.exports = router;
