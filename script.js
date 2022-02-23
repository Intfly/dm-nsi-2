var etendu = 0
var compo_array=[]
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

function boutonfiniok(){
    document.getElementById("fini").style.display="none";
}

function btinterro(id){
    let idc = id.replace('b', '');
    let idcc = idc.replace('t','#p');
    document.querySelector(idcc).style.display ="block";
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
    vide.addEventListener('drop', dragDrop);
}

function dragOver(e) {
    e.preventDefault()
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
                document.getElementById("carte-mere").classList.add('cm1');
            }
            compo_array.push(i);/*ajout de l'indice de l'élément placé dans l'array "compo_array"(équivalent d'un tableau)*/
            if (compo_array.length == 8){/*si tous les éléments ont été placés, alors la longueur de l'array vaut 8 donc le bouton nous disant qu'on a fini apparaît*/
                document.getElementById("fini").style.display="block";
            }
        }
    }
}
