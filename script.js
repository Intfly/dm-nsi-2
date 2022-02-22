let etendu = 0
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

const base = document.querySelector('.images');
const box = document.querySelectorAll('.compo');



base.addEventListener('dragstart', dragStart);
base.addEventListener('dragend', dragEnd);


function dragStart() {
    this.className += ' tenu';

    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = 'base';
}


for (const vide of box) {

    vide.addEventListener('dragover', dragOver);

    vide.addEventListener('dragenter', dragEnter);

    vide.addEventListener('dragleave', dragLeave);

    vide.addEventListener('drop', dragDrop);


}



function dragOver(e) {
    e.preventDefault()


}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'case';
}


function dragDrop() {
    this.className = 'case';
    this.append(base);
}