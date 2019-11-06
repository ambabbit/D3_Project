

var airportSchedule = [];
airportSchedule = d3.csv("./Test_Data/SCHEDULES_ALL_ALL_DIR_01DEC2019_31DEC2019 Yes CodeShare.csv");


async function FilterBasedOnAirportCode(s) {
    const airSchedule = await airportSchedule;
    const match = [];
    let offset = 0;
    console.log(typeof(airSchedule));
    const results = airSchedule.filter(airport => airport["Origin Airport"] == s || airport["Destination Airport"] == s)
    results.forEach(function (d, i){
        match[offset++] = {
            Origin_Airport: d["Origin Airport"],
            Destination_Airport: d["Destination Airport"],
            Arrival_Terminal: d["Arrival Terminal"],
            Departure_Terminal: d["Departure Terminal"],
            Departure_Time: d["Departure Time"],
            Arrival_Time: d["Arrival Time"] 
        }
    });

    console.log(match);

    return match;
}




