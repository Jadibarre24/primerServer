const express= require("express");
const fs= require ("fs")
const {router:productsRouter }=require ("./routes/productsRouter")
const {router:cartsRouter } = require ( "./routes/cartsRouter")


const PORT=8080

const app=express()

app.use(express.json()); 
app.use(express.urlencoded({extedend:true}));
app.use("/api/productos", productsRouter)
app.use("/api/carts", cartsRouter)

app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('express server OK');
})

const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`))  

