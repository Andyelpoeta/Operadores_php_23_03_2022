addEventListener("DOMContentLoaded", (event)=>{
    let from = document.querySelector("#operadoresLogicos");
    let listaBotonos = document.querySelector("#btnDestino"); 
    let resAND = document.querySelector("#operadorAND");
    let resOR = document.querySelector("#operadorOR");
    let btnLimpiar = document.querySelector("#btnLimpiar");
    let mensajeServer = document.querySelector("#resServer");
    let nombre = from.action.split("/");
    for(let [id, input] of Object.entries(listaBotonos.children)){
        input.value += ` ${nombre[2]+"/"+nombre[4]}`;
    }
    let input = (data)=>{
        let json = {};
        data.forEach(element => {
            if(element.type != "submit"){
                json[element.id] = Number(element.value);
            }
        });
            return json;
    }
    let enviar = async(confi)=>{
        let peticion = await fetch(...confi);
        let json = await peticion.text();
      
        json = JSON.parse(json);
       
        let plantilla = `
        <tr>
            <td>${json.A}</td>
            <td>${json.B}</td>
            <td>${json.RES}</td>
        </tr>
        `;
        mensajeServer.innerText = json.SERVER;
        switch (json.OPERADOR) {
            case 'and':
                resAND.insertAdjacentHTML("beforeend", plantilla);
                break;
            case 'or':
                resOR.insertAdjacentHTML("beforeend", plantilla);
                break;
            default:
    
                break;
        }
    
    
    }
    from.addEventListener("submit", (e)=>{
        let json = input(Array.from(e.target));
        json.OPERADOR = e.submitter.dataset.operador;
        
        let confi = {
            method: from.method,
            body: JSON.stringify(json)
        }
        enviar([from.action,confi]);
        e.preventDefault();
    })
    btnLimpiar.addEventListener("click", (e)=>{
        mensajeServer.innerText = null;
        resAND.innerText = null;
        resOR.innerText = null;
    })
})