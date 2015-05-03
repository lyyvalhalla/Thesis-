var keyWordArray =[], timeStampArray =[];


function setupKeyWord() {
    
    var years =[];

    for (var i=0; i<Object.keys(keyWord).length; i++) {

        years.push(Object.keys(keyWord)[i]);
    }
    
    for (var i=0; i<years.length; i++) {
        console.log(keyWord[years[i]]);
    }

    var wordBar = document.getElementById("key-bar");


    // console.log(keyWord["2012"]);
    // console.log(years);
   

}