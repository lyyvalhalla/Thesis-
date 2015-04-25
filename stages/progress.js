/*progress bar on the PATH page */
var bar;
function initProgress() {

	var progress= document.getElementById( "progress" );
	var barHolder = document.getElementById("bar-holder");
	bar = document.getElementById("bar");
	bar.style.width = "1%";

	var barTime = document.getElementById("bar-time");
	barTime.innerHTML  = "today";


	var divPos, dePos ;
	var offset = $(barHolder).offset();
	var ofs = $(progress).offset();

	$(bar).mousemove(function(e){
		divPos = e.pageX - offset.left;
		
		var tempWidth = mapRange(divPos, 80, 1120, 6, 80) + "%";
		var timeLeft = mapRange()
		bar.style.width = tempWidth;
		barTime.style.left = divPos + 137;
	});


	$(barHolder).mousemove(function(e) {
		divPos = e.pageX - offset.left;
		var tempPercent = mapRange(divPos, 80, 1120, 6, 80) + "%";
		// console.log(tempPercent + "; " + divPos);
		bar.style.width = tempPercent;
		barTime.style.left = divPos + 137;
	});


	// $(progress).mousemove(function(e) {
	// 	var pos = e.pageX - ofs.left;
	// 	console.log(pos);
	// })
}







function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}