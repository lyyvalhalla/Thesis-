/*progress bar on the PATH page */
var bar;
function initProgress() {
	var widthStamps = [], timeStamps = [], amount, barInterval;


	var progress= document.getElementById( "progress" );
	var barHolder = document.getElementById("bar-holder");
	bar = document.getElementById("bar");
	bar.style.width = "1%";

	var barTime = document.getElementById("bar-time");
	barTime.innerHTML  = "today";

	var endTime = document.getElementById("end-time");
	endTime.innerHTML = (new Date(firstDay)).toDateString();

	var startInterval = 30 - (new Date()).getDate(); 
	var endInterval = (new Date(firstDay)).getDate();
	var computeLength = totalDays - startInterval - endInterval;
	amount = Math.round(computeLength/30);
	// console.log(Math.round(computeLength/30));

	var barLength = 1120 - 80;
	barInterval = Math.round(barLength/amount);
	for (var i=0; i<amount; i++) {
		widthStamps.push(i*barInterval);
	}

	var divPos, dePos;
	var offset = $(barHolder).offset();
	// var ofs = $(progress).offset();

	$(bar).mousemove(function(e){
		divPos = e.pageX - offset.left;
		
		var tempWidth = mapRange(divPos, 80, 1120, 6, 80) + "%";
		var timeLeft = mapRange()
		bar.style.width = tempWidth;
		barTime.style.left = divPos + 137;

		checkStamp();
	});

	$(barHolder).mousemove(function(e) {
		divPos = e.pageX - offset.left;
		var tempPercent = mapRange(divPos, 80, 1120, 6, 80) + "%";
		bar.style.width = tempPercent;
		barTime.style.left = divPos + 137;

		checkStamp();
	});

	function checkStamp() {
		for (var i=0; i<widthStamps.length; i++) {
			if (divPos > widthStamps[i] && divPos <  widthStamps[i] + barInterval) {
				barTime.innerHTML = widthStamps[i];
			}
		}
	}



	
	console.log(widthStamps);

	var progressTime;

	/*
	$(progress).mousemove(function(e) {
		var pos = e.pageX - ofs.left;
		console.log(pos);
	})
	*/
}







function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}