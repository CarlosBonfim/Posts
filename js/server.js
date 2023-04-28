const express = require("express");
const app = express();
const connection = require("./connection");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/posts");
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  const sqlQuery = "SELECT * FROM postagem";
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/posts", (req, res) => {
  const autor = req.body.autor;
  const texto = req.body.texto;
  const sqlQuery = `INSERT INTO postagem (autor, texto) VALUES ('${autor}', '${texto}')`;
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/posts", (req,res) => {
  const id = req.body.id;
  const sqlQuery = `DELETE from postagem where id = ${id}`
  connection.query(sqlQuery, function (err, result){
    if (err) throw err;
    res.send(id)
  })
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM postagem where id = ${id}`;
  connection.query(sqlQuery, function(err, result){
    if (err) throw err;
    res.send(result)
  })
})

app.put("/posts", (req,res) => {
  const id = req.body.id;
  const autor = req.body.autor;
  const texto = req.body.texto;
  const sqlQuery = `UPDATE postagem SET autor = '${autor}', texto = '${texto}' WHERE  id = ${id} `
  connection.query(sqlQuery, function (err, result) {
    if(err) throw err;
    res.send(result)
  })
  
})

app.listen(3000, () => {
  console.log("Funcionando na porta 3000");
});
