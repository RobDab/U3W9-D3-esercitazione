"use strict";
window.addEventListener('DOMContentLoaded', () => {
    let user;
    let inputBar = document.querySelector('input');
    let selector = document.querySelector('select');
    let submitBtn = document.querySelectorAll('input')[1];
    let resetbtn = document.querySelector('#resetBtn');
    resetbtn.style.display = 'none';
    let display = document.getElementById('detailList');
    resetbtn.onclick = () => { reset(); };
    //! tutta la logica seguente poteva essere gestita in una funzione 
    //! esterna richiamata come parametro da una funzione freccia
    //! ()=>{myFunc()} nell'onClick.
    submitBtn.onclick = () => {
        let redditoLordo = parseInt(inputBar.value.trim());
        // console.log(typeof(selector.value))
        // console.log(redditoLordo)
        switch (selector.value) {
            case '0':
                alert('non hai selezionato una categoria fiscale, riprova.');
                break;
            case '1':
                user = new AutForf(redditoLordo);
                display.innerHTML = '<li>loading...</li>';
                break;
            case '2':
                user = new AutMono(redditoLordo);
                display.innerHTML = '<li>loading...</li>';
                break;
            case '3':
                user = new AutPluri(redditoLordo);
                display.innerHTML = '<li>loading...</li>';
                break;
        }
        // console.log(`
        // Reddito lordo: ${redditoLordo}\n
        // Reddito netto: ${user.getNet().toFixed(2)}€\n
        // tasse inps: ${user.getTasseInps().toFixed(2)}€\n
        // tasse irpef: ${user.getTasseIrpef().toFixed(2)}€
        // `)
        if (selector.value === '1' || selector.value === '2' || selector.value === '3') {
            // timeOut usato solo per dare parvenza di calcolo \(O.0)/
            const timeOut = setTimeout(() => { displayUser(user, display); }, 1000);
        }
        resetbtn.style.display = 'inline-block';
    };
});
function displayUser(obj, display) {
    display.innerHTML = `
    <li><strong>Reddito Lordo dichiarato:</strong> ${obj.redditoLordo}€</li>
    <li><strong>Reddito Netto:</strong> ${obj.getNet().toFixed(2)}€</li>
    <li><strong>Tasse INPS:</strong> ${obj.getTasseInps().toFixed(2)}€</li>
    <li><strong>Tasse Irpef:</strong> ${obj.getTasseIrpef().toFixed(2)}€</li>
    `;
}
function reset() {
    let display = document.querySelector('.container ul');
    let inputBar = document.querySelector('input');
    let selector = document.querySelector('select');
    display.innerHTML = '<li>Inserisci reddito lordo e scegli la categoria fiscale che ti rispecchia.</li>';
    inputBar.value = '';
    selector.value = '0';
}
/*
! COME IMPOSTARE LA STESSA LOGICA USANDO UNA FUNZIONE INVECE DI
! IMPLEMENTARE IL CODICE NEL DOMContentLoaded??
*/
/*
*RISPOSTA trovata ma non implementata
*-----> Impostando una funzione che lavora su un
*param:object!!!!<------  vedi function displayUser()
*/
// function setProfile(){
//     let redditoLordo = parseInt(inputBar.value.trim());
//         console.log(typeof(selector.value))
//         console.log(redditoLordo)
//         switch(selector.value){
//             case '1':
//                 user = new AutForf(redditoLordo)
//             break;
//             case '2':
//                 user = new AutMono(redditoLordo)
//             break;
//             case '3':
//                 user = new AutPluri(redditoLordo);
//             break;
//         }
//     console.log(`
//     Reddito lordo: ${redditoLordo}\n
//     Reddito netto: ${user.getNet().toFixed(2)}€\n
//     tasse inps: ${user.getTasseInps().toFixed(2)}€\n
//     tasse irpef: ${user.getTasseIrpef().toFixed(2)}€
//     `)
// }
class Contribuente {
    constructor(redditoLordo) {
        this.redditoLordo = redditoLordo;
    }
}
// codredd = 54% if Forfettario
// codredd = 86% if Monomandatario
// codredd = 64% if plurimandatario
// Per L'esempio le tasseInps e tasseIrpef sono state stabilite a 26% ed al 23%
class AutForf extends Contribuente {
    constructor(redditoLordo) {
        super(redditoLordo);
        this.codredd = 54 / 100;
    }
    getImponibile() {
        return this.redditoLordo * this.codredd;
    }
    getTasseInps() {
        return 26 / 100 * this.getImponibile();
    }
    getTasseIrpef() {
        return 23 / 100 * this.getImponibile();
    }
    getNet() {
        return this.redditoLordo - this.getTasseInps() - this.getTasseIrpef();
    }
}
class AutMono extends Contribuente {
    constructor(redditoLordo) {
        super(redditoLordo);
        this.codredd = 86 / 100;
    }
    getImponibile() {
        return this.redditoLordo * this.codredd;
    }
    getTasseInps() {
        return 26 / 100 * this.getImponibile();
    }
    getTasseIrpef() {
        return 23 / 100 * this.getImponibile();
    }
    getNet() {
        return this.redditoLordo - this.getTasseInps() - this.getTasseIrpef();
    }
}
class AutPluri extends Contribuente {
    constructor(redditoLordo) {
        super(redditoLordo);
        this.codredd = 64 / 100;
    }
    getImponibile() {
        return this.redditoLordo * this.codredd;
    }
    getTasseInps() {
        return 26 / 100 * this.getImponibile();
    }
    getTasseIrpef() {
        return 23 / 100 * this.getImponibile();
    }
    getNet() {
        return this.redditoLordo - this.getTasseInps() - this.getTasseIrpef();
    }
}
