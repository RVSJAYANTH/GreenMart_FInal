// import mongoose from "mongoose";

// const connectDB=async()=>{
//     try{
//         mongoose.connection.on("connected",()=>console.log("Database connected"));
//         await mongoose.connect(`${process.env.MONGO_URI}`);
//     }catch(error){
//         console.error(error.message);
//     }
// }

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("✅ Database connected"));
    mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export default connectDB;
