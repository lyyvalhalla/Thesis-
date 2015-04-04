var particles = [];
var boxGeo, boxMat, nodeBox, boxColor = 0x87A4C1;
var particleObjects;

var Bookmark_Nodes = new THREE.Object3D();
Bookmark_Nodes.name = "bm_particles";
//generateLight(Bookmark_Nodes);
generateLight(Bookmark_Nodes);


function generateNode(nodes) {
	var parent;
	var x, y, z;
	


	nodes.forEach(function(d) {
		// console.log("depth:" + d.depth + "; parent:" + d.parent + "; children:" + d.children);
		// console.log("date_added: " + d.date_added + "; name: " + d.name);
		boxGeo = new THREE.BoxGeometry(50, 50, 50);
		boxMat = new THREE.MeshLambertMaterial({color: boxColor});
		nodeBox = new THREE.Mesh(boxGeo, boxMat);
		d.particle = nodeBox;
		d.particle.position.x = 2000 * Math.random() - 1000;
		d.particle.position.y = 2000 * Math.random() - 1000;
		d.particle.position.z = 2000 * Math.random() - 1000;
		scene.add(d.particle);
		// Bookmark_Nodes.add(d.particle);
		particles.push(d.particle);

	})

	
	// scene.add(Bookmark_Nodes);
	console.log(Bookmark_Nodes);

	for (var i =0; i<scene.children.length; i++) {
		if(scene.children[i].name == "bm_particles") {
			particleObjects = scene.children[i];
		}
	}

	
}



// light to be modified
function generateLight(object) {
	var light;

	light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 1, 1 ).normalize();
	
	// object.add(light);
}



function moveNode() {
	// console.log(Bookmark_Nodes.children);

	// var intersects = raycaster.intersectObjects(Bookmark_Nodes.children);
	var intersects = raycaster.intersectObjects(scene.children);

	if(intersects.length > 0) {
		
		if(INTERSECTED != intersects[0].object) {
			if (INTERSECTED)  {
				INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			}

			INTERSECTED = intersects[0].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000);

			// check & remove 
			for(var i=0; i<nodes.length; i++) {
				if (nodes[i].particle == INTERSECTED) {
					console.log(nodes[i].particle.uuid);
					// console.log(scene.children[i].uuid);
					scene.remove(nodes[i].particle);

					// THREE.SceneUtils.detach(Bookmark_Nodes.children[i], Bookmark_Nodes, scene);
				}
			}


			// console.log("intersected: " + INTERSECTED);
		} else {

			if(INTERSECTED)  {
				INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			}
			
			INTERSECTED = null;
		}
	}
}


Array.prototype.removeValue = function(uuid, value) {
	var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
	  });
   	this.length = 0; //clear original array
   	this.push.apply(this, array); //push all elements except the one we want to delete

}

	







function generateParticle() {

}