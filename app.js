
var vm = document.querySelector(".vm")
var vm1 = document.querySelector(".vm1")
var vm2 = document.querySelector(".vm2")



window.addEventListener('devicemotion', function (event) {
    vm.textContent = event.acceleration.x;
    vm1.textContent = event.acceleration.y;
    vm2.textContent = event.acceleration.z;
    console.log(`${event.acceleration.x} m/s2`);
});