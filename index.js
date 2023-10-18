const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {productRouter}=require("./routes/product.routes")

const app=express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/products",productRouter)

app.listen(8080,async ()=>{
    try{
        await connection
        console.log("Connected to the DB")
        console.log("Server is running at port 8080")
    }catch(err){
        console.log(err)
    }
})