/*progress bar on the PATH page */
var progress, bar, barHolder, barTime, tempStep;
var timeValues =[], pathValues=[], widthStamps = [];
var progressMonths = [];
var amount;
var pathInterval, barInterval;

function initProgress() {
	var timeStamps = [], intervalMili;
	 
	progress= document.getElementById( "progress" );
	barHolder = document.getElementById("bar-holder");
	bar = document.getElementById("bar");
	bar.style.width = "1%";

	barTime = document.getElementById("bar-time");
	barTime.innerHTML  = "today";

	var endTime = document.getElementById("end-time");
	endTime.innerHTML = (new Date(firstDay)).toDateString();

	
	progress.style.visibility = "hidden"; 
	barHolder.style.visibility = "hidden";
	bar.style.visibility = "hidden";
	

	var startInterval = 30 - (new Date()).getDate(); 
	var endInterval = (new Date(firstDay)).getDate();
	var computeLength = totalDays - startInterval - endInterval;
	amount = Math.round(computeLength/30);
	// console.log(Math.round(computeLength/30));

	var barLength = 1120 - 80;
	barInterval = Math.round(barLength/amount);
	var totalMili = (new Date()).getTime() - firstDay;
	intervalMili = totalMili/amount;

	for (var i=0; i<amount; i++) {
		widthStamps.push(i*barInterval);
		timeValues.push((new Date()).getTime() - intervalMili*i);
		var progressTime = new Date((new Date()).getTime() - intervalMili*i);
		var mm = progressTime.getMonth()+1;
		var yy = progressTime.getFullYear();
		var tt = mm + "/" + yy;
		progressMonths.push(tt);
	}

	/* for mousemove event */
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
				barTime.innerHTML = progressMonths[i];
			}
		}
	}

	callTime();
	/*
	$(progress).mousemove(function(e) {
		var pos = e.pageX - ofs.left;
		console.log(pos);
	})
	*/
}


/* click timeline to go back to a month to view bookmarks */
function callTime() {
	pathInterval = 1/amount;
	for (var i=0; i<amount; i++) {
		pathValues.push(i*pathInterval);
	}
}


function clickCallTime() {
	$(bar).click(function() {
		for (var i=0; i<progressMonths.length; i++) {
			if(barTime.innerHTML === progressMonths[i]) {			
				cameraStep = pathValues[i];
				// tempStep = cameraStep;
			}
		}
	});
}




function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}