var tree = d3.layout.tree();

var keyWordArray =[], timeStampArray =[];
var delta;
var colors = ["#222222", "#193969", "#1A2A45", "#A62D2A","#FFB600", "#222222", "#193969", "#1A2A45", "#A62D2A","#FFB600", "#222222", "#193969", "#1A2A45", "#A62D2A","#FFB600"];
var wordsArray = [], eachArray=[];
function setupKeyWord() {

    var years =[];

    for (var i=0; i<Object.keys(keyWord).length; i++) {

        years.push(Object.keys(keyWord)[i]);
    }


    var bodyWidth = document.body.style.width = 1398*(years.length +1);
    var keyBar = document.getElementById('key-bar');
    keyBar.style.left = "1398";
    
    keyBar.style.width = 1397*(years.length);
    var barEnd = keyBar.style.width;
    keyBar.style.visibility = "visible";


    for (var i=0; i<years.length; i++) {
        // console.log(keyWord[years[i]][0]);
        var timeTag = document.createElement('div');
        timeTag.className = "time-tag";
        timeTag.style.left = 1398 + i*1398;
        timeTag.style.background = "#ffffff";
        keyBar.appendChild(timeTag);
        
        var timeYear = document.createElement('div');
        timeYear.className = "time-year";
        timeYear.textContent = keyWord[years[i]][0].year;
        timeYear.style.left = 1200 + i*1398;
        timeYear.style.bottom = 50;
        keyBar.appendChild(timeYear);
    }


    var backgrounds =[];
    for (var i=0; i< (years.length + 1); i++) {
        var backGround = document.createElement('div');
        backGround.className = "back-ground";
        backGround.id = "back" + i;
        backGround.style.background = colors[i];
        backGround.style.float = "left";
        backGround.style.left = i*1398;
        backGround.style.width = 1398;
        document.body.appendChild(backGround);
        backgrounds.push(backGround);
    }


    // for (var i=0; i<years.length; i++) {
    //     var wordsArray =[];
    //     for (var j=0; j<keyWord[years[i]].length; j++) {
    //         console.log(keyWord[years[i]][j]);
    //          wordsArray.push(keyWord[years[i]][j].word);;
    //     }
    // }

    var words;
    var eachWord;

    $(window).scroll(function() {
        
        for (var i=0; i<years.length; i++) {
            var wordsArray =[];
            for (var j=0; j<keyWord[years[i]].length; j++) {
                console.log(keyWord[years[i]][j])
                // single word

                


                
                wordsArray.push(keyWord[years[i]][j].word);
            }
            
            eachArray.push(wordsArray);
            words = document.getElementById('title');
            words.style.display = "inline-block";
            words.style.width = 10;
            words.style.height = 100;
            // console.log(((parseInt(backgrounds[i+1].style.left))+1398) + "; " + parseInt(backgrounds[i+1].style.left));
            if (window.pageXOffset < (parseInt(backgrounds[i+1].style.left)+1398) && window.pageXOffset > parseInt(backgrounds[i+1].style.left)) {
                words.textContent = eachArray[i];
            }

            if (window.pageXOffset < 1398) {
                words.textContent = "bookmarks bio";
            }
        }   

    });

    $("#title").hover(function() {
        console.log("woof");
    })

   

}




var root, nodes;
function getMark(source, id) {
    root = source[0].children[0];
    nodes = tree.nodes(root);

    var sites = getPathSites(nodes);
    // console.log(sites);
    for (var i =0; i< sites.length; i++) {
        console.log(sites[i]);
        if (sites[i].id === id)  {
            return sites[i];
            console.log(sites[i]);
        }
    }
}









var getPathSites = function(n) {
    var pathSites = [];
    for (var i=0; i<n.length; i++) {
        if(n[i].url) {
            tempSite = n[i];
            pathSites.push(tempSite);   
        } 
    }
    return pathSites;
}