import { json } from ("express")
import fs from("fs")


export class productosManager{
    static path

    static async getProductos(){
        if (fs.existsSync(this.path)){
            let productosCart = JSON.parse (await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            return productosCart
        }else{
            return[]
        }
    }

    //ERROR AL AGREGAR PRODUCTO 
    static async addProdCart(producto={}){
        let productosCart=await this.getProductos()
        let id = 1
        if (productosCart.length>0){
            id=Math.max(...productosCart.map(d=>d.id))+1
        }

        let productoAdd={
            id,
            ...producto
        }

        productosCart.push (productoAdd)
         
        await fs.promises.writeFile(this.path,JSON.stringify(productosCart,null,5))

        return productoAdd
    }
}

 