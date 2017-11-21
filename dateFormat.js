function formatDate(date, format) {
    var appliedFormat = format || "yyyy-MM-dd HH:mm";
    var seperator = appliedFormat.charAt(appliedFormat.lastIndexOf("d") + 1)

    var dateTime = getDatePart(appliedFormat, date);
    var time = getTimePart(appliedFormat, date);

    if (!isEmpty(time)) {
        dateTime += seperator;
        dateTime += time;
    }

    return dateTime;
}

function getDatePart(appliedFormat, date) {
    var year = getYear(appliedFormat, date);
    var month = getMonth(appliedFormat, date)
    var day = getDay(appliedFormat, date);

    var indexOfYear = appliedFormat.indexOf("y");
    var indexOfMonth = appliedFormat.indexOf("M");
    var indexOfDay = appliedFormat.indexOf("d");

    var dateSeperator = appliedFormat.charAt(appliedFormat.lastIndexOf("y") + 1)

    var result = "";

    if (indexOfYear === 0) {
        result += year;
        result += dateSeperator;
        if (indexOfMonth < indexOfDay) {
            result += month;
            result += dateSeperator;
            result += day;
        } else {
            result += day;
            result += dateSeperator;
            result += month;
        }
    } else if (indexOfMonth === 0) {
        result += month;
        result += dateSeperator;
        if (indexOfYear < indexOfDay) {
            result += year;
            result += dateSeperator;
            result += day;
        } else {
            result += day;
            result += dateSeperator;
            result += year;
        }
    } else if (indexOfDay === 0) {
        result += day;
        result += dateSeperator;
        if (indexOfYear < indexOfMonth) {
            result += year;
            result += dateSeperator;
            result += month;
        } else {
            result += month;
            result += dateSeperator;
            result += year;
        }
    }
    return result;
}

function getTimePart(appliedFormat, date) {
    var hours = getHours(appliedFormat, date);
    var minutes = getMinutes(appliedFormat, date);
    var seconds = getSeconds(appliedFormat, date);
    var indicator = getTimeSuffix(appliedFormat, date);

    var timeSeperator = appliedFormat.charAt(appliedFormat.indexOf("m") - 1)

    var time = "";
    if (!isEmpty(hours)) {
        time += hours
    }
    if (!isEmpty(minutes)) {
        time += timeSeperator + minutes;
    }
    if (!isEmpty(seconds)) {
        time += timeSeperator + seconds
    }
    if (!isEmpty(indicator)) {
        time += " " + indicator
    }

    return time;
}

function getYear(format, date) {
    var isoDate = new Date(date);
    var mask = getMask(format, "y");

    if (mask === "yyyy")
        return isoDate.getFullYear();
    else if (mask === "yy")
        return isoDate.getFullYear().substr(2, 2);
    else
        return isoDate.getUTCFullYear();
}

function getMonth(format, date) {
    var isoDate = new Date(date);
    var month = isoDate.getMonth() + 1;
    var mask = getMask(format, "M");

    if (mask === "MMMM")
        return monthNames[month + 12];
    else if (mask === "MMM")
        return monthNames[month];
    else if (mask === "MM")
        return pad(month);
    else
        return isoDate.getUTCMonth();
}

function getDay(format, date) {
    var isoDate = new Date(date);
    var day = isoDate.getDay();
    var mask = getMask(format, "d");
    
    if (mask === "dddd")
        return dayNames[day + 7];
    else if (mask === "ddd")
        return dayNames[day];
    else if (mask === "dd")
        return pad(isoDate.getDate());
    else
        return isoDate.getUTCDate();
}

function getHours(format, date) {
    var isoDate = new Date(date);
    var hour24Mask = getMask(format, "H");
    var hourMask = getMask(format, "h");

    if (!isEmpty(hour24Mask)) {
        if (hour24Mask === "HH")
            return pad(isoDate.getHours());
        else if (hour24Mask === "H")
            return isoDate.getHours();
    } else if (!isEmpty(hourMask)) {
        if (hourMask === "hh")
            return pad(isoDate.getHours() % 12 || 12);
        else if (hourMask === "h")
            return isoDate.getHours() % 12 || 12;
    } else {
        return "";
    }
}

function getMinutes(format, date) {
    var isoDate = new Date(date);
    var mask = getMask(format, "M");

    if (mask === "MM")
        return pad(isoDate.getMinutes());
    else if (mask === "M")
        return isoDate.getMinutes();
    else
        return "";
}

function getSeconds(format, date) {
    var isoDate = new Date(date);
    var mask = getMask(format, "s");

    if (mask === "ss")
        return pad(isoDate.getSeconds());
    else if (mask === "s")
        return isoDate.getSeconds();
    else
        return "";
}

function getTimeSuffix(format, date) {
    var isoDate = new Date(date);
    var upperMask = getMask(format, "T");
    var lowerMask = getMask(format, "t");;

    var hour = isoDate.getHours();
    if (!isEmpty(upperMask)) {
        if (upperMask === "TT")
            return hour < 12 ? timeNames[6] : timeNames[7];
        else if (upperMask === "T")
            return hour < 12 ? timeNames[4] : timeNames[5];
    } else if (!isEmpty(lowerMask)) {
        if (lowerMask === "tt")
            return hour < 12 ? timeNames[2] : timeNames[3];
        else if (lowerMask === "t")
            return hour < 12 ? timeNames[0] : timeNames[1];
    }
    else {
        return "";
    }
}

function getMask(format, part) {
    var index = format.indexOf(part);
    var length = (format.lastIndexOf(part) - index) + 1;
    return format.substr(index, length);
}

function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = '0' + val;
    }
    return val;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

var dayNames = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
var monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
var timeNames = [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
];