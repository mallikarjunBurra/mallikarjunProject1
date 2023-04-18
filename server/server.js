const express = require("express")
const path = require("path")
const app = express()
const {open} = require("sqlite")
const sqlite3 = require("sqlite3") 

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const dbPath = path.join(__dirname,"job.db")

let db = null

const initializeServerAndDb =async () => {
    try {
        db = await open({
            filename :dbPath,
            driver:sqlite3.Database
        })
        app.listen(5000, () => {
            console.log("server running at localhost:5000")
        })
    }catch(e) {
        console.log(`DB error : ${e.message}`)
        process.exit(1)
    }
}

initializeServerAndDb()





app.get("/jobs" , async(request,response) => {
    const getQuery = `select * from jobs` 
    const result = await db.all(getQuery)
    response.send(result)
    console.log(result)
  })

  app.get("/users" , async(request,response) => {
    const getQuery = `select * from user` 
    const result = await db.all(getQuery)
    response.send(result)
    console.log(result)
  })
  