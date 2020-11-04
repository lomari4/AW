function getToDoTasks(listaTareas){
    return listaTareas.filter(n => n.done === false || typeof(n.done) === 'undefined').map(n => n.text)
} 

function findByTag(tasks, tag){
    return tasks.filter(n => n.tags.every(e => e === tag ) && n.tags.length !==0)
}

function findByTags(tasks, tags){
    return tasks.filter(n => n.tags.some(e => tags.includes(e)) && n.tags.length !==0) 
}

function countDone(tasks){
    return (tasks.filter(n => n.done === true)).length
}

function createTask(texto){
    let listaTareas = {text:" ", tags:[]}

    let v = (texto.split("@"))
    v.map( (v,i,a) => {
        if(i === 0){
            listaTareas.text = v
        }
        else{
            (listaTareas.tags).push(v)
        }
    }) 
    
    return listaTareas
}

function main(){

    let listaTareas = [
        { text: "Preparar práctica AW", tags: ["AW", "practica"] },
        { text: "Mirar fechas congreso", done: true, tags: [] },
        { text: "Ir al supermercado", tags: ["personal"] },
        { text: "Mudanza", done: false, tags: ["personal"] },
    ];
    
    console.log(getToDoTasks(listaTareas))
    console.log(findByTag(listaTareas, "personal"))
    console.log(findByTags(listaTareas, ["personal", "practica"]))
    console.log(countDone(listaTareas))
    console.log(createTask("Ir al medico @personal @salud"))
}

main()