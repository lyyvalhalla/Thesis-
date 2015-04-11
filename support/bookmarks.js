var tempSite, tempFolder;

var getPathSites = function(nodes) {

	var pathSites = [];

	for (var i=0; i<nodes.length; i++) {
		if(nodes[i].url) {
			tempSite = nodes[i];
			pathSites.push(tempFolder);
			
	} else {
			tempFolder = nodes[i];
			folders.push(tempFolder);
			
		}
	}
	return pathSites;
}


var getPathFolders = function(nodes) {

	var pathFolders = [];

	for (var i=0; i<nodes.length; i++) {
		if(nodes[i].url) {
			tempSite = nodes[i];
			pathSites.push(tempFolder);
			
	} else {
			tempFolder = nodes[i];
			pathFolders.push(tempFolder);
			
		}
	}
	return pathFolders;
}





var showFrame = function (site, x, y, z) {

	var dom = document.createElement('div');
	var object = new THREE.CSS3DObject(dom);
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;



	var webpage = document.createElement('iframe');
	webpage.src = site.url;
	webpage.className = "frame";
	dom.appendChild(webpage);


	return object;
}



var setupSearchBox = function (x, y, z) {

	var box = document.createElement('div');
	var searchBox = new THREE.CSS3DObject(box);

	searchBox.position.x = x;
	searchBox.position.y = y;
	searchBox.position.z = z;

	var searchInput = document.createElement('input');
	searchInput.id = "startType";
	searchInput.type = "search";
	// searchInput.type = "text";	
	box.appendChild(searchInput);


	return searchBox;

	
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}












