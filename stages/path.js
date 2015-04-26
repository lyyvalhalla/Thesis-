var pathLength;

var splineCamera;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();

var path = new THREE.Object3D();
var pathNodes = [];
var pathArray=[];
var tempFrames=[];
var totalGroup = [];
var checkArray = [];
var tube, tubeMesh;
var frameClick = [];
var plane, sphere;


function createPath() {
	camera.position.set(0, -180, 0);

	// compute length
	getTempTime(nodes);

	var xLine, zLine = -200;

	var arrayZ = [], vertexZ, arrayX = [], vertexX;
	for(var i =0; i<7; i++) {
		arrayZ[i] = -(pathLength/7)*(i+1);
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



    var pipeSpline = new THREE.SplineCurve3([
    	new THREE.Vector3(0, -200, zLine),
    	new THREE.Vector3(arrayX[0], -400, arrayZ[0]),
		new THREE.Vector3(arrayX[1], -300, arrayZ[1]),
		new THREE.Vector3(arrayX[2], -200, arrayZ[2]),
		new THREE.Vector3(arrayX[3], -400, arrayZ[3]),
		new THREE.Vector3(arrayX[4], -300, arrayZ[4]),
		new THREE.Vector3(arrayX[5], -200, arrayZ[5]),
		new THREE.Vector3(arrayX[6], -300, arrayZ[6]),
		new THREE.Vector3(arrayX[6], -500, arrayZ[6]),
		new THREE.Vector3(0, -200, zLine-pathLength),
    ]);



	// var path = new THREE.Path( curve.getPoints( 50 ) );

	// var geometry = path.createPointsGeometry( 50 );
	// var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

	// // Create the final Object3d to add to the scene
	// var splineObject = new THREE.Line( geometry, material );





	tube = new THREE.TubeGeometry(pipeSpline, 500, 25, 12, false);
	tubeMesh = new THREE.SceneUtils.createMultiMaterialObject(tube, [
		new THREE.MeshBasicMaterial({
			color: 0xd6954a
		}),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			opacity: 0.3,
			wireframe: true,
			transparent: true
		})
	]);


	scene.add(tubeMesh);
	// tempTube.scale.set( 1, 1, 1 );
    scene.fog = new THREE.Fog( 0x333333, 500, 1000);



    // create a back wall
    var planeGeo = new THREE.PlaneBufferGeometry(50, 50);
    var planeMat = new THREE.MeshBasicMaterial();
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0, -170, -195);
    plane.visible = false;
    scene.add(plane);


    // env
    addSphereEnv();
}


// *** camera follow path ***
function pathRender() {
	/*
	var time = Date.now();
	var looptime = 20 * 1000;
	var t = ( time % looptime ) / looptime;
	*/

	clickCallTime();

	/* 进度条跟进进度 */

	// if (cameraStep > tempStep + pathInterval) {
	// 	console.log("woof");
	// 	bar.style.width = bar.style.width + barInterval;
	// }

	// for (var i=0; i<pathValues.length; i++) {
	// 	if(cameraStep > pathValues[i] && cameraStep < pathValues[i+1]) {
	// 		bar.style.width = widthStamps[i];
	// 		console.log(pathValues[i] + "; " + widthStamps[i])
	// 	} 
	// }
	



	var pos = tube.parameters.path.getPointAt( cameraStep );
	var posNext =  tube.parameters.path.getPointAt( cameraStep + 0.001);

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

	splineCamera.position.copy( new THREE.Vector3(pos.x, (pos.y+20), pos.z-10) );
	// Using arclength for stablization in look ahead.
	var lookAt = tube.parameters.path.getPointAt( ( cameraStep + 30 / tube.parameters.path.getLength() ) % 1 );

	// Camera Orientation 2 - up orientation via normal	
	splineCamera.matrix.lookAt(splineCamera.position, new THREE.Vector3(posNext.x, posNext.y + 19, posNext.z ), new THREE.Vector3(0, 1, 0));
	splineCamera.rotation.setFromRotationMatrix( splineCamera.matrix, splineCamera.rotation.order );	
}

// add geometries at the beginning
function addPathNodes(nodes) {

	// get bookmarks (node folders)
	pathNodes = getPathSites(nodes);
	pathNodes = indexTime(pathNodes);
	
	var pathNode;
	
	for (var i =0; i<pathNodes.length; i++) {

		var position = tube.parameters.path.getPointAt(pathNodes[i].zPos/10000);
		var geometry =  new THREE.BoxGeometry(10, 10, 10);
		var material =  new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});  // sortCategory() here 
		pathNode = new THREE.Mesh(geometry, material);
		pathNodes[i].particle = pathNode;
		pathArray.push(pathNode);
		// pathNode.position.x = getRandomInt(position.x-200, position.x+200) ;
		pathNode.position.x = position.x;
		pathNode.position.y = position.y + 25;
		pathNode.position.z = position.z - 1000;
		pathNode.visible = true;
		scene.add(pathNode);
	}
	// totalGroup = groupFrame(pathNodes, pathLength);
}


// add & delete frames in realtime according to camera position: pathNodes--nodes, pathArray
function updateFrame(pathNodes, pathArray){
	
	for (var i=0, j=0; i<pathArray.length; i++ ) {
		if (splineCamera.position.distanceTo(pathArray[i].position) > 740 && splineCamera.position.distanceTo(pathArray[i].position) < 800 && pathArray[i].visible) {
			if (checkArray.indexOf(i) === -1) {
				var newFrame = new showFrame(pathNodes[i], pathArray[i].position.x, pathArray[i].position.y + 100, pathArray[i].position.z)
				scene2.add(newFrame);
				checkArray.push(i);
				j++;
			} 
		} else {
			if (scene2.children[j] != -1 && checkArray.indexOf(i) != -1) {
				scene2.remove(scene2.children[j]);
				checkArray.delete(i);
			}
		} 
	}
	// console.log(splineCamera.position.distanceTo(pathArray[0].position));	
	console.log(scene2.children.length);
}



/* add sphere environment */

function addSphereEnv() {

	var sphereGeo = new THREE.SphereGeometry( 1230, 24, 18);
	var sphereMat = new THREE.MeshBasicMaterial({wireframe: true, color: 0xffffff});
	sphere = new THREE.Mesh(sphereGeo, sphereMat);
	scene.add(sphere);
}







// divided down all bookmarks into groups for camera track and show < 2D Array
function groupFrame(nodesArray, pathLength) {
	var nodeGroups = [];
	var offset = 200;
	var lengthIntervals = Math.round(pathLength/offset);
	var nodeIntervals = Math.floor(nodesArray.length/lengthIntervals);
	var indexArray = [];


	for (var i=0, j=0; i<nodesArray.length; i+=nodeIntervals, j++) {	
		nodeGroups[j] = [];
		for (var q =0; q<nodeIntervals; q++) {
			indexArray.push(i+q);
			// console.log(j + "; " + q + "; " + (i+q));
			nodeGroups[j][q] = nodesArray[i+q];
		}	
	}
	for (var i =0; i<nodesArray.length; i++) {
		nodesArray[i].indexID = indexArray[i];
	}
	return nodeGroups;
}

	

Array.prototype.delete = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};



