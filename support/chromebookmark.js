extension_id = "hoepagfegacjokcdkddnkipfclegeieh"
var jsonHtml, jsonObject;


window.onload = function() {
    init();
    animate();


    $('#json').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            jsonHtml = e.target.innerHTML;      // the stringified json in a string
            jsonObject = JSON.parse(jsonHtml);  // the actual object
            // console.log(jsonHtml);                
            // console.log(jsonObject);
            // console.log(parseTree(jsonObject)); 

            bmInit(jsonObject);
            // initProgress();
            update(root);
            // init();
            

           



            /*  add delete function here */



            /*hard-coded examples*/
            $("#remove").click(function() {
                removeBookmark('405');
            });
            $("#create").click(function() {
                createBookmark('29', 0, 'google', "http://www.google.com");
            });
            $("#move").click(function() {
                moveBookmark('31', '29', 1);
            });
            $("#update").click(function() {
                updateBookmark('32', 'itp', "http://www.itp.nyu.edu");
            });
        }
    });

    $('#wordCount').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var jsonText = e.target.innerText;      // the stringified json in a string
            var jsonObject = JSON.parse(jsonText);  // the actual object
            // console.log(jsonText);                
            console.log(jsonObject);
        }
    });

    $('#dateCount').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var jsonText = e.target.innerText;      // the stringified json in a string
            var jsonObject = JSON.parse(jsonText);  // the actual object
            // console.log(jsonText);                
            console.log(jsonObject);
        }
    });

    $('#wordCountByMonth').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var jsonText = e.target.innerText;      // the stringified json in a string
            var jsonObject = JSON.parse(jsonText);  // the actual object
            // console.log(jsonText);                
            console.log(jsonObject);
        }
    });

    $('#wordCountByYear').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var jsonText = e.target.innerText;      // the stringified json in a string
            var jsonObject = JSON.parse(jsonText);  // the actual object
            // console.log(jsonText);                
            console.log(jsonObject);
        }
    });



};

/* get right directory from chrome json*/
function bmInit(object) {
    root = object[0].children[0];
    // console.log(bmParent);
}



//  remove bookmark by id
function removeBookmark(id) {
    chrome.runtime.sendMessage(extension_id, 
            {'operation': 'remove', 'id': id});
}

// create a new bookmark
// parentId : id of parent folder
// index    : position within parent folder
// title    : the new bookmark's title
// url      : the new bookmark's url
function createBookmark(parentId, index, title, url) {
    chrome.runtime.sendMessage(extension_id, 
            {'operation': 'create', 'parentId': parentId, 'index': index, 'title': title, 'url': url});
}

// move a exisiting bookmark to a new folder
// id       : the existing bookmark's id
// parentId : new parent folder to move under
// index    : position within new parent folder
function moveBookmark(id, parentId, index) {
    chrome.runtime.sendMessage(extension_id, 
            {'operation': 'move', 'id':id, 'parentId': parentId, 'index': index});
}

// update the content of an existing bookmark
// id       : the existing bookmark's id
// title    : bookmark's new title
// url      : bookmark's mew url
function updateBookmark(id, title, url) {
    chrome.runtime.sendMessage(extension_id, 
            { 'operation': 'update', 'id':id, 'title': title, 'url': url});
}
