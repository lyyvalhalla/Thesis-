var pathLengt;

var splineCamera;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();

var path = new THREE.Object3D();
var pathNodes = [];
var pathArray=[];
var tempFrame=[];
var tube, tubeMesh;
var tubePos = [];



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
		vertexX = getRandomInt(-1000, 1000);
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
	
	splineCamera.matrix.lookAt(splineCamera.position, lookAt, normal);
	// splineCamera.rotation.setFromRotationMatrix( splineCamera.matrix, splineCamera.rotation.order );	

	// console.log(splineCamera.position);
}




function addPathNodes(nodes) {

	// get bookmarks (node folders)
	pathNodes = getPathSites(nodes);
	var pathNode;
	

	for (var i =0; i<pathNodes.length; i++) {


		var position = tube.parameters.path.getPointAt(pathNodes[i].zPos/10000);
		tubePos.push(position);
		var geometry =  new THREE.BoxGeometry(10, 10, 10);
		var material =  new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});  // sortCategory() here 
		pathNode = new THREE.Mesh(geometry, material);
		pathArray.push(pathNode);
		pathNode.position.x = getRandomInt(position.x-200, position.x+200) ;
		pathNode.position.y = position.y + 25;
		pathNode.position.z = position.z;
		scene.add(pathNode);

		
	}
	
	var pathFrame = new showFrame(pathNodes[311], tubePos[311].x+500, tubePos[311].y-300, tubePos[311].z);

	// scene2.add(pathFrame);
	pathArray[311].material.wireframe = false;
	
	console.log(pathNodes.length);
	groupFrame();
}



var nodeGroups =[];

function groupFrame() {
	var offset = 100;
	var lengthIntervals = Math.round(pathLength/offset);
	
	var nodeIntervals = Math.round(pathNodes.length/lengthIntervals);

	for (var i=0, j=0; i<pathNodes.length; i+=nodeIntervals, j++) {
		// console.log(i + "; " + j);
		nodeGroups[j] = [];
		for (var q =0; q<nodeIntervals; q++) {

			// change pathNodes >>> sorted Nodes by z index
			nodeGroups[j][q] = pathNodes[i+q];
			console.log(j + "; " + q + "; " + (i+q));
		}

	}
	

}










function pathFrame(nodes, tubePos) {
	
	
	
	var pathFrame;

	for(var i=0; i<pathArray.length; i++) {
		if ( (pathArray[i].position.z - splineCamera.position.z) > -50 ) {


			// pathFrame = new showFrame(nodes[i], tubePos[i], tubePos[i].x, tubePos[i].y, tubePos[i].z);

			// if ($.inArray(pathFra=[]e, tempFrame) === -1) {
			// 	tempFrame.push(pathFrame);
			// 	console.log("not in array");
			// } else {
			// 	console.log("in array");
			// }

			console.log("wang");
			


			// scene2.add(pathFrame);
			// tempFrame.push(pathFrame);
			
		}
	}

	
	// delete 
	for (var i=0; i<tempFrame.length; i++) {
		if( (tempFrame[i].position.z - splineCamera.position.z)  < 50 ) {
			// scene2.remove(tempFrame[i]);
		}
	}
	
}


function updateFrame(){


 }


function cameraTransit() {

}



