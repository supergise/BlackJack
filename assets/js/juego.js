const miModulo = ( () => {
    'use strict';

    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];
    
    
    // REFERENCIAS HTML 
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');

    // FUNCION QUE INICIALIZA EL JUEGO

    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];

        for( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
    
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }
    
    // CREAR DECK
    
    const crearDeck = () => {
        deck = [];

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
    
        const desordernarArray = () => {
            return Math.random() - 0.5;
        }
    
        return deck.sort(desordernarArray);
    }
    
    // Tomar una carta
    
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay más cartas en el deck';
        }
        return deck.pop();
    }
    
    // SACAR EL VALOR DE LA CARTA
    
    const valorCarta = ( carta ) => { 
        const valor = carta.substring(0, carta.length - 1); 
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : parseInt(valor); 
    }

// Turno 0 : 1er jugador y el último jugdor es la compu

    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosCompu ] = puntosJugadores;

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
    
    //  TURNO DE LA COMPU
    const turnoCompu = ( puntosMinimos ) => {
        let puntosCompu = 0;

        do {
            const carta = pedirCarta();
            puntosCompu = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1 );

        } while( (puntosCompu < puntosMinimos) && (puntosCompu <= 21) );

        determinarGanador();
    
    }
    
    // EVENTOS
    
    btnPedir.addEventListener('click', function() { 
        // if (deck.length === 0) {
        //     inicializarJuego();
        // }
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 ); 

        crearCarta( carta, 0 );
    
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
    
        turnoCompu( puntosJugadores[0] );
    });
    
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
        
    });

    return { // sólo el return es visible en el console
        nuevoJuego: inicializarJuego
    };

})(); // función autoinvocada, patrón para guardar el código y que no se pueda llamar desde el código