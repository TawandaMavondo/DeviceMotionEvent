
var distance = 0;
var thresholdAcceleration = 1;
var hasDeviceMoved = false;

// Debounce Function to delay the movement of the device 
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

var motionEventHandler = debounce(function (event) {
    // Linear Accelaration on the x axis
    if (event.acceleration.x < thresholdAcceleration || hasDeviceMoved) {
        return
    }
    hasDeviceMoved = true;
    getLocation();
}, 750);


// Watch the current location of the device 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, { enableHighAccuracy: true, timeout: 1500 });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Previous Cordinates of the last taken picture
var lat1 = -18.1881393;
var lon1 = 31.5385135;


function showPosition(position) {
    // Current Position Cordinates 
    var lat2 = position.coords.latitude;
    var lon2 = position.coords.longitude;
    distance = getDistanceFromLatLon(lat2, lon2, lat1, lon1).toFixed(1).toString();
    console.log("Distance in Meters: " + getDistance() + " m");
    console.log("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude);
    console.log("Accuracy: " + Number(position.coords.accuracy).toFixed(2).toString() + " m");
}

// Getter method to return the distance moved
function getDistance() { return distance; }


// Error function callback that shows if there is an error on getting current position
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}
// Calculate distance from prev gps location and to the current gps location
// distance in meters

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    var R = 6371 // km
    var dLat = toRad(lat2 - lat1)
    var dLon = toRad(lon2 - lon1)
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d * 100
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180
}

window.addEventListener("devicemotion", motionEventHandler);


