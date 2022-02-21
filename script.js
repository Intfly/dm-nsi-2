let etendu = 0
function menu(){
    if (etendu == 0){
        document.querySelector(".barre").classList.add("dev");
        etendu = 1;
    }
    else{
        document.querySelector(".barre").classList.remove("dev");
        etendu = 0;
    }
}