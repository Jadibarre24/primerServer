const express= require("express");
const fs= require ("fs")
const productosManager= require (`./dao/productosManager`);

const PORT=8080

const app=express()

app.use(express.json());
app.use(express.urlencoded({extedend:true}));

productosManager.path= (`./data/products.json`)

app.get("/",(req,res)=>{
    
    res.send("express server")   
 
})


app.get("/productos",async (req,res)=>{
    let productos=await productosManager.getProductos()
    //res.send(`${productos}`)
    console.log(productos)
})

const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`))  
 