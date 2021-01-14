function fScroll(){
    let y=window.scrollY;
    if(y>150){
        $("#logo-small").slideDown("fast");
    }else{
        $("#logo-small").fadeOut("fast");
    }
}
window.onload=function(){
    fScroll();
}
window.onscroll= function(){
    fScroll();
}