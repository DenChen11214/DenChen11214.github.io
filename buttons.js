var pause = document.getElementById("pause");
var play = document.getElementById("play");
var length1 = document.getElementById("length1")
var length2 = document.getElementById("length2")
var mass1 = document.getElementById("mass1")
var mass2 = document.getElementById("mass2")
var gravity = document.getElementById("gravity")
var angleChart = document.getElementById("angle")
var energyChart = document.getElementById("energy");
var angleC = document.getElementById("anglechart")
var energyC = document.getElementById("energychart")
var showAngle = false
var paused = false;
var charts = document.getElementById("charts");
charts.removeChild(angleC);

angleChart.addEventListener("click",function(){
    if (showAngle != true) {
        showAngle = true;
        charts.appendChild(angleC)
        charts.removeChild(energyC)
}})
energyChart.addEventListener("click",function(){
    if (showAngle != false) {
        showAngle = false;
        charts.appendChild(energyC)
        charts.removeChild(angleC)
}})
pause.addEventListener("click", function() {
    window.cancelAnimationFrame(requestID);
    paused = true
})

play.addEventListener("click", function() {
    move();
    pause = false;
})

length1.addEventListener("input",function(e){
    var l1v = document.getElementById("l1v")
    l1v.innerHTML = length1.value / 100
    l1 = length1.value / 100
    aL1 = l1 * 100
    line.setAttribute("y2", aL1);
    c.setAttribute("cy", aL1);
    resetVars()
})
length2.addEventListener("input",function(e){
    var l2v = document.getElementById("l2v")
    l2v.innerHTML = length2.value / 100
    l2 = length2.value / 100
    aL2 = l2 * 100
    c2.setAttribute("cy", aL2);
    line2.setAttribute("y2", aL2);
    resetVars()
})
mass1.addEventListener("input",function(e){
    m1 = mass1.value
    var m1v = document.getElementById("m1v")
    m1v.innerHTML = mass1.value
    resetVars()
})
mass2.addEventListener("input",function(e){
    var m2v = document.getElementById("m2v")
    m2v.innerHTML = mass2.value
    m2 = mass2.value
    resetVars()
})
gravity.addEventListener("input",function(e){
    var gv = document.getElementById("gv")
    gv.innerHTML = gravity.value
    g = gravity.value
    resetVars()
})


var resetVars = function() {
    av1 = 0
    av2 = 0
}
