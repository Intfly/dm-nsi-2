var etendu = 0
function menu(){
    if (etendu == 0){
        document.querySelector(".barre").classList.add("dev");
        document.getElementById("boutonsortie").classList.add("boutonsortiedev");
        etendu = 1;
    }
    else{
        document.querySelector(".barre").classList.remove("dev");
        document.getElementById("boutonsortie").classList.remove("boutonsortiedev");
        etendu = 0;
    }
}

let base = document.querySelectorAll('.images');
let box = document.querySelectorAll('.compopc');


for (let bas of base){
    bas.addEventListener('dragstart', dragStart);
    bas.addEventListener('dragend', dragEnd);
}



function dragStart() {
    setTimeout(() => (this.className = 'invisible'), 0);/*enlève toutes les classes de l'élément et ajoute une classe vierge afin de faire disparaitre l'élément en déplacement*/
    for (let i=0;i<base.length;i++){
        if (base.item(i) ==this){
            globalThis.compo = i;
        }
    }
}

function dragEnd() {
    this.className = 'images';/*remet une classe à l'élément afin de le faire réapparaître*/
}


for (let vide of box) {
    vide.addEventListener('dragover', dragOver);
    vide.addEventListener('dragenter', dragEnter);
    vide.addEventListener('dragleave', dragLeave);
    vide.addEventListener('drop', dragDrop);
}



function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.classList.add('survol');
}

function dragLeave() {
    this.classList.remove('survol');
    this.classList.add('compopc');
}


function dragDrop() {
    for (let i=0;i<box.length;i++){
        if (box.item(i) ==this && i ==compo){
            this.append(base[compo]);
            this.classList.remove('compopc');
            this.classList.remove('survol')
            if (compo == 0){
                for(element of box){
                    element.classList.add("compopcdev");
                } 
                document.getElementById("carte-mere").classList.add('cm1')
            }
        }
    }
}
