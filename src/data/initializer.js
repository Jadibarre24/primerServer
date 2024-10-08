import fs from "fs"

const rutaProductos = "./src/data/productos.json";

const productos = [
    { "id": 1, "nombre": "Pan", "stock": 10 },
    { "id": 2, "nombre": "Queso", "stock": 80 },
    { "id": 3, "nombre": "Jamon", "stock": 15 },
    { "id": 4, "nombre": "Ketchup", "stock": 200 },
    { "id": 5, "nombre": "Tomate", "stock": 10 },
    { "id": 6, "nombre": "Lechuga", "stock": 10 },
    { "id": 7, "nombre": "Beicon", "stock": 100 },
    { "id": 8, "nombre": "Papas pequeñas", "stock": 100 },
    { "id": 9, "nombre": "Papas madianas", "stock": 100 },
    { "id": 10, "nombre": "Papas grandes", "stock": 100 },
    { "id": 11, "nombre": "Cebolla", "stock": 100 },
    { "id": 12, "nombre": "Carne", "stock": 100 },
    { "id": 13, "nombre": "Pollo", "stock": 100 },
    { "id": 14, "nombre": "Pepinillos", "stock": 100 },
    { "id": 15, "nombre": "Carne angus", "stock": 100 },
];
fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 5));

console.log("datos escritos en el json");
