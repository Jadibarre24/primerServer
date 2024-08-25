import { json } from ("express")
import fs from("fs")


class productosManager{
    static path

    static async getProductos(){
        if (fs.existsSync(this.path)){
            let productos = JSON.parse (await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            return productos
        }else{
            return[]
        }
    }

    static async addProducto(producto={}){
        let productos=await this.getProductos()
        let id = 1
        if (productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }

        let nuevoProducto={
            id,
            ...producto
        }

        productos.push (nuevoProducto)
         
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,5))

        return nuevoProducto
    }

    static async rescueProducto(producto={}){
        let productos=await this.getProductos()
        let id= productos.length>0? Math.max(...productos.map(d=>d.id))+1:1;
        
        let rescueProducto={
            id,
            ...producto
        };

        productos.push (rescueProducto)
    }

    static async updateProducto(id,modificar={}){
        let productos=await this.getProductos()
        let indiceProducto=productos.findIndex(p=>p.id===id)
        if (indiceProducto===-1){
            throw new Error(`Error: No existe id ${id}`)
        }
        productos[indiceProducto]={
            ...productos[indiceProducto],
            ...modificar,
            id
        }
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,5))
        return productos[indiceProducto]
    }
    static async deleteProduct (id){
        let productos =await this.getProductos()
        let indiceProducto=productos.findIndex(p=>p.id===id)
        if (indiceProducto===-1){
            throw new Error(`Error: No existe id ${id}`)
        }
        let cantidad0=productos.length
        productos=productos.filter(p=>p.id!==id)
        let cantidad1=productos.length

        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,5))

        return cantidad0-cantidad1
    }
}

