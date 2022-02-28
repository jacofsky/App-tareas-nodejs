
// _listado: {uuid-12313221231-412323-1: {id:12, desc: asdsad, completadoEn:128328} }

const Tarea = require("./tarea")

class Tareas {

    _listado = {}

    get listadoArr() {
        const listado = []

        Object.keys(this._listado).forEach( key => { 
            listado.push(this._listado[key])
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id]
        }

    }

    cargarTareasFromArray(TareasArray = []){
        
        TareasArray.forEach((TareaArray) => {
            this._listado[TareaArray.id] = TareaArray
        })

    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea

    }

    listadoCompleto() {

        console.log('\n')
        this.listadoArr.forEach((tarea, i) => {

            let c = ''
            const pos = `${i + 1}`.green

            if (tarea.completadoEn === null) {
                c = `Pendiente`.red
            } else {
                c = `Completada`.green
            }
            
            console.log(`${pos}. ${tarea.desc} :: ${c}  `)
        })
        console.log('\n')


    }

    listarPendientesCompletadas ( completadas = true) {

        console.log('\n')
        if (completadas) {
            this.listadoArr.forEach((tarea, i) => {

                if (tarea.completadoEn) {
                    const pos = `${i + 1}`.green
                    console.log(`${pos}. ${tarea.desc} :: ${tarea.completadoEn.green}  `)

                }

            })
        } else {
            this.listadoArr.forEach((tarea, i) => {
                
                if (!tarea.completadoEn) {
                    const pos = `${i + 1}`.green
                    console.log(`${pos}. ${tarea.desc} :: ${'Pendiente'.red}  `)

                }

            })
        }
        console.log('\n')
    }

    toggleCompletadas ( ids = []) {

        ids.forEach( id => {
            
            const tarea = this._listado[id]

            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        
        })

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }

        })

    }



}

module.exports = Tareas 