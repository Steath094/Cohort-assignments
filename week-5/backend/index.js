const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require('./database/index.js')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const todoRouter = require('./routes/todo.js')
const userRouer = require('./routes/user.js')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true
}))

//  start writing your routes here

app.use('/user',userRouer);
app.use('/todo',todoRouter);
connectDB()
.then(() => {
    app.listen(port || 3000, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

