var titles =[], titleObjects=[], convexArray = [];
var tempFolder, tempDepth;
var goTitle, goSubs, goPopup, goBack, isPopup = false;
var selectPos;
var tempNodes = [];
var showNodes = [];
var lastDay;
var isReverse = Math.random() >= 0.5;
var mainMenu;
// call in main init()
function initMenu() {
	createPath();
	createMenuNodes(folders);
	addPathNodes(nodes);
}

var menuObject = new THREE.Object3D();
function createMenuNodes(folders) {
	
	folders.forEach(function(d){
		var points = [];
		for ( var i = 0; i < 20; i ++ ) {
			points.push( randomPointInSphere( 5) );
		}
		

		var conGeo = new THREE.ConvexGeometry(points);
		var conMat = new THREE.MeshLambertMaterial({color: 0xffffff, shading: THREE.FlatShading});
		var convex = new THREE.Mesh(conGeo, conMat);
		convex.position.set(getRandomInt(splineCamera.position.x-100, splineCamera.position.x+ 100),getRandomInt(splineCamera.position.y-80, splineCamera.position.y+80),splineCamera.position.z-150);
		convexArray.push(convex);
		d.convex = convex;
		menuObject.add(convex);
		convex.visible = false;
		

		var nodeTitle = document.createElement('div');
		nodeTitle.className = "nodeTitle";
		var menuTitle = new THREE.CSS3DObject(nodeTitle);
		nodeTitle.textContent = d.title;
		titles.push(nodeTitle);
		titleObjects.push(menuTitle);
		nodeTitle.style.display = "none";
		scene2.add(menuTitle);
	});

	scene.add(menuObject);
	mainMenu = convexArray[0];
	mainMenu.position.set(splineCamera.position.x, splineCamera.position.y, splineCamera.position.z-150);
	mainMenu.visible = true;
	
	for (var i=0; i<convexArray.length; i++) {
		
		titleObjects[i].position.x = convexArray[i].position.x+100;
		titleObjects[i].position.y = convexArray[i].position.y;
		titleObjects[i].position.z = convexArray[i].position.z;		
	}
	

	titles[0].style.display = "block";

	goPopup = document.getElementById("goPopup");
	goPopup.innerHTML = "GO";
	goPopup.style.display = "none";
}




// call in addEventListener("click")  ******************************************>>>> ! BUGGY !
function clickMenu(i) {

	tempFolder = folders[i];
	tempDepth = folders[i].depth + 1;

	// ***** toggle visiblity of PATH nodes *****
	var readyNodes = getPathSites(nodes);
	for (var x=0; x<readyNodes.length; x++) {
		readyNodes[x].particle.visible = false;
	}
	

	for (var j=0; j<folders.length; j++) {
		var lineGeo = new THREE.Geometry();
		lineGeo.vertices.push(folders[i].convex.position, folders[j].convex.position);
		var lineMat = new THREE.LineBasicMaterial({color: 0xd28399, linewidth: 0.3});
		var line = new THREE.Line(lineGeo, lineMat);	
		var previousFolder;
		var eachTitle;
		if (folders[i].children) {
			
			if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children) {
				convexArray[j].visible = true;
				titles[j].style.display = "block";
				folders[j].line = line;
				scene.add(line);
				goPopup.style.display = "inline";
			} 
		}	
		else if (folders[i].children === null) {
			
			if ( folders[j].parentId === folders[i].id && folders[j].depth === tempDepth) {
				convexArray[j].visible = false;
				titles[j].style.display = "none";
				scene.remove(folders[j].line);
				goPopup.style.display = "none";
			}
		}	
	}
	

	//toggle children on click
	if(folders[i].children) {
		tempNodes = getPathSites(tree.nodes(tempFolder));
		lastDay = getLatest(tempNodes);
		showNodes = currentNodes(tempFolder);
		$(".eachTitle").remove();
		for (var g =0; g< tempFolder.children.length; g++) {

			eachTitle = document.createElement("p");
			eachTitle.className = "eachTitle";
			eachTitle.textContent = tempFolder.children[g].title;
			eachTitle.style.position = "relative";
			goSubs.appendChild(eachTitle);
			
		}
		folders[i]._children = folders[i].children;
		folders[i].children = null;
	} else {
		$(".eachTitle").remove();
		folders[i].children = folders[i]._children;
		folders[i]._children = null;
	}
	convexArray[0].visible = true;
	titles[0].style.display = "block";
	
}
var isOk = false;

function onDocumentMouseDown(event) {
	event.preventDefault();


	$(goPopup).click(function() {
		isOk= true;

		goStart(lastDay);
		cameraStep = Math.abs(selectPos/pathLength);
		goPopup.style.display = "none";
		goSubs.style.display = "none";
		// add > visible current fodler
		toggleViz(showNodes);
		progress.style.visibility = "visible"; 
		barHolder.style.visibility = "visible";
		bar.style.visibility = "visible";
	});
	console.log(menuObject.position);

	$(goBack).click(function() {
		splineCamera.position.set( 0, 1000, -200 );
		
		goBack.style.display= "none";
		goSubs.style.display = "block";
		isOk = false;
		progress.style.visibility = "hidden"; 
		barHolder.style.visibility = "hidden";
		bar.style.visibility = "hidden";
	});

	for (var i =0; i<convexArray.length; i++) {
		if (intersects.length > 0 && intersects[0].object === convexArray[i]) {
			clickMenu(i);
		}
	}
}



/* last node position in that folder, copy camera position to this later  */
function goStart(lastDay) {
	selectPos = lastDay.particle.position.z + 1200;


	cameraStep =
	goBack = document.getElementById("goBack");
	goBack.style.display= "inline";
	goBack.innerHTML = "BACK";
	// pathRender();
}

// toggle visibility each click
function toggleViz(tempFolder) {
	for (var i = 0; i<tempFolder.length;  i++) {
		tempFolder[i].particle.visible = true;
	}
}

function addGo(folder) {
	goTitle = document.getElementById("goTitle");
	goTitle.textContent = folder.title;
	goTitle.style.visibility = "visible";	

	goSubs = document.getElementById("goSubs");
}


function camStepTransit() {

}





// under clicked folder
var currentNodes = function(folder) {
	var tempNodes = [];
	tempNodes = getPathSites(tree.nodes(folder));
	return tempNodes;
}

function randomPointInSphere( radius ) {
	return new THREE.Vector3(
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius
	);
}


