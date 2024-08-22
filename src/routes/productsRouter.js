const { Router } = require("express")
const productosManager= require ("../dao/productosManager")

const router = Router()

productosManager.path= "./src/data/products.json"

/* router.get("/", (req, res) => { })
router.post("/", (req, res) => { })
router.delete("/", (req, res) => { })
 */
router.get("/", async (req, res) => {
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
    res.send(productos)
    console.log(productos)
})

router.get("/api/productos/", (req, res) => {
    let { limit } = req.query
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El filtro debe ser un numero` })
        } else {
            limit = productos.length
        }
        let resultado = productos.slice(0, limit)
        res.send(resultado)
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
    }

    let producto = productos.find(p => p.id === id)
    if (!productos) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Producto con id ${id} not found` })
    }
    res.status(200).json({ producto });
})

router.post("/", async (req, res) => {
    let { nombre, ...otros } = req.body
    if (!nombre) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Agregue nombre ` })
    }

    let productos = await productosManager.getProductos()
    let existe = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ya exixte producto llamado ${nombre} ` })
    }

    try {
        let productoNuevo = await productosManager.addProducto({ nombre, ...otros });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productoNuevo });
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
router.post("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }
    let { nombre, ...otros } = req.body
    if (!nombre) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Agregue nombre ` })
    }

    let productos = await productosManager.getProductos()
    let existe = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ya exixte producto llamado ${nombre} ` })
    }

    try {
        let productoRecuperado = await productosManager.rescueProducto({ id, ...otros });
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

    if (modificar.nombre) {
        producto.find(p => p.nombre.toLowerCase() === modificar.name.toLowerCase() && p.id !== id)
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya existe producto ${modificar}` })
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
            return res.status(200).json({ payload: "Producto eliminado" });
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

module.exports ={router}