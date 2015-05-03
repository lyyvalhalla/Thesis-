var keyWordArray =[], timeStampArray =[];
var delta;
var colors = ["#222222", "#193969", "#1A2A45", "#A62D2A","#FFB600", "#222222" ];

function setupKeyWord() {

    var years =[];

    for (var i=0; i<Object.keys(keyWord).length; i++) {

        years.push(Object.keys(keyWord)[i]);
    }


    var bodyWidth = document.body.style.width = 1398*(years.length +1);
    console.log(bodyWidth);
    // document.body.style.background = "#222222";
    var keyBar = document.getElementById('key-bar');
    keyBar.style.left = "1398";
    
    keyBar.style.width = 1397*(years.length);
    var barEnd = keyBar.style.width;
    keyBar.style.visibility = "visible";
    console.log(keyBar.style.left +";" +barEnd );

    for (var i=0; i<years.length; i++) {
        console.log(keyWord[years[i]]);
        var timeTag = document.createElement('div');
        timeTag.className = "time-tag";
        timeTag.style.left = 1398 + i*1398;
        timeTag.style.background = "#ffffff";
        keyBar.appendChild(timeTag);
        // console.log(timeTag.style.left);
    }

    for (var i=0; i< (years.length + 1); i++) {
        var backGround = document.createElement('div');
        backGround.className = "back-ground";
        backGround.id = "back" + i;
        backGround.style.background = colors[i];
        backGround.style.float = "left";
        backGround.style.left = i*1398;
        backGround.style.width = 1398;
        document.body.appendChild(backGround);
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