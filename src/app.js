import express from 'express';
//import fs from `fs`;
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import {router as productsRouter }from "./routes/productsRouter.js";
import {router as cartsRouter } from "./routes/cartsRouter.js";
import {router as viewRouter} from "./routes/viewRouter.js";
import {router as sessionRouter} from "./routes/sessionRouter.js";
import { productosManager } from './dao/ProductosManager.js';
import { cartsManager } from './dao/CartsManager.js';
import { connDB } from './connDb.js';
import { config } from './config/config.js';
//import { cookieParser } from "cookie-parser";
//import {session } from 'express-session';

let io

productosManager.path ="./src/data/productos.json"
cartsManager.path ="./src/data/carrito.json"

const PORT=config.PORT;

const app=express()

app.use(express.json()); 
app.use(express.urlencoded({extedend:true}));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));
//app.use(cookieParser('palabrasecreta'));
//app.use(session)
app.use("/api/productos", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter)


const server=app.listen(PORT,()=> console.log(`Server online en puerto ${PORT}`));

io=new Server(server)

connDB()