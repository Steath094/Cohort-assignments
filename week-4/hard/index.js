const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require('./database/index.js')
const cookieParser = require("cookie-parser")
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
const todoRouter = require('./routes/todo.js')
const userRouer = require('./routes/user.js')
app.use('/api/v1/user',userRouer);
app.use('/api/v1/todo',todoRouter);
connectDB()
.then(() => {
    app.listen(port || 3000, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

