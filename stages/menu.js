var pathMenu, menu;


function initMenu() {

	pathMenu = document.createElement('div');
	pathMenu.id = "cssMenu";
	menu = new THREE.CSS3DObject(pathMenu);
	menu.position.set(0, 0, 0);
	

	createMenuNodes(folders);

	scene2.add(menu);
	console.log(scene2.children);
}







function createMenuNodes(folders) {

	for (var i=0; i<folders.length; i++) {
		
	}
	folders.forEach(function(d){
		var menuNode = document.createElement('div');
		menuNode.className = "menuNode";
		menuNode.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		pathMenu.appendChild(menuNode);
	})
	 
}


// call in addEventListener("click")
function updateMenu(nodeBeingClicked) {

}






function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  // root.children.forEach(collapse);




 // Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }

  // redraw here: 
  // update(d);
}










/*
1. get all folders, run through them if (children), click to get children

2. attach design geometries to them




menu.child.click(clickedfolder) {

	//	css layer
	showChildrenInMenu();
	// webGL layer
	addCurrentNodesToPath();
}


*/

/*
menu.element.onclick = function(){
	
}
*/