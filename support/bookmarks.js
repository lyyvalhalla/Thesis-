var tempSite, tempFolder;
var titleArray = [];


var getPathSites = function(nodes) {

	var pathSites = [];

	for (var i=0; i<nodes.length; i++) {
		if(nodes[i].url) {
			tempSite = nodes[i];
			pathSites.push(tempSite);
			
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
	// webpage.sandbox = "allow-same-origin allow-scripts";
	webpage.sandbox = "allow-same-origin";
	// webpage.style.transform ='scale(' + 0.1 + ',' + 0.1 + ')';
	dom.appendChild(webpage);


	return object;
}


/****************  fast sheet here ************************/

function wordFrequency(nodes){
	for (var i=0; i<nodes.length; i++) {
		titleArray.push(nodes[i].name);
	}
	var frequency = {};
	titleArray.forEach(function(value){
		frequency[value] = 0;
	});
	var uniques = titleArray.filter(
		function(value) { return ++frequency[value] == 1; }
	);
	
	uniques.sort(
		// console.log(frequency);
		function(a, b) { 
			return frequency[b] - frequency[a]; 
		}
	);
	// console.log(frequency);
}





function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}












