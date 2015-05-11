// declare data
var root;
var nodes, links;
var tree = d3.layout.tree();
var sites =[], folders=[];
var firstDay, totalDays;

// declare 3D
var container, stats;
var camera, scene, renderer, light;
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
var delta;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), offset = new THREE.Vector3();
var INTERSECTED, SELECTED;
var intersects, intersected;


var composer;


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
	// var getLast = getLatest(nodes);
	// console.log(getLast);

	totalDays = Math.ceil((today.getTime()-firstDay)/(one_day));
	// console.log(new Date(firstDay) + "; " + totalDays);
	
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
	isReverse = Math.random() >= 0.5;

	/*  init progress bar */
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 500 );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 1000 );
	splineCamera.position.set( 0, 1000, -200 );

	light = new THREE.AmbientLight(0x536DFE);
	var dirLight = new THREE.DirectionalLight(0xFFA000);
	dirLight.position.set(1, 1, 1);
	dirLight2 = new THREE.DirectionalLight(0x607D8B);
    dirLight2.position.set( -1, -1, -1 );
	scene.add(light);
	scene.add(dirLight);
	scene.add(dirLight2);
	// drawings here
	// update(root);

	/*****************  PATH parts *****************/
	// createPath();
	/*have called it in menuInit(), enable it when test only on path*/
	// addPathNodes(nodes);  


	controls = new THREE.PointerLockControls( splineCamera );

	/********************************************************************/
	/**********   delete in Menu mode, add in Path mode **********/
	/********************************************************************/
	// scene.add( controls.getObject() );



	// *****************  start stages***************** 
	// startStage();

	// initProgress();

	// ***************** call stages here:***************** 
	//startstage
	scene2.add(new setupSearchBox(0, 0, 0));
	scene.add(Flipping_Wall);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	// renderer.setClearColor( 0xFFECB3);
	renderer.setClearColor( 0x222222);
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	renderer2 = new THREE.CSS3DRenderer();
	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	container.appendChild( renderer2.domElement );


	// postprocessing


	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, splineCamera ) );

	var effect = new THREE.ShaderPass( THREE.DotScreenShader );
	effect.uniforms[ 'scale' ].value = 4;
	composer.addPass( effect );

	var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
	effect.uniforms[ 'amount' ].value = 0.0015;
	effect.renderToScreen = true;
	composer.addPass( effect );







	window.addEventListener( 'resize', onWindowResize, false );
	
	window.addEventListener( 'mousewheel', mousewheel, false );
	window.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox
	// window.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	splineCamera.updateProjectionMatrix();
	splineCamera.aspect = window.innerWidth / window.innerHeight;

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


	new TWEEN.Tween( tubeMesh.rotation ).to( {  
		x: mouse.x/500,
		y: mouse.y/500,
		
		}, 2000 ).easing(TWEEN.Easing.Quintic.Out).start();


	for (var i = 0; i<convexArray.length; i++) {
		new TWEEN.Tween(titleObjects[i].rotation).to({
			x: mouse.x/10,
			y: mouse.y/10,
			
		}, 1000).easing(TWEEN.Easing.Quintic.Out).start();
	}


	// menu part
	for (var i =0; i<folders.length; i++) {
		if (intersects.length > 0 && intersects[0].object === folders[i].convex && folders[i].convex.visible === true) {
			addGo(folders[i]);
			intersects[0].object.material = new THREE.MeshLambertMaterial({color: 0x000000});
		} else {
			folders[i].convex.material = new THREE.MeshLambertMaterial({color: 0xffffff});
		}

	} 
	
}



function mousewheel( event ) {

	if ( this.enabled === false ) return;

	event.preventDefault();
	event.stopPropagation();
	
	delta = 0;
	if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
		delta = event.wheelDelta / 800000;
	} else if (event.detail) { // Firefox
		delta = - event.detail / 300000;
	}	
	cameraStep = cameraStep + delta;
}




function animate() {

	requestAnimationFrame( animate );
	render();
	// *****************  first stage ---- start *****************  (not using)
	// composer.render();
}

function render() {
	TWEEN.update();
	camera.updateMatrixWorld();
	splineCamera.updateMatrixWorld();
	raycaster.setFromCamera( mouse, splineCamera );

	intersects = raycaster.intersectObjects(convexArray);
	intersected = intersects[ 0 ];
	
	

	if (isOk) {
		pathRender();
	}


	//updateFrame(pathNodes, pathArray);


	/*some updates*/


	for (var i = 0; i<convexArray.length; i++) {
	
			convexArray[i].rotation.x  += Math.random()/100;
			convexArray[i].rotation.y  += Math.random()/100;
			convexArray[i].rotation.z  += Math.random()/100;
	}
	
	renderer.render( scene, camera );
	// renderer.render(scene, splineCamera);
	// renderer2.render( scene2, splineCamera );
	renderer2.render( scene2, camera );

}










