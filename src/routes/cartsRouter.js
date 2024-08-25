import { Router } from("express")
import productosManager from ("../dao/productosManager")
import cartsManager from ("../dao/cartsManager")

const router = Router()

cartsManager.path= "./src/data/carrito.json"

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
// ERROR AL AGREGAR PRODUCTOS PENDIENTE!!
router.post("/:id", async (req, res) => {
    let { id } = req.params
    id = Number(id)
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese id valido` })
    }
   
    try {
        let productoAdd = await cartsManager.addProdCart(id, {} );
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productoAdd });
    } 
    
    catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
})

export {router}