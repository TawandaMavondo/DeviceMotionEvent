
var vm = document.querySelector(".vm")
var thresholdAcceleration = 1;

function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

var returnedFunction = debounce(function (event) {
    // Linear Accelaration on the x axis
    // if (event.acceleration.x < thresholdAcceleration) {
    //     return
    // }
    // vm.textContent = event.acceleration.x;
    getLocation();
}, 750);


var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, { enableHighAccuracy: true, timeout: 1500 });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Previous Cordinates of the last taken picture
var lat1 = 31.520007;
var lon1 = -17.404954;
var accuracy = document.querySelector(".accuracy");
function showPosition(position) {
    // Current Position Cordinates 
    var lat2 = position.coords.latitude;
    var lon2 = position.coords.longitude;

    console.log(lon2, lat2);
    x.innerHTML = "Distance in Meters: " + getDistanceFromLatLon(lat2, lon2, lat1, lon1).toFixed(1).toString() + " m";
    vm.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    accuracy.textContent = "Accuracy: " + Number(position.coords.accuracy).toFixed(2).toString() + " m";
}

// Error function callback that shows if there is an error on getting current position
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
// Calculate distance from prev gps location and to the current gps location
// distance in meters

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;//Distance in M
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

getLocation();



