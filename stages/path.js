var pathLength;


/*

create a polyline path,



*/


// create an array of vectors based on folder numbers
function createVectors() {
	

	var today = new Date();

}




function createPath() {
	camera.position.set(0, 0, 100);


	// compute length
	getTempTime(nodes);

	console.log(nodes[55]);

	var material = new THREE.MeshBasicMaterial({
		color:0x2E2E2E, 
	});
	var geometry = new THREE.BoxGeometry(100, 100, 1000);

	var box = new THREE.Mesh(geometry, material);
	box.position.y = -300;
	box.position.z = -500;
	// console.log(box.position.x + ";" + box.position.y + ";" + box.position.z);
	// console.log(camera.position);
	// scene.add(box);


	var xLine, zLine = -200;




	var material = new THREE.LineBasicMaterial({
        color: 0x2E2E2E,
        linewidth: 100,
        fog: true
    });
	var geometry = new THREE.Geometry();

	geometry.vertices.push(new THREE.Vector3(0, -200, zLine));
    geometry.vertices.push(new THREE.Vector3(500, -200, zLine-600));
    geometry.vertices.push(new THREE.Vector3(0, -200, zLine-1600));
    geometry.vertices.push(new THREE.Vector3(-500, -200, zLine-2000));
    geometry.vertices.push(new THREE.Vector3(0, -200, zLine -5000));
    geometry.vertices.push(new THREE.Vector3(300, -200, zLine-7000));
    geometry.vertices.push(new THREE.Vector3(0, -200, zLine-pathLength));


    var line = new THREE.Line(geometry, material);
   

    scene.add(line);
    scene.fog = new THREE.Fog( 0xA9E2F3, 500, 10000);

}



function addPathNodes(nodes) {



	for (var i =0; i<nodes.length; i++) {
		var geometry =  new THREE.BoxGeometry(5, 5, 5);
		var material =  new THREE.MeshLambertMaterial({color: 0xff0000});  // sortCategory() here 
		var pathNode = new THREE.Mesh(geometry, material);

		pathNode.position.x = 0;
		pathNode.position.y = -200;
		pathNode.position.z = -nodes[i].zPos -100;
		scene.add(pathNode);
		console.log(pathNode.position.z);
	}

	// z positions depend on tempdays to today (within "totalDays")

	/*
	
	
	xx.position.z = tempDays * 10;

	*/


}


function cameraTransit() {

}



