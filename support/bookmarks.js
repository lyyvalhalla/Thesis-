

var showFrame = function (site, x, y, z) {

	var dom = document.createElement('div');
	var object = new THREE.CSS3DObject(dom);
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;



	var webpage = document.createElement('iframe');
	webpage.src = site.url;
	webpage.className = "frame";
	dom.appendChild(webpage);


	return object;
}



var setupSearchBox = function (x, y, z) {

	var box = document.createElement('div');
	var searchBox = new THREE.CSS3DObject(box);

	searchBox.position.x = x;
	searchBox.position.y = y;
	searchBox.position.z = z;

	var searchInput = document.createElement('input');
	searchInput.id = "startType";
	searchInput.type = "search";
	// searchInput.type = "text";	
	box.appendChild(searchInput);


	return searchBox;

	
}


var returnDate = function getTime(epoch) {
	var oldDate = epoch/10000;
	var date = new Date(oldDate);
	return date;

	console.log(date);
}

 









