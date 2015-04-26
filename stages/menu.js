var pathMenu, menu;
var menuNodes = [];
var menuNode, nodeIco, nodeTitle;
var addClick = [];

var convexMenu;

// call in main init()
function initMenu() {
	createPath();

	pathMenu = document.createElement('div');
	pathMenu.id = "cssMenu";
	menu = new THREE.CSS3DObject(pathMenu);
	menu.position.z = splineCamera.position.z -200;


	
	createMenuNodes(folders);
	addPathNodes(nodes);

	// scene2.add(menu);
	// scene.add(convexMenu);
}


convexArray = [];
function createMenuNodes(folders) {
	var points = [];
	
	folders.forEach(function(d){
		menuNode = document.createElement('div');
		menuNode.className = "menuNode";
		pathMenu.appendChild(menuNode);
		menuNodes.push(menuNode);
		

		for ( var i = 0; i < 10; i ++ ) {
			points.push( randomPointInSphere( 5 ) );
		}
		var conGeo = new THREE.ConvexGeometry(points);
		var conMat = new THREE.MeshLambertMaterial({color: 0x9E281B});
		var convex = new THREE.Mesh(conGeo, conMat);
		convex.position.set(getRandomInt(-200, 200),getRandomInt(-200, 200),getRandomInt(-200, -300) )
		convexArray.push(convex);
		d.convex = convex;
		// convexMenu.add(convex);
		scene.add(convex);
		convex.visible = false;
		
		nodeIco = document.createElement('div');
		nodeIco.className = "nodeIco";
		nodeIco.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		menuNode.appendChild(nodeIco);

		nodeTitle = document.createElement('div');
		nodeTitle.className = "nodeTitle";
		nodeTitle.textContent = d.title;
		menuNode.appendChild(nodeTitle);

	})



	menuNodes[0].id = "default-node";
	var mainMenu = convexArray[0];
	mainMenu.position.set(0, 0, -100);
	mainMenu.visible = true;
	// scene.add(mainMenu);
	
	// closure inside loop**
	for (var i=0; i<menuNodes.length; i++) {
		addClick[i] = (function(index){
			return function() {
				menuNodes[index].addEventListener("click", function(event) {updateMenu(index);}, false);
			};
    	}(i));
	}
	for (var j = 0; j < menuNodes.length; j++) {
		addClick[j]();
	}
}

function onDocumentMouseDown(event) {
	event.preventDefault();

	for (var i =0; i<convexArray.length; i++) {
		if (intersects.length > 0 && intersects[0].object === convexArray[i]) {
			console.log(folders[i]);
			updateMenu(i);
		}
	}
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
			// menuNodes[j].style.display = 'block';
			convexArray[j].visible = true;
		} else if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth) {
			// menuNodes[j].style.display = 'none';
			convexArray[j].visible = false;
		}
	}
	// menuNodes[i].style.display = 'block';
	convexArray[0].visible = true;
}


// under clicked folder
var currentNodes = function(folder) {
	var tempNodes = [];
	tempNodes = getPathSites(tree.nodes(folder));
	return tempNodes;
}

// toggle visibility each click
function toggleViz(temp) {
	console.log(temp.length);
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






/*
1. get all folders, run through them if (children), click to get children

2. attach design geometries to them




menu.child.click(clickedfolder) {

	//	css layer
	showChildrenInMenu();
	// webGL layer
	addCurrentNodesToPath();
}


*/

/*
menu.element.onclick = function(){
	
}
*/