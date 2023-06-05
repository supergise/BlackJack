let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosCompu = 0;


// REFERENCIAS HTML 
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCompu   = document.querySelector('#computadora-cartas');
let puntosHTML = document.querySelectorAll('small');


// CREAR DECK

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push( i + tipo);
        }
    }
    for (let tipo of tipos){
        for (let esp of especiales) {
            deck.push( esp + tipo);
        }
    }

    desordernarArray = () => {
        return Math.random() - 0.5;
    }

    deck.sort(desordernarArray);

}

crearDeck();


// Tomar una carta

const pedirCarta = () => {
    
    if (deck.length === 0) {
        throw 'No hay más cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
}

// SACAR EL VALOR DE LA CARTA

const valorCarta = ( carta ) => { // no uso string carta[0] por el nro 10 quew tiene 2 digitos
    const valor = carta.substring(0, carta.length - 1); // devuelve un string cortado desde inicio a final
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : parseInt(valor); 
}

//  TURNO DE LA COMPU
const turnoCompu = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();

        puntosCompu = puntosCompu + valorCarta( carta );

        puntosHTML[1].innerText = puntosCompu;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasCompu.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }
    } while( (puntosCompu < puntosMinimos) && (puntosCompu <= 21) );

    setTimeout( () => {
        if( (puntosCompu === puntosMinimos) ) {
            alert('Empataron');
        } else if( puntosMinimos > 21 ) {
            alert('Gano la Compu');
        } else if( puntosCompu > 21 ) {
            alert('Jugador gana');
        }

    }, 100 );
}

// EVENTOS

btnPedir.addEventListener('click', function() { // dos argumentos: el evento y las indicaciones
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu( puntosJugador );

    } else if( puntosJugador === 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu( puntosJugador );

    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoCompu( puntosJugador );
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    crearDeck();
    
    puntosJugador = 0;
    puntosCompu   = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasCompu.innerHTML   = '';
    
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
    
});





// otros
// 2C =  clubs tréboles
// 2D =  Diaminds
// 2H =  Hearts 
// 2S =  Spades


// deck = _.shuffle( deck ); // CON LA LIBRERIA UNDERSCORE
// console.log( deck );

// return deck;

// OTRO EJEMPLO
//     //evaluo si es un nro
//     let puntos = 0;
//     if(isNaN( valor )) {
//         puntos = ( valor === 'A') ? 11 : 10;
//     } else {
//         puntos = valor * 1; // convierte string a nro
//     }
        
//     console.log(puntos);

// const valor = valorCarta('KD');
// console.log({ valor })

// const valor = valorCarta(pedirCarta());
// console.log({ valor })