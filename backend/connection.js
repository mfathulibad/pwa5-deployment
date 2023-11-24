const {Client} = require('pg')

const client = new Client({
    host: "172.17.0.4",
    user: "postgres",
    port: 5432,
    password: "pwa5_070702",
    database: "lectureProfile"
})

module.exports = client