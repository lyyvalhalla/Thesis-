var composer;

var keyTrigger = false;
var PI = Math.PI;
var cube_size = 230, grid = 6, total_cubes = (grid * grid);
var wall_size = (grid * cube_size), half_wall_size = (wall_size / 2);
var main_color = 0x3d738b, secondary_color = 0x333333;
var cubes = [];

var searchInput;
var allowEx;


var Flipping_Wall = new THREE.Object3D();

setupBox(Flipping_Wall);
setupWall(Flipping_Wall);
setupLights(Flipping_Wall);
setupCubes(Flipping_Wall);




function setupBox(object) {
	var i, boxesArray = [], geometry, material;

	geometry = new THREE.BoxGeometry(wall_size, wall_size, 0.05);
	geometry.faces[8].color.setHex(secondary_color);
	geometry.faces[9].color.setHex(secondary_color);
	geometry.colorsNeedUpdate = true;
	material = new THREE.MeshBasicMaterial({
        color : main_color,
        vertexColors : THREE.FaceColors
    });

    for (var i =0; i<5; i++) {
    	boxesArray.push(new THREE.Mesh(geometry, material));
    }

    // back
    boxesArray[0].position.set(0, half_wall_size, -half_wall_size)
    boxesArray[0].rotation.x = 90 * (PI/180)

    // right
    boxesArray[1].position.set(half_wall_size, 0, -half_wall_size)
    boxesArray[1].rotation.y = -90 * (PI/180)

    // front
    boxesArray[2].position.set(0, -half_wall_size, -half_wall_size)
    boxesArray[2].rotation.x = -90 * (PI/180)

    // left
    boxesArray[3].position.set(-half_wall_size, 0, -half_wall_size)
    boxesArray[3].rotation.y = 90 * (PI/180)

    // bottom
    boxesArray[4].position.set(0, 0, -wall_size);

    boxesArray.forEach(function(box) {
    	object.add(box);
    });


}

function setupWall(object) {
	var i, tilesArray =[], geometry, material;

	var geometry = new THREE.PlaneBufferGeometry(wall_size, wall_size);
	var material = new THREE.MeshLambertMaterial({
		color: main_color
	});

	for (var i =0; i<8; i++) {
		tilesArray.push(new THREE.Mesh(geometry, material));
	}

	tilesArray[0].position.set(-wall_size, wall_size, 0);
    tilesArray[1].position.set(0, wall_size, 0);
    tilesArray[2].position.set(wall_size, wall_size, 0);
    tilesArray[3].position.set(-wall_size, 0, 0);
    tilesArray[4].position.set(wall_size, 0, 0);
    tilesArray[5].position.set(-wall_size, -wall_size, 0);
    tilesArray[6].position.set(0, -wall_size, 0);
    tilesArray[7].position.set(wall_size, -wall_size, 0);

    tilesArray.forEach(function(tile) {
        tile.receiveShadow = true;
        object.add(tile);
    })
}
var i, geometry, material, x, y, row, col, minDuration, maxDuration, minDelay, maxDelay, attrOptions, attr, direction, config;


// tweenMax here:
function setupCubes(object) {
	// var i, geometry, material, x, y, row, col, minDuration, maxDuration, minDelay, maxDelay, attrOptions, attr, direction, config;

	geometry = new THREE.BoxGeometry(cube_size, cube_size, 10);
	material = new THREE.MeshLambertMaterial({color: main_color});
	x = 0;
    y = 0;
    row = 0;
    col = 0;
    minDuration = 3;
    maxDuration = 6;
    minDelay = 0;
    maxDelay = 1;
    attrOptions = ['x', 'y'];

    for (var i=0; i<total_cubes; i++) {
    	cubes.push(new THREE.Mesh(geometry, material));

    	if((i % grid) == 0) {
    		col = 1;
    		row ++;
    	} else {
    		col ++;
    	}

    	x = -(((grid * cube_size) / 2) - ((cube_size) * col) + (cube_size/2));
        y = -(((grid * cube_size) / 2) - ((cube_size) * row) + (cube_size/2));

        cubes[i].position.set(x, y, 0);
    }

    // document.onkeypress = function() {
    	
    // } 


	cubes.forEach(function(cube) {
		cube.castShadow = true;
        cube.receiveShadow = true;
		object.add(cube);
	});



	var counter = 0;
	
    // ****************** temp commented >> uncomment when doing the transitions******************
    console.log($('startType'));
 	$('startType').keypress(function(cube) {
         console.log("woof");
 		keyTrigger = true;
 		// console.log(counter + "; " + "keypressed");

 		config = {
            ease : Elastic.easeOut,
            delay : Utils.randomInRange(minDelay, maxDelay),
            repeat : -1
        };
        attr = attrOptions[~~(Math.random() * attrOptions.length)];
        direction = (Math.random() < 0.5 ? -PI : PI);
        config[attr] = direction;

        // for (var i=0; i<cubes.length; i++) {
        //         TweenMax.to(
                
        //         cubes[i].rotation,
        //         Utils.randomInRange(minDuration, maxDuration),
        //         config
        //     );
        // }
            cubes.forEach(function(cube) {
                TweenMax.to(
                
                    cube.rotation,
                    Utils.randomInRange(minDuration, maxDuration),
                    config
                
                 );
            }
        );

 	});
    
    
 	
}


function setupLights(object){
	var light, soft_light;

    light = new THREE.DirectionalLight(main_color, 1.25);
    soft_light = new THREE.DirectionalLight(main_color, 1.5);

    light.position.set(-wall_size, -wall_size, cube_size * grid);
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    
    soft_light.position.set(wall_size, wall_size, cube_size * grid);

    object.add(light).add(soft_light);

}




function startStage() {

	composer = new THREE.EffectComposer( renderer);
	composer.addPass( new THREE.RenderPass( scene, camera ) );

	var effect = new THREE.ShaderPass( THREE.DotScreenShader );
	effect.uniforms[ 'scale' ].value = 3;
	composer.addPass( effect );

	var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
	effect.uniforms[ 'amount' ].value = 0.0015;
	effect.renderToScreen = true;
	composer.addPass( effect );
}




var setupSearchBox = function (x, y, z) {

    var box = document.createElement('div');
    var searchBox = new THREE.CSS3DObject(box);

    searchBox.position.x = x;
    searchBox.position.y = y;
    searchBox.position.z = z;

    searchInput = document.getElementById("startType");
    // searchInput.id = "startType";
    searchInput.type = "text";
    searchInput.style.display ="block";
    searchInput.value = "Guess how many bookmarks you have? type a number..."  
    box.appendChild(searchInput);

    $(searchInput).focus(function() {
        searchInput.value = "";

        setTimeout(function(){
            setAllow();
            allowEx.style.opacity = "1";

        }, 1000);
    });

     $(searchInput).focusout(function() {

     });


    $(searchInput).keypress(function(cube) {
        console.log("woof");
        keyTrigger = true;
        // console.log(counter + "; " + "keypressed");

        config = {
            ease : Elastic.easeOut,
            delay : Utils.randomInRange(minDelay, maxDelay),
            repeat : -1
        };
        attr = attrOptions[~~(Math.random() * attrOptions.length)];
        direction = (Math.random() < 0.5 ? -PI : PI);
        config[attr] = direction;

    // for (var i=0; i<cubes.length; i++) {
    //         TweenMax.to(
            
    //         cubes[i].rotation,
    //         Utils.randomInRange(minDuration, maxDuration),
    //         config
    //     );
    // }
        cubes.forEach(function(cube) {
            TweenMax.to(
            
                cube.rotation,
                Utils.randomInRange(minDuration, maxDuration),
                config
            
             );
        }
    );

});


    return searchBox;
    
    
}



function setAllow() {
    allowEx = document.getElementById("startAllow");
    allowEx.textContent = "Press enter to find the right answer."
}












Utils = {
    randomInRange : function(min, max) {
        return Math.floor(Math.random() * (max- min + 1)) + min;
    }
}






