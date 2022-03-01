const fs = require('fs')

class Contenedor {
    //Constructor
    constructor(nombre){
        this.nombre = nombre
    }

    //Metodos
    //1- Recibe un objeto, lo guarda en el archivo, devuelve id asignado
    save(objeto){
        try{
            const contenido =  fs.readFileSync(this.nombre)
            const contenido_parsed = JSON.parse(contenido)
            //Si la propiedad id no existe, la crea
            objeto["id"] = (contenido_parsed[contenido_parsed.length -1].id) + 1
            fs.writeFileSync("./productos.txt",JSON.stringify([...contenido_parsed,objeto]))
        }
        catch(err){
            fs.writeFileSync("./productos.txt",JSON.stringify([{...objeto,id: 1}]))
        }
    }

    //2- Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id){
        try {
            const productos = this.getAll()
            return productos.find(producto => id === producto.id)
        } catch (error) {
            console.log(error)
        }
    }

    //3- Devuelve un array con los objetos presentes en el archivo.
    getAll(){
        try {
            //Se lee el contenido crudo
            const contenido =  fs.readFileSync(this.nombre)
            //Se retorna el contenido parseado en un array
            return JSON.parse(contenido)
        } catch (error) {
            console.log("No se pudo leer el archivo.")
        }
    }

    //4- Elimina del archivo el objeto con el id buscado.
    deleteById(id){

        const getbyid = this.getById(id)

        if(getbyid != ''){
            let productos = this.getAll()
            productos = productos.filter(prod => prod.id !== id)
            const productos_mod = JSON.stringify(productos)
            fs.writeFileSync("./productos.txt",productos_mod, "utf-8")

        } else {
            throw 'No existe el ID indicado'
        }

    }

    //5- Elimina todos los objetos presentes en el archivo.
    deleteAll(){
        const elemento_vacio = ''
        fs.writeFileSync("./productos.txt",elemento_vacio, "utf-8")

    }
}

const cont1 = new Contenedor("./productos.txt")


// //Pruebas de los métodos
// cont1.save({
//     title: 'Escuadra',
//     price: 123.45,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
//   },)

//   cont1.save({
//     title: 'Globo Terráqueo',
//     price: 345.67,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                       id: null                                                                                  
//   },)

//   cont1.save( {
//     title: 'Calculadora',
//     price: 234.56,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
//   },)

//console.log(cont1.getById(3))

//console.log(cont1.getAll())

//cont1.deleteById(1)

//cont1.deleteAll()