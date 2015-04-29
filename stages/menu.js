var titles =[], titleObjects=[], convexArray = [];
var tempFolder, tempDepth;
var goTitle, goSubs, goPopup, isPopup = false;
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
	


	console.log(folders[i].children);
	var lines =[];
	// toggle display
	for (var j=0; j<folders.length; j++) {
		var lineGeo = new THREE.Geometry();
		lineGeo.vertices.push(folders[i].convex.position, folders[j].convex.position);
		var lineMat = new THREE.LineBasicMaterial({color: 0xffffff});
		var line = new THREE.Line(lineGeo, lineMat);	

		if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children) {
			convexArray[j].visible = true;
			titles[j].style.display = "block";
			folders[j].line = line;
			scene.add(line);
			console.log("meow");
		} 
		else if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children === null) {
			convexArray[j].visible = false;
			titles[j].style.display = "none";
			scene.remove(folders[j].line);
			console.log("woof");
		}	
	}


	//toggle children on click
	if(folders[i].children) {
		folders[i]._children = folders[i].children;
		folders[i].children = null;
	} else {
		folders[i].children = folders[i]._children;
		folders[i]._children = null;
	}
	// console.log(folders[i].title + "; " + folders[i].children);
	convexArray[0].visible = true;
	titles[0].style.display = "block";
}


function onDocumentMouseDown(event) {
	event.preventDefault();

	for (var i =0; i<convexArray.length; i++) {
		if (intersects.length > 0 && intersects[0].object === convexArray[i]) {
			intersects[0].object.material = new THREE.MeshLambertMaterial({color: 0xffffff});
			clickMenu(i);
		}
	}
	// goStart(tempFolder);
	$(goPopup).click(function() {
		cameraStep = Math.abs(selectPos/pathLength);
		goPopup.style.display = "none";

		// add > visible current fodler
		toggleViz(currentNodes(tempFolder));
	});

}



var selectPos;


/* last node position in that folder, copy camera position to this later  */
function goStart(folder) {

	var tempNodes = [];
	tempNodes = getPathSites(tree.nodes(folder));
	if (tempNodes.length > 0) {
		selectPos = tempNodes[tempNodes.length-1].particle.position.z;

		// cameraStep = Math.abs(selectPos/pathLength);
		// console.log(Math.abs(selectPos/pathLength));

		goPopup.style.display = "inline";

		var eachTitle;
		for (var i=0; i<folder.children.length; i++) {
		
			eachTitle = document.createElement("p");
			eachTitle.className = "eachTitle";
			eachTitle.textContent = folder.children[i].title;
			eachTitle.style.position = "relative";
			goSubs.appendChild(eachTitle);
		}
		eachTitle.style.display = "block";
		// pathRender();
		/*change camera position here */
	}	else {
		goPopup.style.display = "none";
		$(".eachTitle").remove();
	}
}


function addGo(folder) {
	goTitle = document.getElementById("goTitle");
	goTitle.textContent = folder.title;
	goTitle.style.visibility = "visible";	

	goSubs = document.getElementById("goSubs");

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
	}
}


function randomPointInSphere( radius ) {
	return new THREE.Vector3(
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius,
		( Math.random() - 0.5 ) * 2 * radius
	);
}


