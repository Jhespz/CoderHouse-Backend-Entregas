class Usuario {

    constructor(nombre, apellido, libros = [], mascotas =[]) {

        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas

    }

    getFullName() {

        return `${this.nombre} ${this.apellido}`

    }

    addMascota(nombreMascota){

        this.mascotas.push(nombreMascota)

    }

    countMascotas() {

        return `El número de mascotas del usuario es: ${this.mascotas.length}`

    }

    addBook(libroNuevo) {

        this.libros.push(libroNuevo)

    }

    getBookNames() {

        return this.libros.map( nombresLibros => nombresLibros.nombre)

    }

}

const usuario1 = new Usuario('Carlos', 'Arias',[{nombre: "El psicoanalista", autor: "John Katzenbach"}],['Perro'])

usuario1.addMascota('Gato')
usuario1.addBook({nombre: "Los siete hábitos de la gente altamente efectiva", autor: "Stephen Covey"})
usuario1.getBookNames()
usuario1.getFullName()
usuario1.countMascotas()