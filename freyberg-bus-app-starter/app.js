//colors for each buss stop

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

// bus route names

var buses = [ "awapuni",
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
              "heights"]

//CLASS
class Bus {
//the different properties the Bus objects have
    constructor(name, stops, stopPositions, colour, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.busStops = stops;
        this.stopPositions = stopPositions;
        this.colour = colour;
        this.monFriTimes = monFriTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;

// enabling the information asked for to be accessed by ID
        this.routeNameDOM = document.getElementById("route")
        this.stopDOM = document.getElementById ("stop")
        this.timesDOM = document.getElementById ("times")
        this.nextDOM = document.getElementById ("next")
    }

// Get stops in future for bus
    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.busStops.length; i++) {

            //onclick="                                  awapuni.showTimes(1)                                                 Deaprt MST
            html += "<li class='busStop' onclick='routes[\"" + this.name.toLowerCase() + "\"].showTimes(" + i + ")'>" + this.busStops[i] + "</li>"
        }
        html += '</ul>'
        return html
    }
// shows all times bus arrived at certain stop
    showTimes(index) {
        this.routeNameDOM.innerHTML = this.name;
        this.stopDOM.innerHTML = this.busStops[index];
        this.createMarker(index);
        this.timesDOM.innerHTML = this.getStopTimes(index)
        this.nextDOM.innerHTML = this.nextAvaliableBus(index)

    }
//google map position once page has loaded
        createMarker(index){
            if (this.marker !=null) {
                this.marker.setMap(null);
                this.marker = null;
            }

//moves map to wherever bus stop has been clicked
            var stopPosition = this.stopPositions[index];
            var stopName = this.busStops [index];
            this.marker = new google.maps.Marker({
                map: map,
                position: stopPosition,
                title: stopName
            });

//position of map and amount of zoom
            map.setCenter (stopPosition);
            map.setZoom(15);
        }

 //get stop times for Monday to Friday times
    getStopTimes(index){
        var contentString = "<ul>";
        for (var i =0; i < this.monFriTimes.length;i++) {

            contentString += "<li>" + this.monFriTimes[i][index] + "</li>"
        }

        return contentString
    }

//gets next time for bus
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

//routes
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

//JQUERY EFFECTS
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
