var pathLengt;

var splineCamera;
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();

var path = new THREE.Object3D();
var tube, tubeMesh;



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
	console.log(arrayX);
	console.log(arrayZ);
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
	var offset = 15;
	normal.copy( binormal ).cross( dir );
	pos.add( normal.clone().multiplyScalar( offset ) );

	splineCamera.position.copy( new THREE.Vector3(pos.x, (pos.y+30), pos.z) );

	// Using arclength for stablization in look ahead.
	var lookAt = tube.parameters.path.getPointAt( ( cameraStep + 30 / tube.parameters.path.getLength() ) % 1 );

	// Camera Orientation 2 - up orientation via normal
	
	splineCamera.matrix.lookAt(splineCamera.position, lookAt, normal);
	splineCamera.rotation.setFromRotationMatrix( splineCamera.matrix, splineCamera.rotation.order );	

	console.log(splineCamera.position);
}












function addPathNodes(nodes) {

	// var position = function(node) {
	// 	return tube.parameters.path.getPointAt(nodes.zPos);

	// }
	for (var i =0; i<100; i++) {
		// console.log(tube.parameters.path.getPointAt(i));
	}
	

	for (var i =0; i<nodes.length; i++) {


		// position(nodes[i]);
		// console.log(nodes[i].zPos/1000);
		

		var position = tube.parameters.path.getPointAt(nodes[i].zPos/10000);

		var geometry =  new THREE.BoxGeometry(10, 10, 10);
		var material =  new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true});  // sortCategory() here 
		var pathNode = new THREE.Mesh(geometry, material);

		pathNode.position.x = getRandomInt(position.x-200, position.x+200) ;
		pathNode.position.y = position.y + 25;
		pathNode.position.z = position.z;
		scene.add(pathNode);
		
		
	}
}





function cameraTransit() {

}



