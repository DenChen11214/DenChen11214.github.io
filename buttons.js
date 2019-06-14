var pause = document.getElementById("pause");
var pauseImg = document.getElementById("wot");
var length1 = document.getElementById("length1")
var length2 = document.getElementById("length2")
var mass1 = document.getElementById("mass1")
var mass2 = document.getElementById("mass2")
var gravity = document.getElementById("gravity")
var angleChart = document.getElementById("angle")
var energyChart = document.getElementById("energy");
var angleC = document.getElementById("anglechart")
var energyC = document.getElementById("energychart")
var arrow = document.getElementById("showArrow")
var showPend = document.getElementById("showG")
var randomize = document.getElementById("randomize")
showPend.checked = true;
arrow.checked = true;
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
    if (!(paused)) {
	window.cancelAnimationFrame(requestID);
	paused = true
	pauseImg.src = "play-button.svg"
    } else {
	move();
	paused = false;
	pauseImg.src = "pause.svg"
    }
})

length1.addEventListener("input",function(e){
    var l1v = document.getElementById("l1v")
    l1v.innerHTML = length1.value / 100
    l1 = length1.value / 100
    aL1 = l1 * 100
    line.setAttribute("y2", aL1);
    c.setAttribute("cy", aL1);
    gc.setAttribute("cy", aL1);
    gline.setAttribute("y2",aL1);
    resetVars()
})
length2.addEventListener("input",function(e){
    var l2v = document.getElementById("l2v")
    l2v.innerHTML = length2.value / 100
    l2 = length2.value / 100
    aL2 = l2 * 100
    c2.setAttribute("cy", aL2);
    gc2.setAttribute("cy", aL2);
    line2.setAttribute("y2", aL2);
    gline2.setAttribute("y2",aL2);
    resetVars()
})
mass1.addEventListener("input",function(e){
    m1 = mass1.value * 1
    var m1v = document.getElementById("m1v")
    m1v.innerHTML = mass1.value
    resetVars()
})
mass2.addEventListener("input",function(e){
    var m2v = document.getElementById("m2v")
    m2v.innerHTML = mass2.value
    m2 = mass2.value * 1
    resetVars()
})
gravity.addEventListener("input",function(e){
    var gv = document.getElementById("gv")
    gv.innerHTML = gravity.value
    g = gravity.value * 1
    resetVars()
})

arrow.addEventListener("input",function(e){
    if(arrow.checked){
        vimage.appendChild(varrow);
        vimage.appendChild(varrow2);
    }
    else{
        vimage.removeChild(varrow);
        vimage.removeChild(varrow2);
    }
})
showPend.addEventListener("input",function(e){
    if(showPend.checked){
        showGhost = true
        gav1 = av1
        gav2 = av2
        img.appendChild(pathggroup);
        img.appendChild(ggroup2);
        img.appendChild(ggroup);
        gtheta1 = theta1 + .05;
        gtheta2 = theta2 + .05;
    }
    else{
        showGhost = false
        img.removeChild(pathggroup);
        img.removeChild(ggroup2);
        img.removeChild(ggroup);
    }
})
randomize.addEventListener("click",function(e){
    window.cancelAnimationFrame(requestID);
    theta1 = Math.random() * Math.PI * 2
    theta2 = Math.random() * Math.PI * 2
    resetVars();
    av1 = Math.random()
    av2 = Math.random()
    gav1 = av1;
    gav2 = av2;
    move();
})
var resetVars = function() {
    av1 = 0
    av2 = 0
    gav2 = 0
    gav1 = 0
    gtheta1 = theta1 + 0.05
    gtheta2 = theta2 + 0.05
    ggroup.setAttribute("transform", `rotate(${(gtheta1 * 180 / Math.PI)} ${pivot[0]} ${pivot[1]} ) translate(${pivot[0]} ${pivot[1]} )`);
    let cx = pivot[0] + aL1 * Math.cos(gtheta1 + Math.PI/2);
    let cy = pivot[1] + aL1 * Math.sin(gtheta1 + Math.PI/2);
    ggroup2.setAttribute("transform", `rotate(${(gtheta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);
}
