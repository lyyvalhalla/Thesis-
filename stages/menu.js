var pathMenu, menu;
var menuNodes = [];
var menuNode, nodeIco, nodeTitle;


function initMenu() {

	pathMenu = document.createElement('div');
	pathMenu.id = "cssMenu";
	menu = new THREE.CSS3DObject(pathMenu);
	menu.position.set(0, 0, 0);
	

	createMenuNodes(folders);

	scene2.add(menu);

	
}





var addClick = [];

function createMenuNodes(folders) {
	// console.log(folders);
	folders.forEach(function(d){
		menuNode = document.createElement('div');
		menuNode.className = "menuNode";
		pathMenu.appendChild(menuNode);
		menuNodes.push(menuNode);

		nodeIco = document.createElement('div');
		nodeIco.className = "nodeIco";
		nodeIco.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		menuNode.appendChild(nodeIco);

		nodeTitle = document.createElement('div');
		nodeTitle.className = "nodeTitle";
		nodeTitle.textContent = d.title;
		menuNode.appendChild(nodeTitle);


	})
	menuNodes[0].id = "default-node";
	

	// closure inside loop
	for (var i=0; i<menuNodes.length; i++) {
		addClick[i] = (function(index){
			return function() {
				menuNodes[index].addEventListener("click", function(event) {updateMenu(index);}, false);
			};
    	}(i));
	}

	for (var j = 0; j < menuNodes.length; j++) {
		addClick[j]();
	}

}



// call in addEventListener("click")
function updateMenu(i) {
	
	//toggle children on click
	// console.log(folders[index].children);
	if(folders[i].children) {
		folders[i]._children = folders[i].children;
		folders[i].children = null;
	} else {
		folders[i].children = folders[i]._children;
		folders[i]._children = null;
	}
	console.log(folders[i].children);
	var tempDepth = folders[i].depth + 1;
	
	for (var j=0; j<folders.length; j++) {
		if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth && folders[i].children === null) {
			menuNodes[j].style.display = 'block';
		} else if (folders[j].parentId === folders[i].id && folders[j].depth === tempDepth) {
			menuNodes[j].style.display = 'none';
		}
	}
	menuNodes[i].style.display = 'block';
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