const express=require("express")
const {UserModel}=require("../model/user.model")

const userRouter=express.Router()

//users CRUD
userRouter.post("/add",async (req,res)=>{
    try{
        const user=new UserModel(req.body)
        await user.save()
        res.status(200).send({"msg":"Following is the new user that has been added","new_user":req.body})
    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.get("/",async(req,res)=>{
    try{
        const users=await UserModel.find(req.query)
        res.status(200).send(users)
    } catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.patch("/update/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.status(200).send({"msg":`The user with ID:${userID} has been updated.`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.delete("/delete/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndDelete({_id:userID})
        res.status(200).send({"msg":`The user with ID:${userID} has been deleted.`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    userRouter
}