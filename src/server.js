const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes");

const app = express()

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get("/testa", (req, res) => {
    return res.json("UP tudo certo");
});

app.listen(3333, () => console.log("O Servidor está rondando na porta 3333"));