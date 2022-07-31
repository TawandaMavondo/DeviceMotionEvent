
var vm = document.querySelector(".vm")
var vm1 = document.querySelector(".vm1")
var vm2 = document.querySelector(".vm2")



// window.addEventListener('devicemotion', function (event) {
//     vm.textContent = event.acceleration.x;
//     vm1.textContent = event.acceleration.y;
//     vm2.textContent = event.acceleration.z;
//     console.log(`${event.acceleration.x} m/s2`);
// });

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
    vm.textContent = event.acceleration.x;
    vm1.textContent = event.acceleration.y;
    vm2.textContent = event.acceleration.z;
}, 350);

window.addEventListener('devicemotion', returnedFunction);