var pathLengt;

var splineCamera;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();

var path = new THREE.Object3D();
var pathNodes = [];
var pathArray=[];
var tempFrames=[];
var totalGroup = [];
var tube, tubeMesh;
// var tubePos = [];



function createPath() {
	camera.position.set(0, -180, 0);


	// compute length
	getTempTime(nodes);


	var xLine, zLine = -200;

	var arrayZ = [], vertexZ, arrayX = [], vertexX;
	for(var i =0; i<7; i++) {
		vertexZ = getRandomInt(zLine, zLine-pathLength);
		arrayZ.push(vertexZ);
	}
	arrayZ.sort(function(a, b) {
	  return b - a ;
	}); 

	for(var i=0; i<7; i++) {
		vertexX = getRandomInt(-500, 500);
		arrayX.push(vertexX);
	}
	

	//0x2E2E2E
	var material = new THREE.MeshBasicMaterial({
        color: 0xE3E086,
        linewidth: 1000,
        // wireframe:true,
        fog: true
    });
	var geometry = new THREE.Geometry();

	geometry.vertices.push(new THREE.Vector3(0, -200, zLine));
    geometry.vertices.push(new THREE.Vector3(getRandomInt(-200, 200), -200, arrayZ[0]));
    geometry.vertices.push(new THREE.Vector3(arrayX[1], -200, arrayZ[1]));
    geometry.vertices.push(new THREE.Vector3(arrayX[2], -200, arrayZ[2]));
    geometry.vertices.push(new THREE.Vector3(arrayX[3], -200, arrayZ[3]));
    geometry.vertices.push(new THREE.Vector3(arrayX[4], -200, arrayZ[4]));
    geometry.vertices.push(new THREE.Vector3(arrayX[5], -200, arrayZ[5]));
    geometry.vertices.push(new THREE.Vector3(arrayX[6], -200, arrayZ[6]));
    geometry.vertices.push(new THREE.Vector3(0, -200, zLine-pathLength));


    var pipeSpline = new THREE.SplineCurve3([
    	new THREE.Vector3(0, -200, zLine),
    	new THREE.Vector3(arrayX[0], -200, arrayZ[0]),
		new THREE.Vector3(arrayX[1], -200, arrayZ[1]),
		new THREE.Vector3(arrayX[2], -200, arrayZ[2]),
		new THREE.Vector3(arrayX[3], -200, arrayZ[3]),
		new THREE.Vector3(arrayX[4], -200, arrayZ[4]),
		new THREE.Vector3(arrayX[5], -200, arrayZ[5]),
		new THREE.Vector3(arrayX[6], -200, arrayZ[6]),
		new THREE.Vector3(arrayX[6], -200, arrayZ[6]),
		new THREE.Vector3(0, -200, zLine-pathLength),
    	]);



	tube = new THREE.TubeGeometry(pipeSpline, 50, 20, 12, false);
	tubeMesh = new THREE.SceneUtils.createMultiMaterialObject(tube, [
		new THREE.MeshBasicMaterial({
			color: 0xE3E086
		}),
		new THREE.MeshBasicMaterial({
			color: 0xff0000,
			opacity: 0.3,
			wireframe: true,
			transparent: true
	})
		]);
	scene.add(tubeMesh);
	// tempTube.scale.set( 1, 1, 1 );
    scene.fog = new THREE.Fog( 0xA9E2F3, 500, pathLength*2/3);
}



function pathRender() {
	/*
	var time = Date.now();
	var looptime = 20 * 1000;
	var t = ( time % looptime ) / looptime;
	*/
	var pos = tube.parameters.path.getPointAt( cameraStep );

	// interpolation
	var segments = tube.tangents.length;
	var pickt = cameraStep * segments;
	var pick = Math.floor( pickt );
	var pickNext = ( pick + 1 ) % segments;

	binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
	binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );


	var dir = tube.parameters.path.getTangentAt( cameraStep );
	var offset = 1;
	normal.copy( binormal ).cross( dir );
	pos.add( normal.clone().multiplyScalar( offset ) );

	splineCamera.position.copy( new THREE.Vector3(pos.x, (pos.y+20), pos.z) );

	// Using arclength for stablization in look ahead.
	var lookAt = tube.parameters.path.getPointAt( ( cameraStep + 30 / tube.parameters.path.getLength() ) % 1 );

	// Camera Orientation 2 - up orientation via normal
	
	// splineCamera.matrix.lookAt(splineCamera.position, lookAt, normal);
	splineCamera.rotation.setFromRotationMatrix( splineCamera.matrix, splineCamera.rotation.order );	

	// console.log(splineCamera.rotation.order);
}




function addPathNodes(nodes) {

	// get bookmarks (node folders)
	pathNodes = getPathSites(nodes);
	pathNodes = indexTime(pathNodes);
	
	var pathNode;
	
	for (var i =0; i<pathNodes.length; i++) {

		var position = tube.parameters.path.getPointAt(pathNodes[i].zPos/10000);
		// tubePos.push(position);
		var geometry =  new THREE.BoxGeometry(10, 10, 10);
		var material =  new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});  // sortCategory() here 
		pathNode = new THREE.Mesh(geometry, material);
		pathArray.push(pathNode);
		pathNode.position.x = getRandomInt(position.x-200, position.x+200) ;
		pathNode.position.y = position.y + 25;
		pathNode.position.z = position.z;
		scene.add(pathNode);

		
	}
	// console.log(pathArray);

	totalGroup = groupFrame(pathNodes, pathLength);
	

	for (var i =0; i<totalGroup[30].length; i++) {
		// console.log(totalGroup[108][i]);
		var tubePosIndex = totalGroup[30][i].index; 
		// var pathFrame = new showFrame(totalGroup[30][i], tubePos[tubePosIndex].x+ getRandomInt(400, 800), tubePos[tubePosIndex].y-300, tubePos[tubePosIndex].z);
		// console.log(pathArray[tubePosIndex]);
		var pathFrame = new showFrame(totalGroup[30][i], pathArray[tubePosIndex].position.x+ getRandomInt(400, 800), pathArray[tubePosIndex].position.y-300, pathArray[tubePosIndex].position.z);
		tempFrames.push(pathFrame);
		// scene2.add(pathFrame);
	}
}

var checkArray = [];

// add & delete in realtime according to camera position
function updateFrame(){
	
	  for (var i=0; i<scene.children.length; i++) {
	  	
		if (splineCamera.position.distanceTo(scene.children[i].position) <100) {
			if (checkArray.indexOf(i) === -1) {
				scene2.add(new showFrame(pathNodes[i], pathArray[i].position.x+ getRandomInt(400, 800), pathArray[i].position.y-300, pathArray[i].position.z));
				checkArray.push(i);
				console.log(checkArray);
			} else {
				
			}
		} else {
			// console.log(scene2.children);
			// if in array >> remove it from array
			if (checkArray.indexOf(i) != -1) {
				scene2.remove(scene2.children[i]);
				checkArray.remove(i);
				
			} else {
				


			}
		} 
	  }
	// console.log(splineCamera.position.distanceTo(scene2.children[0].position) );
	

	
	
	// group.forEach(function(d){
		
	// })

	// for (var i=0; i < group.length; i++) {
		// console.log((splineCamera.position.z - (-group[i][0].zPos)));
		// if ((splineCamera.position.z - (-group[i][0].zPos)) > 300  && (splineCamera.position.z - (-group[i][0].zPos)) < 600) {
		// 	console.log("wang");
		// 	for (var j =0, p=0; j<scene2.children.length, p<group[i].length; j++, p++) {
		
		// 		if (scene2.children[j] === group[i][p]) {
		// 			console.log("wang");
		// 		} else {
		// 			scene2.add(group[i][p]);
		// 		}

				
		// 	}
		// }
	// }

	
}



// divided down all bookmarks into groups for camera track and show < 2D Array
function groupFrame(nodesArray, pathLength) {
	var nodeGroups = [];
	var offset = 200;
	var lengthIntervals = Math.round(pathLength/offset);
	var nodeIntervals = Math.floor(nodesArray.length/lengthIntervals);
	var indexArray = [];

	console.log(nodesArray.length);

	for (var i=0, j=0; i<nodesArray.length; i+=nodeIntervals, j++) {
		
		nodeGroups[j] = [];
		for (var q =0; q<nodeIntervals; q++) {
			indexArray.push(i+q);
			// console.log(j + "; " + q + "; " + (i+q));
			nodeGroups[j][q] = nodesArray[i+q];
		}	
	}

	for (var i =0; i<nodesArray.length; i++) {
		nodesArray[i].index = indexArray[i];
		// console.log(nodesArray[i]);
	}
	
	return nodeGroups;
}





function cameraTransit() {

}



Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};



