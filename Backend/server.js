import express from 'express'
import mongoConnection from './Database/mongoConnection.js';
import route from './Routes/apiRoutes.js';
import cors from 'cors'

const app = express()

const port = 6996;

mongoConnection()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/Users", route)

app.get("/",(req,res)=>{
    res.json("welcome to REST Api")
})

app.listen(port,()=>{
    console.log(`this app is running on ${port} portal`);
})