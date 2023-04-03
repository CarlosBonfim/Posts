const express = require("express");
const app = express();
const connection = require("./connection");
const port = 3000;

app.get("/posts", (req, res) => {
    connection.query("SELECT * FROM postagem", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log("Funcionando na porta 3000");
});
