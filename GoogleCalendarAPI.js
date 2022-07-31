// fetch("https://www.googleapis.com/calendar/v3/calendars/p75em956e3b5r49tdpivg9ag2c%40group.calendar.google.com/events?key=AIzaSyDZ5nJ17oqEUSI2fw7AXohYB5rHlKAzfYU")
//     .then((response) => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error("NETWORK RESPONSE ERROR");
//         }
//     })
//     .then((data) => {
//     })


(async () => {
    // the end nth like 1st, 2nd, 3rd, 4th, ...
    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    }

    function linkToZoom(zoomLink) {
        var link = document.createElement('a');
        link.textContent = zoomLink;
        link.href = zoomLink;
        link.target = '_blank';
        return document.getElementById('link').appendChild(link);
    }

    function linkToDate(timeLink) {
        var link = document.createElement('a');
        link.textContent = "here";
        link.href = timeLink;
        link.target = '_blank';
        return document.getElementById('dateLink').appendChild(link);
    }

    // Start of Async function
    var dateToday = new Date();
    var dateNow = new Date(dateToday.getTime() - (dateToday.getTimezoneOffset() * 60000)).toISOString();
    const url = "https://www.googleapis.com/calendar/v3/calendars/p75em956e3b5r49tdpivg9ag2c%40group.calendar.google.com/events?orderBy=startTime&singleEvents=true&timeMin=" + dateNow + "&key=AIzaSyDZ5nJ17oqEUSI2fw7AXohYB5rHlKAzfYU";
    const response = await fetch(url);
    const repositories = await response.json();
    const dateTime = [], endDateTime = [], description = [];
    const date = [], month = [], year = [], startTime = [], startTimeWithoutColon = [], endTime = [], dateParse = [], dateEndParse = [], dateResult = [], zoomLink = [], zoomID = [], passcode = [];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var timeBackLink = "&p1=122&ah=2&am=15", timeFrontLink = "https://www.timeanddate.com/worldclock/fixedtime.html?msg=Cyberjaya+Community+Toastmasters+Club+Meeting&iso=";
    let sky;
    console.log(dateNow)
    console.log(new Date())
    console.log(url)
    console.log("") // Space between this & the Zoom ID

    for(let i = 0; i < repositories.items.length; i++) {
        dateTime[i] = repositories.items[i].start.dateTime.split("")
        endDateTime[i] = repositories.items[i].end.dateTime.split("");
        description[i] = repositories.items[i].description
        year[i] = dateTime[i][0] + dateTime[i][1] + dateTime[i][2] + dateTime[i][3]
        month[i] = dateTime[i][5] + dateTime[i][6]
        date[i] = dateTime[i][8] + dateTime[i][9]
        startTime[i] = dateTime[i][11] + dateTime[i][12] + dateTime[i][13] + dateTime[i][14] + dateTime[i][15]
        endTime[i] = endDateTime[i][11] + endDateTime[i][12] + endDateTime[i][13] + endDateTime[i][14] + endDateTime[i][15]
        startTimeWithoutColon[i] = dateTime[i][11] + dateTime[i][12] + dateTime[i][14] + dateTime[i][15]
        dateParse[i] = new Date(year[i] + "-" + month[i] + "-" + date[i] + "T" + startTime[i])
        dateEndParse[i] = new Date(year[i] + "-" + month[i] + "-" + date[i] + "T" + endTime[i])

        // Find skylight
        if (dateParse[i].getHours() < 12){
            sky = "morning"
        }
        else if (dateParse[i].getHours() < 19){
            sky = "afternoon"
        }
        else if (dateParse[i].getHours() < 24){
            sky = "night"
        }

        dateResult[i] = days[dateParse[i].getDate()] + " " + sky + ", " + date[i] + nth(date[i]) + " " + months[dateParse[i].getMonth()] + " " + year[i] + ", " + formatAMPM(dateParse[i]) + " - " + formatAMPM(dateEndParse[i]);
        // if (repositories.items[i].hasOwnProperty(location)){
        //     zoomLink[i] = repositories.items[i].location
        //     const temp = zoomLink[i].split("")
        //     zoomID[i] = temp[26] + temp[27] + temp[28] + temp[29] + temp[30] + temp[31] + temp[32] + temp[33] + temp[34] + temp[35] + temp[36];
        //     console.log(zoomID[i])
        // }
        zoomLink[i] = repositories.items[i].location
        const temp = zoomLink[i].split("")
        zoomID[i] = temp[26] + temp[27] + temp[28] + temp[29] + temp[30] + temp[31] + temp[32] + temp[33] + temp[34] + temp[35] + temp[36];
        var indexPasscode = description[i].indexOf("Passcode")
        passcode[i] = description[i][indexPasscode + 10] + description[i][indexPasscode + 11] + description[i][indexPasscode + 12] + description[i][indexPasscode + 13];
        console.log("Zoom ID for " + dateParse[i] + ": " + numberWithSpaces(zoomID[i]))
        console.log("Passcode: " + passcode[i])
        console.log(repositories.items[i])
        // TODO: Search Zoom link, ID, Password position & join the elements
        // TODO: Make another array combining the data
        // TODO: After finish, display the data into the homepage current details. Maybe can use array[0] while shifting or maybe search
        // TODO: Then can list all dates accordingly
        // TODO: set timeMin according to yesterday or today's date
    }
    timeLink = timeFrontLink + year[0] + month[0] + date[0] + "T" + startTimeWithoutColon[0] + timeBackLink;

    // document.getElementById("date").innerHTML  = dateResult[0]; // Next Meeting: Wednesday [sky], nth Month 2022, 8:00 pm - 10:00 pm
    // document.getElementById("ID").innerHTML  = numberWithSpaces(zoomID[0]); // Meeting ID:
    // document.getElementById("passcode").innerHTML  = passcode[0]; // Passcode:
    // document.getElementById("link").href  = linkToZoom(zoomLink[0]); // Join Zoom Meeting:
    // document.getElementById("dateLink").href  = linkToDate(timeLink); // Check your local time here
})();
