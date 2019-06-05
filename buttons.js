var pause = document.getElementById("pause");
var play = document.getElementById("play");
var length1 = document.getElementById("length1")
var length2 = document.getElementById("length2")

pause.addEventListener("click", function() {
    window.cancelAnimationFrame(requestID);

})

play.addEventListener("click", function() {
    move();
})

length1.addEventListener("input",function(e){
    l1 = length1.value
    aL1 = l1 * 100
    line.setAttribute("y2", aL1);
    c.setAttribute("cy", aL1);
    av1 = 0
    av2 = 0
})
length2.addEventListener("input",function(e){
    l2 = length2.value
    aL2 = l2 * 100
    c2.setAttribute("cy", aL2);
    line2.setAttribute("y2", aL2);
    av1 = 0
    av2 = 0
})
