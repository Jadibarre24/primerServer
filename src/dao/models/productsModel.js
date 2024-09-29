import mongoose from "mongoose"; 

 const productsColl="products"
 const produtsSchema=new mongoose.Schema(
    {
        id: Number,
        title:{
            type:String,unique:true //NO PERMITE REPETIR EL NOMBRE 
        } ,
        description: String,
        code: String,
        price:Number,
        status:Boolean,
        stock:Number,
        category: String,
        rol:{
            type:String, default:"product"
        }
    },

    {
        timestamps:true,
        strict: false,
        Collection:"Burger"
    }
 )

 export const productsModel= mongoose.model(
    productsColl,
    produtsSchema
 )

 