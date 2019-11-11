

var airportSchedule = [];
airportSchedule = d3.csv("./Test_Data/SCHEDULES_ALL_ALL_DIR_01DEC2019_31DEC2019 Yes CodeShare.csv");

async function FindAllRelatedAirports(s) {
    const airSchedule = await airportSchedule,
    match = new Set(),
    test = [];
   
    const results = airSchedule.filter(airport => airport["Origin Airport"] == s || airport["Destination Airport"] == s)
   
    results.forEach(function (d){
        if (d["Origin Airport"] != s) {
            match.add(d["Arrival Terminal"]);   
        } else if (d["Destination Airport"] != s) {
            match.add(d["Departure Terminal"]);
        }
    });
    let count = 0; 
    match.forEach(function(d,i) {test[count++] = d})

    console.log(test);
    console.log(match);

    return test;
}




