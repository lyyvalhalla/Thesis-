extension_id = "fkdnjmgfbbdflepjdlkbekemkaaahkei"
var jsonHtml, jsonObject;

// watch the html element that should contain the json string for change
// when it's changed, it means the extension has sent us the json string via
// the middleman, now we can use that json string to do stuff
window.onload = function() {
    $('#json').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            jsonHtml = e.target.innerHTML;      // the stringified json in a string
            jsonObject = JSON.parse(jsonHtml);  // the actual object
            // console.log(jsonHtml);                
            // console.log(jsonObject);
            // console.log(parseTree(jsonObject)); 


            bmInit(jsonObject);



            init();
            animate();
            

            // ...
            // did a bunch of stuff, modified the jsonObject
            // now ready to send it back, call sendBookmarkToExtension here

            /***** NOTE ********************************************************************
             * Below are hard-coded examples of how to use the above 4 utility functions
             * Needs to update harccode value to make it work
             ******************************************************************************/
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
};

/****** NOTE *******************************************************************
 * These functions below are utility functions to manipulate the user bookmarks,
 * calling these will permanently and irreversibly change the user's bookmarks.
 * We provide 4 functionalities, remove, create, move and update.
 * If you need more capabilities, talk to dayu first, for example delete folder
 ******************************************************************************/
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
