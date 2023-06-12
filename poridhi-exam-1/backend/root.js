import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "asdf1234",
    database: "agdum"
})


app.use(express.json())

app.get("/", (req,res)=>{       // "/" is home page for backend server
    res.json("Hello from backend")
})


app.get("/books", (req,res)=>{       
    const qu = "select * from books"
    db.query(qu,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/books", (req,res)=>{ 
    const qu = "insert into books (`title`, `desc`, `cover`) vaules (?)"
    const vaules = ["Tagor Collection", "Shesher Kobita", "Tagor World"]

    db.query(qu,[vaules], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.use(express.json())     // it allow us to send any json file from client side


app.listen(8899, ()=>{
    console.log("connected to backend1")
});