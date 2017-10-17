var colours = ["#f69238",                       //colors for each bus stop
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

var buses = [ "awapuni",                        //bus route names
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
    constructor(name, stops, stopPositions, colour, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;                      //assigning a label to a function
        this.busStops = stops;
        this.stopPositions = stopPositions;
        this.colour = colour;
        this.monFriTimes = monFriTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;

        this.routeNameDOM = document.getElementById("route")    //enabling route name, stops, times, and next bus to be accessed by ID
        this.stopDOM = document.getElementById ("stop")
        this.timesDOM = document.getElementById ("times")
        this.nextDOM = document.getElementById ("next")
    }

// Get stops for bus
    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.busStops.length; i++) {            //shows bus stops when bus route is clicked on
            html += "<li class='busStop' onclick='routes[\"" + this.name.toLowerCase() + "\"].showTimes(" + i + ")'>" + this.busStops[i] + "</li>"                              //list expands going down
        }
        html += '</ul>'
        return html
    }
// shows all times bus arrived at certain stop
    showTimes(index) {
        this.routeNameDOM.innerHTML = this.name;            //gets route name from alternate page
        this.stopDOM.innerHTML = this.busStops[index];      //gets bus stop
        this.createMarker(index);
        this.timesDOM.innerHTML = this.getStopTimes(index)  //
        this.nextDOM.innerHTML = this.nextAvaliableBus(index)

    }
//google map position once page has loaded
        createMarker(index){
            if (this.marker !=null) {
                this.marker.setMap(null);
                this.marker = null;
            }

//moves map to wherever bus stop has been clicked
            var stopPosition = this.stopPositions[index];       //set position for when page is loaded
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

    getStopTimes(index){
        var contentString = "<ul>";
        for (var i =0; i < this.monFriTimes.length;i++) {       //get stop times for Monday to Friday times

            contentString += "<li>" + this.monFriTimes[i][index] + "</li>"  //times are in list going down
        }

        return contentString
    }

    getNextTime () {                                //gets next time for bus
        var now = new Date ()
        var nextBus = new Date (2017)

    }

    nextAvaliableBus (index) {                      //function looks at current time and finds bus in next time
       var now = new Date();                        //this gets current time now
        var h = now.getHours ()                     //this gets time in hours
        var m = now.getMinutes ()                   //this gets time now in minutes

        for (var i = 0; i < this.monFriTimes.length; i++) { //function selects next bus time
          if (this.monFriTimes[i][index] > (h + "." + m)) {
             return  "<h2 id='next'>" + this.monFriTimes[i][index] + "</h2>";
            } else {
                return  "<h2 id='next'>No More Buses Today </h2>"; // if there are no more busses that day this code is run
            }
        }
    }

}

//routes
var routes= {};

for (var i = 0; i < buses.length; i++) {
    var name = buses[i];

    var newRoute = new Bus(             //new routes, information
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
    var theSquare = {           //calculated position of the Square, where the map is stationed over when page first loads
        lat: -40.353005,
        lng:175.610677
    }

    //Created a new Map object
    window.map = new google.maps.Map(document.getElementById('map'), {          //map window appearing in page
        center : theSquare,                                                     //when page is loaded goes to square
        zoom: 13                                                                //zoom is 13

    });

    $(".stopsMenu").hide();

    $(".bus h2").click(function () {
        $("#" + this.id + "Stops").html(routes[this.id].getStops());        //gets stops for route
        $("#" + this.id + "Stops").slideToggle();                           //effect when route is clicked on, stops toggle into list
    })

});
