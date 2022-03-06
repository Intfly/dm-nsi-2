var etendu = 0
var compo_array=[]/*je définis une array, l'équivalent d'une list en python. voir: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array*/
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
    document.getElementById("fini").style.display="none";/*fait disparaître la div une fois qu'on clique sur le bouton "ok" */
}

function btinterro(id){/*prend en paramètre l'id du bouton cliqué*/
    let idcc = id.replace('bt','#p');/*l'id du bouton est sous la forme "bt"+ x avec x un nombre entre 1 et 8, et les paragraphes liés au images ont un id de la forme "p" + x je replace le texte constant par "#p" pour avoir l'id du texte associé au bouton*/
    if (getComputedStyle(document.querySelector(idcc)).display == "none"){/*la fonction getComputedStyle() renvoie les propriétés css d'un élément. Nous comparons ensuite la valeur de la propriété "display" avec "block", si l'element a pour propriété display="none", alors l'instruction conditionelle est validée.*/ 
        document.querySelector(idcc).style.display ="block";/*s'il n'est pas affiché alors je l'affiche*/
    }
    else{
        document.querySelector(idcc).style.display ="none";/*sinon je le cache*/
    }
    
}

let base = document.querySelectorAll('.images');/*querySelectorAll renvoie une nodelist(l'équivalent d'un dictionnaire en python). voir: https://developer.mozilla.org/fr/docs/Web/API/NodeList */
let box = document.querySelectorAll('.compopc');


for (let bas of base){/*pour chaque element de la nodelist*/
    bas.addEventListener('dragstart', dbtdeplacement);/*quand on commence à déplacer une image de la nodelist, alors la fonction dbtdeplacement est éxécutée*/
    bas.addEventListener('dragend', findeplacement);/*quand on relache une image de la nodelist, alors la fonction findeplacement est éxécutée*/
}


/*this correpond à l'element selectionné this = bas*/
function dbtdeplacement() {
    setTimeout(() => (this.className = 'invisible'), 0);/*met un timer de 0ms qui enlève toutes les classes de l'élément et ajoute une classe vierge afin de faire disparaitre l'élément en déplacement. voir: https://stackoverflow.com/a/20734159/16474797*/
    for (let i=0;i<base.length;i++){/*je retrouve l'id de l'image selectionnée grâce à une boule for qui a pour longueur la taille de la nodelist base*/
        if (base.item(i) ==this){/*on regarde si l'element i de la nodelist correspond à this(donc à l'image selectionnée)*/ 
            globalThis.compo = i;/*rend global l'id de l'image selectionné(l'id de bas)*/
        }
    }
}

function findeplacement() {
    this.className = 'images';/*remet une classe à l'élément afin de le faire réapparaître*/
}


for (let vide of box) {
    vide.addEventListener('dragover', survol);/*quand on passe sur une boîte alors la fonction est executée*/
    vide.addEventListener('drop', relachement);/*quand on lâche l'image, la fonction relachement est executée*/
}


function survol(e) {/* on ne peut pas relacher l'image si on ne bloque pas le comportement par défaut voir: https://stackoverflow.com/a/43686592/16474797*/
    e.preventDefault()
}

function relachement() {
    for (let i=0;i<box.length;i++){/*parcours les boites possibles*/
        if (box.item(i) ==this && i ==compo){/*s'il n'y a pas eu d'erreur(que l'id de l'image = l'id de a div) et que la bonne box a été choisie alors la condition est validée*/
            this.append(base[compo]);/*ajoute l'image dans la box choisie*/
            this.classList.remove('compopc');/*enlève les pointillés pour les box qui ont déjà été choisie*/
            var elem_deplacer = document.getElementById("di"+(compo+1));/*selectionne l'image qui a été choisie*/
            elem_deplacer.classList.add("mini");/*fait disparaître l'image*/
            if (compo == 0){
                for(element of box){/*parcours les elements de la nodelist box*/
                    element.classList.add("compopcdev");/*affiche toutes les divs des composants à mettre*/
                }
                document.getElementById("carte-mere").classList.add('cm1');/*permet de positionner l'image*/
            }
            else if ( compo == 1){                
                document.getElementById("cpu").classList.add('cpu1');
                document.getElementById("cooler").style.zIndex="9";/*met la div du refroidissement en premier plan pour qu'on puisse relâcher l'image sur la position du cpu*/
            }
            else if(compo == 2){
                document.getElementById("cooler").classList.add('cooler1'); 
            }  
            else if(compo == 3){
                document.getElementById("ram").classList.add('ram1');
                document.getElementById("d4").style.backgroundImage = "url('images/ramt.png')";/*change l'image*/
            }
            else if(compo == 4){
                document.getElementById("ssd").classList.add('ssd1');
                document.getElementById("d5").style.backgroundImage = "url('images/ssdm.png')";
                document.getElementById("d5").style.left = "1.5em";
            }
            else if(compo == 5){
                document.getElementById("d6").style.backgroundImage = "url('images/hddm.png')";
                document.getElementById("hdd").style.position= "absolute";
                document.getElementById("d6").style.width = "90%";
                document.getElementById("d6").style.marginLeft = "10%";
            }

            else if(compo == 6){
                document.getElementById("alim").classList.add('alim1');
                document.getElementById("d7").style.backgroundImage = "url('images/alimm.png')";
                document.getElementById("d7").style.height = "200%";
                document.getElementById("d7").style.width = "120%";
            }
            else if (compo == 7){
                document.getElementById("gpu").classList.add('gpu1');
                document.getElementById("d8").style.backgroundImage = "url('images/gpus.png')";
                document.getElementById("d8").style.bottom = "1vh";
            }

            compo_array.push(i);/*ajout de l'indice de l'élément placé dans l'array "compo_array"(équivalent d'un tableau)*/
            if (compo_array.length == 8){/*si tous les éléments ont été placés, alors la longueur de l'array vaut 8 donc le bouton nous disant qu'on a fini apparaît, j'aurais pu me servir d'un compteur avec un integer mais j'avais envie d'apprendre à me servir des arrays.*/
                document.getElementById("fini").style.display="block";/*fait apparaître le message disant qu'on a réussi*/
            }
        }
    }
}
