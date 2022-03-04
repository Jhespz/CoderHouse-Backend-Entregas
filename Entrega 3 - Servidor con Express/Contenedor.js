const express = require("express")
const app = express()
const fs = require('fs')
const PORT = 8080

class Container {
    //Constructor
    constructor(file){
        this.file = file
    }

    getAll(){

        try {
            const content =  fs.readFileSync(this.file)
            return JSON.parse(content)
        } catch (error) {
            console.log("Error " + error)
        }
    }

    getRandom(){

        try{
            const content = fs.readFileSync(this.file)
            const content_parsed = JSON.parse(content)
            const random_number = Math.floor(Math.random()*content_parsed.length)
            return content_parsed[random_number]
        } catch(error){
            console.log("Error " + error)
        }

    }

}

const cont1 = new Container("./productos.txt")

const server = app.listen(PORT, () => {
    console.log(`Server initialized - PORT: ${server.address().port}`)
})

app.get("/", (req, res) => {
    res.send(`<h1>API productos</h1>
              <a href = "/productos">Enlance a todos los productos </a><br>
              <a href = "/productoRandom">Enlance a cualquier producto</a>`)
})

app.get("/productos", (req, res) => {
    res.send(cont1.getAll())
})

app.get("/productoRandom", (req, res) => {
    res.send(cont1.getRandom())
})


