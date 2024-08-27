import { productosManager } from "../dao/productosManager.js";
import { Router } from "express";
import fs from "fs"

export const router = Router()

productosManager.path = "./src/data/productos.json"

router.get("/", async (req, res) => {

    try {
        let productos = await productosManager.getProductos()
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productos });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )

    }

})

router.get("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }

    let productos
    try {
        productos = await productosManager.getProductos()
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    } console.log(productos)
    let { limit, skip } = req.query
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ingrese numeros` })
        }
    } else {
        limit = productos.length
    }

    if (skip) {
        skip = Number(skip)
        if (isNaN(skip)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Datos incorrectos ingrese numeros` })
        }
    } else {
        skip = 0
    }

    let resultado = productos.slice(skip, skip + limit)
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ resultado });

})

router.post("/", async (req, res) => {
    let { title, description, code, price, status, stock, category, ...otros } = req.body;
    if (!title) {
        if (!description) {
            if (!code) {
                if (!price) {
                    if (!stock) {
                        if (!category) {

                        }
                    }
                }
            }
        }
        /*  if (!title || !description || !code || !price || !status || stock ||!category) { */
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Agregue todos los datos  ` });
    }

    try {
        let productos = await productosManager.getProductos()
        let existe = productos.find(p => p.title.toLowerCase() === title.toLowerCase())
        let existeCode = productos.find(p => p.title.toLowerCase() === title.toLowerCase())
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya exixte producto llamado ${title} ` })
        } else if (existeCode) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya exixte producto con el codigo ${code} ` })
        }
        let productoNuevo = await productosManager.addProducto({ title, description, code, price, status, stock, category, ...otros });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productoNuevo });
    }

    catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )

    };
})

router.post("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }
    let { title, ...otros } = req.body
    if (!title) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Agregue nombre ` })
    }

    let productos = await productosManager.getProductos()
    let existe = productos.find(p => p.title.toLowerCase() === title.toLowerCase())
    if (existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ya exixte producto llamado ${title} ` })
    }

    try {
        let productoRecuperado = await productosManager.rescueProducto({ title, ...otros });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productoRecuperado });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )

    }
})
//put con error no detectado 
router.put("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }

    let productos
    try {
        productos = await productosManager.getProductos()
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }

    let producto = productos.find(p => p.id === id)
    if (!productos) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Producto con id ${id} not found` })
    }

    let modificar = req.body

    delete modificar.id

    if (modificar.title) {
        let existe = producto.find(p => p.title.toLowerCase() === modificar.title.toLowerCase() && p.id !== id)
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya hay otro heroe llamado ${modificar.title}` })
        }
    }
    try {
        let productoModificado = await productosManager.updateProducto(modificar)

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productoModificado });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )


    }

})

router.delete("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }
    try {
        let resultado = await productosManager.deleteProduct(id)
        if (resultado > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: `Producto eliminado ${title}` });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error al eliminar ` })
        }
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )

    }
})

