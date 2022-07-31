
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];


var today = new Date();
var daysOfMonth = [];
let dates = [];

let p = new Date();
let day, date;
lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

for (var d = new Date(today.getFullYear(), today.getMonth(), 1); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
    daysOfMonth.push(new Date(d));
}

for (let i = 0; i < daysOfMonth.length; i++) {
    p = daysOfMonth[i];
    day = p.getDay();
    date = p.getDate();
    if (day === 3) {
        dates.push(date)
    }
}
document.getElementById("ID").innerHTML  = dates

console.log("Wednesdays dates: " + dates)

