const express = require("express");
const app = express();
const connection = require("./connection");

app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/posts");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/posts", (req, res) => {
    connection.query("SELECT * FROM postagem", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(3000, () => {
    console.log("Funcionando na porta 3000");
});
