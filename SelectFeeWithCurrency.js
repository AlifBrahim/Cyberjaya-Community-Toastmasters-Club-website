/** Improved by ChatGPT without any effect on the output **/
function convertCurrency() {
    var startDate = document.getElementById("StartDateList").value;
    var endDate = document.getElementById("EndDateList").value;
    var convertedMYR;
    let amountMYR = " (Use the dropdown above to see the amount in MYR)";
    let amountUSD, amountUSDnewMemberFee;
    let MYR;
    fetch("https://openexchangerates.org/api/latest.json?app_id=8f1e953be0eb4754baa9a48324d561f0")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then((data) => {
            MYR = (Math.round(data.rates.MYR * 100) / 100).toFixed(2);
            document.getElementById("USDtoMYR").innerHTML =
                "Currently, 1 USD = " + MYR + " MYR";
            let monthDiff;
            if (startDate === "Jan" && endDate === "Mar 31") {
                monthDiff = 3;
            } else if (startDate === "Jan" && endDate === "Sep 30") {
                monthDiff = 9;
            } else if (startDate === "Feb" && endDate === "Mar 31") {
                monthDiff = 2;
            } else if (startDate === "Feb" && endDate === "Sep 30") {
                monthDiff = 8;
            } else if (startDate === "Mar" && endDate === "Mar 31") {
                monthDiff = 1;
            } else if (startDate === "Mar" && endDate === "Sep 30") {
                monthDiff = 7;
            } else if (startDate === "April" && endDate === "Sep 30") {
                monthDiff = 6;
            } else if (startDate === "May" && endDate === "Sep 30") {
                monthDiff = 5;
            } else if (startDate === "Jun" && endDate === "Sep 30") {
                monthDiff = 4;
            } else if (startDate === "Jul" && endDate === "Sep 30") {
                monthDiff = 3;
            } else if (startDate === "Aug" && endDate === "Sep 30") {
                monthDiff = 2;
            } else if (startDate === "Sep" && endDate === "Sep 30") {
                monthDiff = 1;
            } else if (startDate === "Oct" && endDate === "Mar 31") {
                monthDiff = 6;
            } else if (startDate === "Nov" && endDate === "Mar 31") {
                monthDiff = 5;
            } else if (startDate === "Dec" && endDate === "Mar 31") {
                monthDiff = 4;
            }
            else {
                monthDiff = 0;
            }

            // if monthDiff is 0, document.getElementById("ShowFee").innerHTML = "Please select a valid date range";
            if (monthDiff === 0) {
                document.getElementById("ShowFee").innerHTML = "Please select a valid date range";
            }
            else {
                amountUSD = 7.5 * monthDiff;
                amountUSDnewMemberFee = amountUSD + 20;
                convertedMYR = roundNearest5(MYR * amountUSDnewMemberFee);
                amountMYR = convertedMYR + 10;
            }

            document.getElementById("ShowFee").innerHTML =
                "USD 7.50 * " +
                monthDiff +
                " months = USD $" +
                amountUSD +
                "<br>" +
                "USD $" +
                amountUSD.toFixed(2) +
                " + $20 new member fee = USD $" +
                amountUSDnewMemberFee.toFixed(2) +
                "<br>" +
                "\nTotal fee in MYR (rounded off)," +
                "<br>" +
                "USD $" +
                amountUSDnewMemberFee.toFixed(2) +
                " * RM" +
                MYR +
                " + RM10 international bank charge = RM" +
                amountMYR;
            document.getElementById("showamountMYR").innerHTML = amountMYR;
        });

}

function roundNearest5(x) {
    return Math.ceil(x / 5) * 5;
}


/** OLD ONE which was my original code before improving it with ChatGPT **/
// function convertCurrency(){
//     var startDate = document.getElementById("StartDateList").value;
//     var endDate = document.getElementById("EndDateList").value;
//     var convertedMYR;
//     let amount = " (Use the dropdown above to see the amount in MYR)";
//     let MYR;
//     fetch("https://openexchangerates.org/api/latest.json?app_id=8f1e953be0eb4754baa9a48324d561f0")
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("NETWORK RESPONSE ERROR");
//             }
//         })
//         .then((data) => { // data is the parsed JSON
//             MYR = (Math.round(data.rates.MYR * 100) / 100).toFixed(2);
//
//             if (startDate === "Jul 01, 2022" && endDate === "Sep 30, 2022") {
//                 convertedMYR = roundNearest5(MYR * 42.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $22.50 + $20 = $42.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Aug 01, 2022" && endDate === "Sep 30, 2022") {
//                 convertedMYR = roundNearest5(MYR * 35);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $15 + $20 = $35" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Sep 01, 2022" && endDate === "Sep 30, 2022") {
//                 convertedMYR = roundNearest5(MYR * 27.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $7.50 + $20 = $27.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Oct 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 65);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $45 + $20 = $65" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Nov 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 57.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $37.50 + $20 = $57.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Dec 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 50);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $30 + $20 = $50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Jan 01, 2023" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 42.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $22.50 + $20 = $42.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Feb 01, 2023" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 35);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $15 + $20 = $35" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "March 01, 2023" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 27.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $7.50 + $20 = $27.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount;
//             } else if (startDate === "Jul 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 87.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $7.50 * 9 months = $67.50" +
//                     "<br>" + "$67.50 + $20 = $87.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount + "<br>" +
//                     "<b>You can pay above the maximum fee to become a member until March 31st, 2023 renewal. It's worth it!</b>";
//             } else if (startDate === "Aug 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 80);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $7.50 * 8 months = $60" +
//                     "<br>" + "$60 + $20 = $80" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount + "<br>" +
//                     "<b>You can pay above the maximum fee to become a member until March 31st, 2023 renewal. It's worth it!</b>";
//             } else if (startDate === "Sep 01, 2022" && endDate === "Mar 31, 2023") {
//                 convertedMYR = roundNearest5(MYR * 72.5);
//                 amount = convertedMYR + 10;
//                 document.getElementById("ShowFee").innerHTML = "USD $7.50 * 7 months = $52.50" +
//                     "<br>" + "$52.50 + $20 = $72.50" + "<br>" +
//                     "\nTotal fee in MYR = RM" + amount + "<br>" +
//                     "<b>You can pay above the maximum fee to become a member until March 31st, 2023 renewal. It's worth it!</b>";
//             } else {
//                 document.getElementById("ShowFee").innerHTML = "";
//             }
//             document.getElementById("showAmount").innerHTML = amount;
//
//         })
// }
//
// function roundNearest5(num) {
//     return Math.ceil(num / 5) * 5;
// }