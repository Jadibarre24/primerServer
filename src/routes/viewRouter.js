import { Router } from 'express';
import { productosManager } from '../dao/ProductosManager.js';

export const router=Router()

router.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render("home");
})

router.get('/productos',async(req,res)=>{

    let productos =await productosManager.getProductos()
    let titulo ="Nuestros ingredientes"

    res.setHeader('Content-Type','text/html')
    res.status(200).render('productos', {
        productos,
        titulo
    })
})

