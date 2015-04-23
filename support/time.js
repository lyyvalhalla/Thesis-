var one_day=1000*60*60*24;
var today = new Date();

function getTime(miliseconds) {
    return new Date(miliseconds);
}

function getMinTime(nodes) {
    var minDay; 
    var min = nodes[0].dateAdded;
  
    for (var i=0; i< nodes.length; i++) {     
        if (nodes[i].dateAdded <= min) {
            min = nodes[i].dateAdded;
            minDay = nodes[i];
        }  else {
            min = min;
            minDay = minDay;
        }
    }
    return minDay;
}


var tempDays = function (node, today) {
    return Math.ceil((today.getTime()-(new Date(node.time)).getTime())/(one_day));
}


function getTempTime(nodes) {
    for (var i=0; i<nodes.length; i++) {

        var result = tempDays(nodes[i], today);
        nodes[i].zPos = result * 10;   
    }
}


function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function daydiff(first, second) {
    return (second-first);
}


function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    var obj = {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
    return obj;
} 




/*
def getFiletime(dt):
    microseconds = int(dt, 16) / 10
    seconds, microseconds = divmod(microseconds, 1000000)
    days, seconds = divmod(seconds, 86400)

    return datetime.datetime(1601, 1, 1) + datetime.timedelta(days, seconds, microseconds)

#http://stackoverflow.com/a/19076132/1415352

if __name__ == "__main__":
	print format(getFiletime(hex(int(sys.argv[1])*10)[2:17]), '%a, %d %B %Y %H:%M:%S %Z')
*/