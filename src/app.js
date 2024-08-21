const express= require("express");
const fs= require ("fs")
const productosManager= require (`./dao/productosManager.js`);


const PORT=8080

const app=express()

app.use(express.json());
app.use(express.urlencoded({extedend:true}));

productosManager.path= "./src/data/products.json"

app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('express server OK');
})


app.get("/productos",async (req,res)=>{
    let productos=await productosManager.getProductos()
    res.send(productos)
    console.log(productos)
})

app.get("/productos/:id",async (req,res)=>{
    let {id} =req.params
    id = Number(id)
    if (isNaN(id)){
        return res.send("Ingrese id valido")
    }
app.get("/productos",(req, res)=>{
    let {limit}=req.query
    if (limit){
        limit=Number(limit)
        if(isNaN(limit)){
            return res.send("El filtro debe ser un numero")
        }else{
            limit=productos.length
        }
        let resultado=productos.slice(0,limit)
        res.send(resultado)
    }
})
    let productos= await productosManager.getProductos()
    let producto = productos.find(p => p.id===id)
        if (!productos){
            return res.send (`Producto con id ${id} not found`)
        }   
    res.send(producto)
})

const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`))  

 