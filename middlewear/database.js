const { HOST, PORT, USER, PASSWORD, DB_NAME } = process.env;

const mysql = require("mysql2/promise");

const client = mysql.createPool(
    {
        host: HOST,
        port: PORT,
        user: USER,
        password: PASSWORD,
        database: DB_NAME
    }
);

client.getConnection().then((connection) => {
    console.info(`Using database ${DB_NAME}`);
    connection.release()
}).catch((error) => {
    console.warn(
        "WARNING",
        "Failed to established a database conection.",
        "Pease check your database credentials in the .env file if you need a database access."
    );
    console.error("Error message", error.message);
})

client.database = DB_NAME;
module.exports = client;