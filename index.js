/* Supongamos que un ebrio está parado en una esquina, cuando decide caminar para que le pase el efecto “ya ustedes saben cuál”.

- Supongamos que existe una probabilidad igual de que se dirija al norte, sur, este u oeste al llegar a cada esquina.
*****    N = S = E = O = 25%      *****
- Si camina 10 calles, ¿Cuál es la probabilidad de que termine su recorrido a dos calles de donde lo empezó?.
*****  Calcular probabilidad en un X cantidad de pruebas  *****
*/

//Funcion que crea nuestro campo de prueba
function createMap(width, height) {    
    const map = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(`${alphabet[x]}${y + 1}`);
        }
        map.push(row);
    }
    return map;
}

// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

const map = createMap(20, 20);
console.log(map);

function moverEbrio(){
    let dirr = "";
    // Genera un número aleatorio entre 0 y 3 (dirección) y se coloca en una Switch que indica la dirrecion en la que se mueve el ebrio.
    switch(Math.floor(Math.random() * 4)){
        case 0:
            dirr = "N";                    
            break;
        case 1:
            dirr = "S";
            break;
        case 2:
            dirr = "E";
            break;
        case 3:
            dirr = "O";
            break;
    }
    return dirr;         
}

function prueba(CantPruebas){
    let numCalles = 9; //Número de calles por las que se mueve.
    let contador = 0;   //Contador de pruebas.
    let posicionInicial = map; //Posicion Inicial del Ebrio
    let posicionActual; //Posicion Actual del Ebrio en el campo

    let X; // ROW ES X
    let Y; //COLUMNA ES Y
    let goal = 0;

    // Bucle Do-While para realizar una prueba
    do{

    console.log("Posicion Inicial del Ebrio: [" + posicionInicial[9][9]+ "]")
    //Realiza el primer movimiento del ebrio en el campo
    let dirr = moverEbrio();
    if (dirr == "N") {

        X = 9;
        Y = 8;
        posicionActual = posicionInicial[9-1][9];
    
    } else if(dirr == "S"){

        X = 9;
        Y = 10;
        posicionActual = posicionInicial[9+1][9];
    
    } else if(dirr == "E"){
        X = 8;
        Y = 9;
        posicionActual = posicionInicial[9][9-1];
    
    }else{
        X = 10;
        Y = 9;
        posicionActual = posicionInicial[9][9+1];
    
    }
    
    console.log("Direccion: "+dirr);
    console.log("Posición actual: [" + posicionActual +"]");
    console.log("Col: " + Y + " ; Row: " + X);
    console.log("Movimientos restantes: " + numCalles);

    
        

        // Un bucle Do-While para la cantidad de movimientos restantes del ebrio
        do{
            //Realiza cualquier movimiento que no sea el inicial
            dirr = moverEbrio();
            if (dirr == "N") {

                posicionActual = posicionInicial[Y-1][X];
                Y = Y - 1;
                X = X;
            
            } else if(dirr == "S"){
                
                posicionActual = posicionInicial[Y+1][X];
                Y = Y + 1;
                X = X;
            
            } else if(dirr == "E"){
                
                posicionActual = posicionInicial[Y][X-1];
                Y = Y;
                X = X - 1;
            
            }else{
                
                posicionActual = posicionInicial[Y][X+1];
                Y = Y;
                X = X + 1;
            
            }
            
            console.log("Direccion: "+ dirr);
            console.log("Posición actual: [" + posicionActual +"]");
            //console.log("Col: " + Y + " ; Row: " + X);

            numCalles = numCalles - 1;
            console.log("Movimientos restantes: " + numCalles);
        } while(numCalles > 0);

        if (posicionInicial[Y][X] == posicionInicial[9][7] || 
            posicionInicial[Y][X] == posicionInicial[9][11] || 
            posicionInicial[Y][X] == posicionInicial[7][9] || 
            posicionInicial[Y][X] == posicionInicial[11][9]){

            console.log("Se ha llegado a la meta!");
            goal = goal + 1;
        }

        X = 0;
        Y = 0;


        contador++;
        numCalles = 9;
        
        //Cantidad de pruebas hechas
        

        

       // Termina una prueba y se agrega al contador
    } while (contador < CantPruebas);
    console.log("Pruebas hechas: " + contador);
    console.log("Pruebas con exito: " + goal);
    console.log("Probabilidad: "  + ((goal/CantPruebas)*100).toFixed(2) + "%");

    let html = document.getElementById('results');
    let resultados = `
    <div>
            <h3>Resultados de la simulacion</h3>
            <hr>

            <p><strong>Número de intentos: </strong></p>
            <span id="intentofallado" class="pb-5">` + CantPruebas + `</span>
            <br><br>

            <p><strong>Intentos con exito: </strong></p>
            <span id="intentoexito">`+ goal +`</span>
            <br><br>

            <p><strong>Probabilidad:</strong></p>
            <span id="probabilidad">`+ ((goal/CantPruebas)*100).toFixed(2) + `%</span>
          </div>
    `;
 
    html.innerHTML = resultados;
}