const moment = require('moment');
const momentTZ = require('moment-timezone');
const timeZone = 'Asia/Calcutta';

let timeNowUTC = ()=>{
    return moment().utc().format();
}

let getLocalTimeNow = ()=>{
    return moment().format();
}

let convertTimeToLocal = (time)=>{
    return momentTZ().tz(timeZone).format('LLLL');
}

module.exports = {
    timeNow : timeNowUTC,
    LocalTimeNow : getLocalTimeNow,
    convertTimeToLocal : convertTimeToLocal
}