/*progress bar on the PATH page */

function initProgress() {

	var progress= document.getElementById( "progress" );
	var bar = document.getElementById("bar");
	var barHolder = document.getElementById("bar-holder");
	bar.style.width = "1%";
	
	var divPos ;
	var offset = $(barHolder).offset();
	$(bar).mousemove(function(e){
		divPos = e.pageX - offset.left;
		var tempWidth = mapRange(divPos, 80, 1120, 6, 80) + "%";
		bar.style.width = tempWidth;
	});


	$(barHolder).mousemove(function(e) {
		divPos = e.pageX - offset.left;
		var tempWidth = mapRange(divPos, 80, 1120, 6, 80) + "%";
		console.log(tempWidth + "; " + divPos);
		bar.style.width = tempWidth;
	});





}







function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}