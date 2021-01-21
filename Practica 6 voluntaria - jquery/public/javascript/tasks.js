"use strict"

$(function () { //nos asegura que el dom ya está creado

    //.val() = atributo value. Usalo con los inputs. NO PARA DIVS
    //.text() = atributo text. Usalo para divs, y para inputs tambien puedes pero como que xd

    //usamos un input hidden llamado DESC para enviar lo que esta puesto en el display

    $("#tarea").on("change", function () {
        let content = $(this).val(); //coge lo que has escrito en #tarea, que es un input

        $("#tareas").text(content) //para ponerlo en el div #tareas. No se usa append ya que asi lo modifica y elimina automaticamente

        let regexp = /@\w+/g;
        let tags = ($("#desc").val()).match(regexp);

        //reescribimos todo el hidden
        let sol = content;
        if (tags != undefined) {
            for (let i = 0; i < tags.length; i++) {
                sol += tags[i]
            }
        }

        $("#desc").val(sol)
    });

    $(".botonAddTag").on("click", function () {
        let content = $("#tag").val() //input

        let desc = $("#desc").val()
        let regexp = /@\w+/g;
        let tags = desc.match(regexp);

        let existe = false;
        let tagsFin = [];
        if (tags != null) {
            tagsFin = tags.map((e) => e.substring(1)); //le quitas el @ del principio
            existe = tagsFin.some(n => n == content)
        }

        if (content != "" && !existe) {
            //vamos añadiendo etiquetas
            $("#etiquetas").append(
                `
                <span class="tag aTag">${content}</span>
                `
            )

            $("#desc").val($("#desc").val() + "@" + content)
        }

    });

    //se pone asi para que este evento afecte a todos los tags puestos a posteriori 
    $("#etiquetas").on("click", ".aTag", function () {
        $(this).remove();
        let tag = "@" + $(this).text(); //ext() no me saca el @ por lo que lo añado
        let desc = $("#desc").val()
        //elimino la tag de desc con replace
        console.log(tag)
        let newDesc = desc.replace(tag, ""); 
        $("#desc").val(newDesc)
    });

})