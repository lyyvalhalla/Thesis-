// declare data
var root;
var nodes, links;
var tree = d3.layout.tree();
var sites =[], folders=[];
var firstDay, totalDays;

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

	
	// ************* get total days >>> total length of path *************
	firstDay = getMinTime(nodes).dateAdded;
	totalDays = Math.ceil((today.getTime()-firstDay)/(one_day));
	console.log(new Date(firstDay) + "; " + totalDays);
	
	pathLength = totalDays * 50;
	
	// ***************** draw bookmarks particles ***************** 
	// generateNode(nodes);
	// sortTime(nodes);
	// sortCategory(root)


	//  ***************** compute fact sheets here *****************



	/************* path menu ******************/
	// initMenu();
}





function init() {


	// var container = document.createElement('div');
	container = document.getElementById('container');
	// document.body.appendChild( container);


	/*  init progress bar */
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 500 );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 1000 );
	splineCamera.position.set( 0, 0, 300 );
	scene.add( splineCamera );

	// drawings here
	update(root);

	/*****************  PATH parts *****************/
	createPath();
	/*have called it in menuInit(), enable it when test only on path*/
	addPathNodes(nodes);  


	controls = new THREE.PointerLockControls( splineCamera );
	scene.add( controls.getObject() );


	// *****************  start stages***************** 
	// startStage();

	            initProgress();

	// ***************** call stages here:***************** 
	
	// scene2.add(new setupSearchBox(0, 0, 0));
	// scene.add(Flipping_Wall);
	raycaster = new THREE.Raycaster();

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( 0x333333 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	renderer2 = new THREE.CSS3DRenderer();
	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	container.appendChild( renderer2.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
	// window.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousewheel', mousewheel, false );
	document.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox
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

var delta;

function mousewheel( event ) {

	if ( this.enabled === false ) return;

	event.preventDefault();
	event.stopPropagation();
	
	delta = 0;
	if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
		delta = event.wheelDelta / 8000000;
	} else if (event.detail) { // Firefox
		delta = - event.detail / 300000;
	}	
	cameraStep = cameraStep + delta;
}






function animate() {

	requestAnimationFrame( animate );

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

	updateFrame(pathNodes, pathArray);

	renderer.render( scene, splineCamera );
	renderer2.render( scene2, splineCamera );

}










