const express= require("express");
const {productos}= require("./data/products.json");

const PORT=8080

const app=express()

app.use(express.json());
app.use(express.urlencoded({extedend:true}));

app.get("/",(req,res)=>{
    
    res.send("express server")   
 
})


app.get("/productos", (req,res)=>{
    res.send(fs.readFilesync(productos,{encoding:"utf-8"}))
    console.log(productos)
})

const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`))  
//const fs= require ("fs")
 