const express=require("express")
const {ProductModel}=require("../model/product.model")

const productRouter=express.Router()

// products CRUD
productRouter.post("/add",async (req,res)=>{
    try{
        const user=new ProductModel(req.body)
        await user.save()
        res.status(200).send({"msg":"Following is the new product that has been added","new_product":req.body})
    }catch(err){
        res.status(400).send({"error":err})
    }
})

productRouter.get("/",async(req,res)=>{
    try{
        const products=await ProductModel.find(req.query)
        res.status(200).send(products)
    } catch(err){
        res.status(400).send({"error":err})
    }
    
})

productRouter.patch("/update/:productID",async(req,res)=>{
    const {productID}=req.params
    try{
        await ProductModel.findByIdAndUpdate({_id:productID},req.body)
        res.status(200).send({"msg":`The product with ID:${productID} has been updated.`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

productRouter.delete("/delete/:productID",async(req,res)=>{
    const {productID}=req.params
    try{
        await ProductModel.findByIdAndDelete({_id:productID})
        res.status(200).send({"msg":`The product with ID:${productID} has been deleted.`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    productRouter
}