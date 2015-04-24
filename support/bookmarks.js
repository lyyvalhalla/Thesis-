var tempSite, tempFolder;
var titleArray = [];
var dom, object;


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


var getPathFolders = function(nodes) {
	var pathFolders =[];
	for (var i=0; i<nodes.length; i++) {
		if(nodes[i].url === null) {
			pathFolders.push(nodes[i]);		
		}
	}
	return pathFolders;
}


var showFrame = function (site, x, y, z) {

	// console.log(site.time);
	dom = document.createElement('div');
	dom.className = "domFrame";
	object = new THREE.CSS3DObject(dom);
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;

	var webpage = document.createElement('iframe');
	webpage.src = site.url;
	webpage.className = "frame";
	// webpage.sandbox = "allow-same-origin allow-scripts";
	webpage.sandbox = "allow-same-origin";
	dom.appendChild(webpage);


	var deleteButton = document.createElement('button');
	var t = document.createTextNode(site.title);      
	deleteButton.appendChild(t);                          
	deleteButton.className = "deleteButton";
	dom.appendChild(deleteButton);

	deleteButton.onclick = function() {
		console.log(site.id);
		removeBookmark(site.id);
	}

	// add time tag
	var timeTag = document.createElement('div');
	timeTag.textContent = site.time;
	timeTag.className = "timeTag";
	dom.appendChild(timeTag);




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












