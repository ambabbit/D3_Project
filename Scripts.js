

var airportSchedule1 = [];
var airportSchedule2 = [];
var airportSchedule = [];

pullData();

async function pullData() {
    airportSchedule1 = await d3.csv("./Test_Data/SCHEDULES_ALL_ALL_DIR_01DEC2019_31DEC2019 Yes CodeShare.csv");
    airportSchedule2 = await d3.csv("./Test_Data/SCHEDULES_ALL_ALL_DIR_01DEC2019_31DEC2019_No Codeshare.csv");

    airportSchedule =  airportSchedule1.concat(await airportSchedule2);
}

async function FindAllRelatedAirports(s) {
    const airSchedule = await airportSchedule,
    match = new Set(),
    test = [];
   
    let results = airSchedule.filter(airport => airport["Origin Airport"] == s || airport["Destination Airport"] == s)
   
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

async function CollectAllTimes(TerminalName) {

}



