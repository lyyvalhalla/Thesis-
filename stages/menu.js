var titles =[], titleObjects=[], convexArray = [];
// call in main init()
function initMenu() {
	createPath();
	// createMenuNodes(folders);
	addPathNodes(nodes);

}


function createMenuNodes(folders) {
	var points = [];
	
	folders.forEach(function(d){

		for ( var i = 0; i < 10; i ++ ) {
			points.push( randomPointInSphere( 5 ) );
		}
		var conGeo = new THREE.ConvexGeometry(points);
		var conMat = new THREE.MeshLambertMaterial({color: 0x9E281B});
		var convex = new THREE.Mesh(conGeo, conMat);
		convex.position.set(getRandomInt(-200, 200),getRandomInt(-200, 200),getRandomInt(-100, -200) )
		convexArray.push(convex);
		d.convex = convex;
		scene.add(convex);
		convex.visible = false;
		
		

		var nodeTitle = document.createElement('div');
		var menuTitle = new THREE.CSS3DObject(nodeTitle);
		nodeTitle.className = "nodeTitle";
		nodeTitle.innerHTML = d.title;
		titles.push(nodeTitle);
		titleObjects.push(menuTitle);
		nodeTitle.style.display = "none";
		scene2.add(menuTitle);
	});

	var mainMenu = convexArray[0];
	mainMenu.position.set(0, 0, -100);
	mainMenu.visible = true;

	for (var i=0; i<convexArray.length; i++) {
		
		titleObjects[i].position.x = convexArray[i].position.x+20;
		titleObjects[i].position.y = convexArray[i].position.y;
		titleObjects[i].position.z = convexArray[i].position.z;
		
	}

	titles[0].style.display = "block";
	
}


// call in addEventListener("click")
function updateMenu(i) {

	var tempFolder = folders[i];
	var tempDepth = folders[i].depth + 1;
	
	// ***** toggle visiblity *****
	// clear > invisible everything
	var readyNodes = getPathSites(nodes);
	for (var x=0; x<readyNodes.length; x++) {
		readyNodes[x].particle.visible = false;
	}
	// add > visible current fodler
	toggleViz(currentNodes(tempFolder));

	//toggle children on click
	if(folders[i].children) {
		folders[i]._children = folders[i].children;
		folders[i].children = null;
	} else {
		folders[i].children = folders[i]._children;
		folders[i]._children = null;
	}
	
	// toggle display
	for (var j=0; j<folders.length; j++) {
		if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children === null) {
			convexArray[j].visible = true;
			titles[j].style.display = "block";
		} else if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth) {
			convexArray[j].visible = false;
			titles[j].style.display = "none";
		}	
	}
	convexArray[0].visible = true;
	titles[0].style.display = "block";
}


function onDocumentMouseDown(event) {
	event.preventDefault();

	for (var i =0; i<convexArray.length; i++) {
		if (intersects.length > 0 && intersects[0].object === convexArray[i]) {
			updateMenu(i);
		}
	}
}




// under clicked folder
var currentNodes = function(folder) {
	var tempNodes = [];
	tempNodes = getPathSites(tree.nodes(folder));
	return tempNodes;
}

// toggle visibility each click
function toggleViz(temp) {
	for (var i = 0; i<temp.length;  i++) {
		temp[i].particle.visible = true;
		console.log(temp[i].particle.visible);
	}
}


function randomPointInSphere( radius ) {
	return new THREE.Vector3(
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius
	);
}


