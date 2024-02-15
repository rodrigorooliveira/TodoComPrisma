const express = require("express")

const todosRoutes = express.Router();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

//alltodos = [{nome:"aaaa", status: false}];


todosRoutes.post("/todos", async (req, res) => {
    const {name} = req.body;
    const todo = await prisma.todo.create({
        data: {
            name,
            status: true,
        },
    });

   return res.status(201).json(todo);
});


todosRoutes.get("/ver", async (req, res)=> {
    const todos = await prisma.todo.findMany()
    return res.status(200).json(todos);
});

todosRoutes.put("/atualizar", async (req, res) => {
 const {name, id, status} = req.body

 if (!id) {
    return res.status(400).json("id é obrigatório!!!");
 }

 const todoAlreadyExist = await prisma.todo.findUnique({ where: { id }  });

 if (!todoAlreadyExist) {
     return res.status(404).json("Registro não Existe!!!");
 }

 const todo = await prisma.todo.update({
    where: {
        id, 
    },
     data: {
        name,
        status,
     },
});

return res.status(200).json(todo);

});
todosRoutes.delete("/apagar/:id", async (req, res) => {
    const { id } = req.params;

    const intId = parseInt(id);

    if (!intId) {
        return res.status(400).json("id é obrigatório!!!");
     }
    
     const todoAlreadyExist = await prisma.todo.findUnique({ where: {id: intId}  });
    
     if (!todoAlreadyExist) {
         return res.status(404).json("Registro não Existe!!!");
     }

    await prisma.todo.delete({where: {id: intId} }); 
    
    return res.status(200).send();
});

module.exports = todosRoutes;