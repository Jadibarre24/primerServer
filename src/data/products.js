const fs= require("fs");

let rutaProductos="./src/data/products.json";


let productos = JSON.parse(fs.readFileSync(rutaProductos,{encoding:"utf-8"}));



    