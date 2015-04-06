// declare data
var root;
var nodes, links;
var tree = d3.layout.tree();
var sites =[], folders=[];


// declare 3D
var container, stats;
var camera, scene, renderer;
var scene2, renderer2;


var raycaster;
var mouse = new THREE.Vector2(), offset = new THREE.Vector3();
var INTERSECTED, SELECTED;



// d3.js to process data
d3.json("jsonbm.json", function(error, treeData) {
	var site, folder;
	root = treeData.roots.bookmark_bar;
	

	

	init();
	animate();
	

	

	// current function
	


	// calll stages here:
	/*
	scene2.add(new setupSearchBox(0, 0, 0));
	scene.add(Flipping_Wall);
	/*


	// archive parts
	/*
	scene2.add(new showFrame(sites[30], 0, 100, -300));
	scene2.add(new showFrame(sites[0], 500, 0, -1000));
	scene2.add(new showFrame(sites[52], 700, -50, 0));	
	*/
});




// d3 
function update(source) {
	nodes = tree.nodes(root);
	links = tree.links(nodes);

	


	for (var i=0; i<nodes.length; i++) {
		if(nodes[i].url) {
			site = nodes[i];
			sites.push(site);
			
	} else {
			folder = nodes[i];
			folders.push(folder);
			
		}
	}

	// draw bookmarks particles
	// generateNode(nodes);

	sortTime(nodes);
	sortCategory(root)
	
}





function init() {


	var container = document.createElement('div');
	document.body.appendChild( container);

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 500 );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	// drawings here
	update(root);






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

	// startStage();


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
	// moveNode();
}



function animate() {

	requestAnimationFrame( animate );

	rendering();


	// first stage ---- start
	// composer.render();
}

function rendering() {



	camera.updateMatrixWorld();

	// function to edit/remove nodes/json objects
	// moveNode();


	renderer.render( scene, camera );
	renderer2.render( scene2, camera );

}










