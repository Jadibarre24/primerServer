//const { json } = require("express")
const fs=require("fs")


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
}

module.exports=productosManager