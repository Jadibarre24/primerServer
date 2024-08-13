const { ALL } = require("dns");
const fs = require("fs")
let rutaProductos="./data/products.json"

const productos = [
    { "id": 1, "nombre": "Pan", "stock": 10 },
    { "id": 2, "nombre": "Queso", "stock": 80 },
    { "id": 3, "nombre": "Jamon", "stock": 15 },
    { "id": 4, "nombre": "Ketchup", "stock": 200 },
    { "id": 5, "nombre": "Tomate", "stock": 10 },
    { "id": 6, "nombre": "Lechuga", "stock": 10 }
];

fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 5));
console.log("Archivo escrito correctamente");

    
    let productosDesdeJson = JSON.parse(fs.readFileSync(rutaProductos,{encoding:"utf-8"}))
    console.log(productosDesdeJson[3].nombre)  