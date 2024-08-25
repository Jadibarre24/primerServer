import fs from"fs";

let rutaProductos="./src/data/productos.json";


let productos = JSON.parse(fs.readFileSync(rutaProductos,{encoding:"utf-8"}));

