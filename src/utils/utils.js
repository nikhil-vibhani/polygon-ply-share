export const formattedDate = (unix_timestamp) => {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return date;
}

export const dateFormate = (date_ob) => {
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return month + "-" + date + "-" + year + " " + hours + ":" + minutes;

}


export const dayHourMinuteFormate = (sec) => {
    let seconds = parseInt(sec);
    console.log('sec', sec)
    let days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    let hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    let mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;

    let output = ""
    if(days) {
        output += `${days} Days`
    }

    if(hrs) {
        output += `${hrs} Hrs`
    }

    if(mnts) {
        output += `${mnts} Minutes`
    }

    if(seconds) {
        output += `${seconds} Seconds`
    }
    // return days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "++" "
    return output
}