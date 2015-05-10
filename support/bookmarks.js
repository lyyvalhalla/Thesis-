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

var deleteButton, webpage;
var showFrame = function (site, x, y, z) {

	dom = document.createElement('div');
	dom.className = "domFrame";
	object = new THREE.CSS3DObject(dom);
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;

	// webpage = document.createElement('iframe');
	// webpage.src = site.url;
	// webpage.className = "frame";
	// webpage.sandbox = "allow-same-origin allow-scripts";
	// // webpage.sandbox = "allow-same-origin";
	// dom.appendChild(webpage);


	deleteButton = document.createElement('div');
	deleteButton.className = "deleteButton";
	var t = document.createElement('div');
	t.textContent = site.title;
	t.id = "deleteTitle"; 
	var trash = document.createElement('img');
	trash.id = "trash";
	trash.src ="img/trash.png"; 
	t.appendChild(trash);                         
	deleteButton.appendChild(t); 
	dom.appendChild(deleteButton);

	deleteButton.onclick = function() {
		console.log(site.id);
		removeBookmark(site.id);
		deleteButton.style.opacity="0";
		webpage.classList.add('remove');
		
	}

	// add time tag
	var timeTag = document.getElementById('timeTag');
	timeTag.textContent = site.time;
	timeTag.className = "timeTag";


	webpage = document.createElement('iframe');
	webpage.src = site.url;
	webpage.className = "frame";
	webpage.sandbox = "allow-same-origin allow-scripts";
	// webpage.sandbox = "allow-same-origin";
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
		function(a, b) { 
			return frequency[b] - frequency[a]; 
		}
	);
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}












