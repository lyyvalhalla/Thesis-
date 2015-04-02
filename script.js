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
var mouse;



// d3.js to process data
d3.json("jsonbm.json", function(error, treeData) {
	var site, folder;
	root = treeData.roots.bookmark_bar;
	

	update(root);

	
	init();
	animate();
	

	// calll stages here:
	scene2.add(new setupSearchBox(0, 0, 0));
	scene.add(Flipping_Wall);
	
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

	// display TIME of the bookmarks
	console.log(getTime(nodes[88].date_added));
	console.log(nodes[88].name);


	// parent, children, value, depth

	// console.log(returnDate(nodes[88].date_added));

	// var xx = returnDate(folders[4].date_added);

	// console.log(nodes[88]);
	// console.log(xx);

	
	
	// scene2.add(new showFrame(sites[30], 0, 100, -300));
	// scene2.add(new showFrame(sites[0], 500, 0, -1000));
	// scene2.add(new showFrame(sites[52], 700, -50, 0));	
	
}




function init() {


	var container = document.createElement('div');
	document.body.appendChild( container);

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 500 );

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

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

}



function animate() {

	requestAnimationFrame( animate );

	rendering();


	// first stage ---- start
	// composer.render();
}

function rendering() {

	camera.updateMatrixWorld();

	renderer.render( scene, camera );
	renderer2.render( scene2, camera );

}










