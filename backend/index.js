const express = require('express');
const bodyParser = require('body-parser');

const client = require('./connection');
const app = express();
const cors = require("cors");
const path = require('path');

const dosenRoute = require('./routes/dosenRoute');
const penelitianRoute = require('./routes/penelitianRoute');
const matkulRoute = require('./routes/matkulRoute');
const pkmRoute = require('./routes/pkmRoute');
const pendidikanRoute = require('./routes/pendidikanRoute');
const riwayatPenelitian = require('./routes/riwayatPenelitianRoute');
const riwayatPengajaranRoute = require('./routes/riwayatPengajaranRoute');
const riwayatPkmRoute = require('./routes/riwayatPkmRoute');

app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Izinkan permintaan dari asal apa pun (sebaiknya disesuaikan dengan lingkungan produksi)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  

//  Untuk running server pada port yang ditentukan
app.listen(3100, () =>{
    console.log('server running in port 3100')
})

// Untuk menghubungkan ke database postgree melalui node js
client.connect(err => {
    if(err){
        console.log(err.message);
    } else{
        console.log('Connected');
    }
})

app.use('/', dosenRoute)
app.use('/', penelitianRoute)
app.use('/', matkulRoute)
app.use('/', pkmRoute)
app.use('/', pendidikanRoute)
app.use('/', riwayatPenelitian)
app.use('/', riwayatPengajaranRoute)
app.use('/', riwayatPkmRoute)
app.use('/static', express.static(path.join(__dirname, 'public')))