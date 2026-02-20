const express = require('express');
const cors = require('cors');
require('dotenv').config();
const UserRoute = require('./routes/UserRoute');
const connectDB = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');
const OrderRouter = require('./routes/OrderRoute');
// const mongoose = require('mongoose');

const app = express();
app.use(cors('*'))
app.use("/uploads", express.static("uploads"));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// let isConnected = false;
// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.mongoDB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     isConnected = true;
//     console.log("MongoDB connected.")
//   } catch (error) {
//     console.log("Error: ", error)
//   }
// }
// let isConnected = false;
connectDB();
// app.use((req, res, next) => {
//   if(!isConnected) {
//     connectDB();
//     isConnected = true;
//   }
//   next();
// })
app.use(express.json());
const PORT = process.env.PORT;

app.use('/', UserRoute)
app.use('/products', ProductRouter)
app.use('/orders', OrderRouter)

app.listen(PORT, () => {
    console.log("Server listen on port", PORT)
})
// module.exports = app;