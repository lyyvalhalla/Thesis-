var titles =[], titleObjects=[], convexArray = [];
var tempFolder, tempDepth;
var goTitle, goSubs, goPopup, goBack, isPopup = false;
var selectPos;
var tempNodes = [];
var showNodes = [];
var lastDay;
// call in main init()
function initMenu() {
	createPath();
	createMenuNodes(folders);
	addPathNodes(nodes);
}


function createMenuNodes(folders) {
	var points = [];
	
	folders.forEach(function(d){

		for ( var i = 0; i < 8; i ++ ) {
			points.push( randomPointInSphere( 5 ) );
		}
		var conGeo = new THREE.ConvexGeometry(points);
		var conMat = new THREE.MeshLambertMaterial({color: 0x9E281B, shading: THREE.FlatShading});
		var convex = new THREE.Mesh(conGeo, conMat);
		convex.position.set(getRandomInt(splineCamera.position.x-200, splineCamera.position.x+ 200),getRandomInt(splineCamera.position.y-100, splineCamera.position.y+100),getRandomInt(splineCamera.position.z-150, splineCamera.position.z-200) )
		convexArray.push(convex);
		d.convex = convex;
		scene.add(convex);
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

	var mainMenu = convexArray[0];
	mainMenu.position.set(splineCamera.position.x, splineCamera.position.y, splineCamera.position.z-150);
	mainMenu.visible = true;
	
	for (var i=0; i<convexArray.length; i++) {
		
		titleObjects[i].position.x = convexArray[i].position.x+20;
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
	// clear > invisible everything
	var readyNodes = getPathSites(nodes);
	for (var x=0; x<readyNodes.length; x++) {
		readyNodes[x].particle.visible = false;
	}
	

	var lines =[];
	var isOn;
	// toggle display
	
	for (var j=0; j<folders.length; j++) {
		var lineGeo = new THREE.Geometry();
		lineGeo.vertices.push(folders[i].convex.position, folders[j].convex.position);
		var lineMat = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 0.3});
		var line = new THREE.Line(lineGeo, lineMat);	
		var previousFolder;
		var eachTitle;
		if (folders[i].children) {
			tempNodes = getPathSites(tree.nodes(tempFolder));
			showNodes = currentNodes(tempFolder);
			lastDay = getLatest(tempNodes);
			if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth) {
				convexArray[j].visible = true;
				titles[j].style.display = "block";
				folders[j].line = line;
				scene.add(line);
				goPopup.style.display = "inline";
			} 
		}	
		else if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children === null) {
			convexArray[j].visible = false;
			titles[j].style.display = "none";
			scene.remove(folders[j].line);
			console.log("meow");
		}	
	}
	

	//toggle children on click
	if(folders[i].children) {
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


function onDocumentMouseDown(event) {
	event.preventDefault();

	$(goPopup).click(function() {
		
		goStart(lastDay);
		cameraStep = Math.abs(selectPos/pathLength);
		goPopup.style.display = "none";
		goSubs.style.display = "none";
		// add > visible current fodler
		toggleViz(showNodes);
	});

	$(goBack).click(function() {
		cameraStep = 0;
		goBack.style.display= "none";
		goSubs.style.display = "block";
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


