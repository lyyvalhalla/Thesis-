var keyWordArray =[], timeStampArray =[];
var delta;

function setupKeyWord() {
    
    var years =[];

    for (var i=0; i<Object.keys(keyWord).length; i++) {

        years.push(Object.keys(keyWord)[i]);
    }

    var keyBar = document.getElementById('key-bar');
    keyBar.style.left = "1500";
    keyBar.style.width =  80*(years.length) + "%";
    keyBar.style.visibility = "visible";

    for (var i=0; i<years.length; i++) {
        console.log(keyWord[years[i]]);
        var timeTag = document.createElement('div');
        timeTag.className = "time-tag";
        timeTag.style.left = (1400*i) + "px";
        timeTag.style.background = "#ffffff";
        keyBar.appendChild(timeTag);

    }
   
    

}




function mousewheel( event ) {

    if ( this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();
    
    delta = 0;
    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
        delta = event.wheelDelta;
    } else if (event.detail) { // Firefox
        delta = - event.detail;
    }   
    document.getElementById('key-bar').scrollLeft += delta;
    console.log(delta);
}