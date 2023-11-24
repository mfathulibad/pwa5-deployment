const {Client} = require('pg')

const client = new Client({
    host: "pwa5_postgres",
    user: "postgres",
    port: 5432,
    password: "pwa5_070702",
    database: "lectureProfile"
})

module.exports = client