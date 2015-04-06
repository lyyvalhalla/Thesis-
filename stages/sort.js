var colorArray = [0xAA8439, 0xAA9739, 0x887CAF, 0xFFE3AA, 0x2E4272, 0xD4B16A, 0x805C15, 0x553900, 0xFFF0AA, 0xD4C26A, 0x806D15, 0x554600, 0x403075, 0x615192, 0x261758, 0x13073A, 0x2E4272, 0x7887AB, 0x4F628E, 0x162955, 0x061539];

var colorA = [0xAA8439, 0xFFE3AA];

// by time
/*
1. position of the particles changing with TIME
	-- mapping date_added to a range of Z values
2. show time/date
*/

function sortTime(nodes) {

	nodes.sort(function(a,b) {
		// renturn b.date_added < a.date_added ? 1 : -1;	
		// console.log(b.date_added);
	}) 
	// console.log(nodes);
}



var sortZ = function( date_added) {

}



var dates =[];
var zTime =[];

//nodes = tree.nodes(root);


// by category >>> big folders only
/*
go through root children (array[x]), for each children array, create particles in the same color
*/

function sortCategory(source) {

	
	var childCategory, childNodes;
	for(var i=0; i<source.children.length; i++) {
		childCategory = source.children[i];
		childNodes = tree.nodes(childCategory);
	
		childNodes.forEach(function(d){
			// console.log(d);
			boxGeo = new THREE.BoxGeometry(50, 50, 50);
			boxMat = new THREE.MeshBasicMaterial({color: colorArray[i]});
			nodeBox = new THREE.Mesh(boxGeo, boxMat);

			dates.push(d.date_added);

			// map date_added to z: 100 ~ -blah
			zTime = dates.map(function(double){
				double = Math.floor((d.date_added/1000000)/86400);
				return double;
			})
			
			
			d.particle = nodeBox;
			d.particle.position.x = 2000 * i/10 - 1000;
			d.particle.position.y = 2000 * Math.random() - 1000;
			d.particle.position.z = 2000 * Math.random() - 1000;
			scene.add(d.particle);
			
		});		
	}
	console.log(zTime);
}






// sort(a, b) {
// 	return b.date_added < a.date_added ? 1 : -1;
// }


// category = tree.nodes(root.children[0]);
// console.log(category);