var lineReader = require('line-reader');
var XRegExp = require('xregexp').XRegExp;
var moment = require('moment');
moment.locale('fr')

lineReader.eachLine(process.argv[2], function(line, last) {
    //console.log(line);

    //00:01:14,300 --> 00:01:15,300
    var pattern = /(\d{2}:\d{2}:\d{2},\d{3})/
    var format = 'HH:mm:ss,SSS'

    var match = XRegExp(pattern);
    if(match.test(line)) {
        XRegExp.forEach(line, pattern, function(match, i) {
            date = match[0];
            date = moment(date, format)
            date.seconds(date.seconds() - 20)
            date = date.format(format)
            if(i == 0){
                process.stdout.write(date + ' --> ')
            }else{
                console.log(date)
            }
        }, []);
    }else{
        console.log(line);
    }

});