import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import adminRouter from "./routes/AdminRoute.js";

import morgan from "morgan"; 
const app=express();
const port=process.env.PORT || 4000;

await connectDB();
await connectCloudinary();


const allowedOrigins=["http://localhost:5173","https://shop-herefrontend.vercel.app","https://spaceflight-geoscientist-10858843-5367697.postman.co/workspace/My-Workspace~405d8865-8141-4b24-9895-7a4642f36ebe/request/create?requestId=a26d2b2e-e953-4d87-8239-39f7e5cb407e","https://green-mart-f-inal-4uw5.vercel.app"]

app.post("/stripe",express.raw({type:"application/json"}),stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))
app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.send("API IS WORKING");})

app.use("/api/user",userRouter) ;
app.use("/api/seller",sellerRouter);  
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/address",addressRouter);
app.use("/api/order",orderRouter);
app.use("/api/admin",adminRouter);


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})