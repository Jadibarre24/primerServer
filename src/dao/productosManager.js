const { json } = require("express")
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
}

module.exports=productosManager