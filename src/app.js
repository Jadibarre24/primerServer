import express from 'express';
//import fs from `fs`;
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import {router as productsRouter }from "./routes/productsRouter";
import {router as cartsRouter } from "./routes/cartsRouter";
import {router as viewRouter} from './routes/viewRouter';
import { productosManager } from './dao/productosManager';
import { cartsManager } from './dao/cartsManager';


let io

productosManager.path ="./data/productos.json"
cartsManager.path ="./data/carts.json"

const PORT=8080

const app=express()

app.use(express.json()); 
app.use(express.urlencoded({extedend:true}));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));
app.use("/api/productos", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter)


const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`));

io=new Server(server)

