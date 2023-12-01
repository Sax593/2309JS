require("dotenv").config();

const database = require("./database");

const express = require("express");
const app = express();

const PORT = process.env.APP_PORT

const bodyParser = require("body-parser");

const notFound = require("./log");
const verify = require("./verify")

app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendStatus(200);
})

app.get("/api/birds", (req, res) => {
    database.query("SELECT * FROM bird")
        .then(([data]) => {
            res.send(data)
        })
})

app.post("/api/birds", verify, (req, res) => {
    console.log(req.body);
    const { name, species, imgSrc, description, shortDescription } = req.body
    database.query("INSERT INTO bird (name, species, imgSrc, description, shortDescription) VALUES (?,?,?,?,?)", [name, species, imgSrc, description, shortDescription])
        .then(() => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(404)
        })
})

app.get("/api/birds/:id", notFound, (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id, 10);
    database.query("SELECT * FROM bird WHERE id=?", [id])
        .then((birds) => {
            if (birds[0] == null) {
                res.sendStatus(404);
            } else {
                res.send(birds[0])
            }
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on : http://localhost:${PORT}`)
})