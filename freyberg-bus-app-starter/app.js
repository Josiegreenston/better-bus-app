var colours = ["#f69238",
                "#009e57",
                "#00aeef",
                "#ee1b2d",
                "#873c96",
                "#ef59a1",
                "#0153a0",
                "#c6870e",
                "#005040",
                "#fbb555",
                "#008b98",
                "#f0563b"]

var buses = [
    "awapuni",
    "rugby",
    "highbury",
    "takaro",
    "cloverlea",
    "milson",
    "rhodes",
    "roslyn",
    "rangiora",
    "brightwater",
    "fernlea",
    "heights"
]

//CLASS
class Bus {
    //the different properties that Bus objects should have
    constructor(name, stops, stopPositions, colour, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.busStops = stops;
        this.stopPositions = stopPositions;
        this.colour = colour;
        this.monFriTimes = monFriTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;

        this.routeNameDOM = document.getElementById("route")
        this.stopDOM = document.getElementById ("stop")
        this.timesDOM = document.getElementById ("times")
        this.nextDOM = document.getElementById ("next")
    }


    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.busStops.length; i++) {

            //onclick="                                  awapuni.showTimes(1)                                                 Deaprt MST
            html += "<li class='busStop' onclick='routes[\"" + this.name.toLowerCase() + "\"].showTimes(" + i + ")'>" + this.busStops[i] + "</li>"
        }
        html += '</ul>'
        return html
    }

    showTimes(index) {
        this.routeNameDOM.innerHTML = this.name;
        this.stopDOM.innerHTML = this.busStops[index];
        this.createMarker(index);
        this.timesDOM.innerHTML = this.getStopTimes(index)
        this.nextDOM.innerHTML = this.nextAvaliableBus(index)

    }
        createMarker(index){
            if (this.marker !=null) {
                this.marker.setMap(null);
                this.marker = null;
            }

            var stopPosition = this.stopPositions[index];
            var stopName = this.busStops [index];
            this.marker = new google.maps.Marker({
                map: map,
                position: stopPosition,
                title: stopName
            });

            map.setCenter (stopPosition);
            map.setZoom(15);
        }

    getStopTimes(index){
        var contentString = "<ul>";
        for (var i =0; i < this.monFriTimes.length;i++) {

            contentString += "<li>" + this.monFriTimes[i][index] + "</li>"
        }

        return contentString
    }

    getNextTime () {
        var now = new Date ()
        var nextBus = new Date (2017)

    }

    nextAvaliableBus (index) {
       var now = new Date();
        var h = now.getHours ()
        var m = now.getMinutes ()

        for (var i = 0; i < this.monFriTimes.length; i++) {
            if (this.monFriTimes[i][index] > (h + "." + m)) {
                return  "<h2 id='next'>" + this.monFriTimes[i][index] + "</h2>";
            }
        }
    }




}


//OBJECTS


/*var awapuni = new Bus("Awapuni", awapuniStops, colours[0], awapuniTimesMonFri, awapuniTimesFri, awapuniTimesSat, awapuniTimesSun);
var rugby = new Bus("Rugby", rugbyStops, colours[1], rugbyTimesMonFri, rugbyTimesFri, rugbyTimesSat, rugbyTimesSun)
var highbury = new Bus("Highbury", highburyStops, colours[2], highburyTimesMonFri, highburyTimesFri, highburyTimesSat, highburyTimesSun)
var takaro = new Bus("Takaro", takaroStops, colours[3], takaroTimesMonFri, takaroTimesFri, takaroTimesSat, takaroTimesSun)
var cloverlea = new Bus("Cloverlea", cloverleaStops, colours[4], cloverleaTimesMonFri, cloverleaTimesFri, cloverleaTimesSat, cloverleaTimesSun)
var milson = new Bus("Milson", milsonStops, colours[5], milsonTimesMonFri, milsonTimesFri, milsonTimesSat, milsonTimesSun)
var rhodes = new Bus("Rhodes", rhodesStops, colours[6], rhodesTimesMonFri, rhodesTimesFri, rhodesTimesSat, rhodesTimesSun)
var roslyn = new Bus("Roslyn", roslynStops, colours[7], roslynTimesMonFri, roslynTimesFri, roslynTimesSat, roslynTimesSun)
var rangiora = new Bus("Rangiora", rangioraStops, colours[8], rangioraTimesMonFri, rangioraTimesFri, rangioraTimesSat, rangioraTimesSun)
var brightwater = new Bus("Brightwater", brightwaterStops, colours[9], brightwaterTimesMonFri, brightwaterTimesFri, brightwaterTimesSat, brightwaterTimesSun)
var fernlea = new Bus("Fernlea", fernleaStops, colours[10], fernleaTimesMonFri, fernleaTimesFri, fernleaTimesSat, fernleaTimesSun)
var heights = new Bus("Heights", heightsStops, colours[11], heightsTimesMonFri, heightsTimesFri, heightsTimesSat, heightsTimesSun)
*/

var routes= {};

for (var i = 0; i < buses.length; i++) {
    var name = buses[i];

    var newRoute = new Bus(
        name,
        data.stops[name],
        data.stopCoordinates[name],
        data.colors[name],
        data.timesMonFri[name],
        data.timesFri[name],
        data.timesSat[name],
        data.timesSun[name]
    );

    routes[name]= newRoute
}

//JQUERY STUFF
$(document).ready(function () {
    var theSquare = {
        lat: -40.353005,
        lng:175.610677
    }

    //Create a new Map object
    window.map = new google.maps.Map(document.getElementById('map'), {
        center : theSquare,
        zoom: 13

    });

    $(".stopsMenu").hide();

    $(".bus h2").click(function () {
        $("#" + this.id + "Stops").html(routes[this.id].getStops());
        $("#" + this.id + "Stops").slideToggle();
    })

});
