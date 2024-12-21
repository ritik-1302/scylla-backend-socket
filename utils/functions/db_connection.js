const mongoose=require('mongoose');
const process=require("process")

const connectDB=async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING,{dbName:process.env.DB_NAME});
        console.log(`MongoDB connected: ${connect.connection.host}`);
        console.log(`MongoDB Database Name: ${connect.connection.name}`);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
}

module.exports={
    connectDB
}