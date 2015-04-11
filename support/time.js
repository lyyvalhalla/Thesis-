var one_day=1000*60*60*24;
var today = new Date();

function getTime(microseconds) {

    // var microseconds = miliseconds/1000;
    var seconds = Math.floor(microseconds/1000000);
    var microseconds = microseconds % 1000000;
    var days = Math.floor(seconds/86400);
    var seconds = seconds % 86400;

    var ref = new Date(1601, 0, 1);

    var add = new Date(0, 0, days, 0, 0, seconds, microseconds);


    function addDate(ref, days) {
        var result = ref;
        result.setDate(ref.getDate() + days);
        var date = dateFormat(result, "fullDate");

        return date;
        
    }

    return addDate(ref, days);



    // console.log(secondsToTime(seconds));
}

// var min = new Date();

function getMinTime(nodes) {
    var minDay; 
   
    for (var i=0; i<nodes.length; i++) {

        var min = nodes[0].date_added;

        if (nodes[i].date_added < min) {
            min = nodes[i].date_added;
            minDay = nodes[i];
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




function secondsToTime(secs)
{
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