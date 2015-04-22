// declare data
var root;
var nodes, links;
var tree = d3.layout.tree();
var sites =[], folders=[];


// declare 3D
var container, stats;
var camera, scene, renderer;
var scene2, renderer2;
var controls;
var splineCamera;


// controls
var controlsEnabled = true;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var cameraStep = 0;


var raycaster;
var mouse = new THREE.Vector2(), offset = new THREE.Vector3();
var INTERSECTED, SELECTED;


// d3 
function update(source) {
	nodes = tree.nodes(source);
	links = tree.links(nodes);

	
	var max = new Date(); 
	var maxDate = dateFormat(max, "fullDate");

	// add formatted date attribute "time" to the nodes array
	for (var i=0; i<nodes.length; i++) {
		nodes[i].time = getTime(nodes[i].dateAdded);
		var convertedDate = new Date(nodes[i].dateAdded);

		if (nodes[i].url == null) {
			folders.push(nodes[i]);
		}
	}

	var firstDay, totalDays;
	// ************* get total days >>> total length of path *************
	firstDay = getMinTime(nodes).dateAdded;
	totalDays = Math.ceil((today.getTime()-firstDay)/(one_day));
	
	
	pathLength = totalDays * 50;
	
	// ***************** draw bookmarks particles ***************** 
	// generateNode(nodes);

	// sortTime(nodes);
	// sortCategory(root)


	//  ***************** compute fact sheets here *****************



	// ************* path menu ******************	
	// initMenu();
}





function init() {


	var container = document.createElement('div');
	document.body.appendChild( container);

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 500 );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 1000 );
	splineCamera.position.set( 0, 0, 300 );
	scene.add( splineCamera );

	// drawings here
	update(root);

	//  *****************  PATH parts ***************** 
	createPath();
	// addPathNodes(nodes);




	controls = new THREE.PointerLockControls( splineCamera );
	scene.add( controls.getObject() );

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				if ( canJump === true ) velocity.y += 350;
				canJump = false;
				break;

		}
	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}
	};
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );



	raycaster = new THREE.Raycaster();

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	renderer2 = new THREE.CSS3DRenderer();
	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	container.appendChild( renderer2.domElement );


	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'mousemove', onDocumentMouseMove, false );



	// *****************  start stages***************** 
	// startStage();


	// ***************** call stages here:***************** 
	
	// scene2.add(new setupSearchBox(0, 0, 0));
	// scene.add(Flipping_Wall);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
	

}



function animate() {

	requestAnimationFrame( animate );

	if ( controlsEnabled ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( scene.children );

		var isOnObject = intersections.length > 0;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		if ( moveForward ) {
			// velocity.z -= 2400.0 * delta;
			cameraStep = cameraStep + 0.0001;
			
		}
		if ( moveBackward ) {
			// velocity.z += 1000.0 * delta;
			cameraStep = cameraStep - 0.001;
		}

		if ( moveLeft ) velocity.x -= 400.0 * delta;
		if ( moveRight ) velocity.x += 400.0 * delta;

		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );

			canJump = true;
		}

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );


		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

			canJump = true;

		}

		prevTime = time;

	}


	rendering();


	// *****************  first stage ---- start *****************  (not using)
	//composer.render();
}

function rendering() {



	camera.updateMatrixWorld();

	//  ***************** function to edit/remove nodes/json objects ***************** 
	// moveNode();
	pathRender();
	
	// ***************** path move interaction here *****************
	// updateFrame(pathNodes, pathArray);



	renderer.render( scene, splineCamera );
	renderer2.render( scene2, splineCamera );

}










