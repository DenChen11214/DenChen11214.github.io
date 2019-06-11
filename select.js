var mousedown1 = false;
var mousedown2 = false;
group.addEventListener("mousedown",function(e){
    window.cancelAnimationFrame(requestID)
    resetVars();
    mousedown1 = true;
})
group2.addEventListener("mousedown",function(e){
    window.cancelAnimationFrame(requestID)
    resetVars();
    mousedown2 = true;
})
img.addEventListener("mousemove",function(e){
    if (mousedown1) {
        theta1 = Math.atan(-1 * (pivot[0]-e.clientX)/(pivot[1]-e.clientY))
	if (pivot[1] - e.clientY >= 0) {
	    theta1 += Math.PI
	}
        group.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI)} 200 100) translate(200 100)`);
        let cx = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
        let cy = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
        group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);

        currentX = cx + aL2 * Math.cos(theta2 + Math.PI/2);
        currentY = cy + aL2 * Math.sin(theta2 + Math.PI/2);
    }
})

img.addEventListener("mousemove",function(e){
    x = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
    y = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
    if (mousedown2) {
        theta2 = Math.atan(-1 * (x-e.clientX)/(y-e.clientY))
	if (y - e.clientY >= 0) {
	    theta2 += Math.PI
	}
        group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${x} ${y}) translate(${x} ${y})`);

        currentX = x + aL2 * Math.cos(theta2 + Math.PI/2);
        currentY = y + aL2 * Math.sin(theta2 + Math.PI/2);
    }
})
window.addEventListener("mouseup", function(e){
    if(!paused){
        move();
    }
    mousedown1 = false;
    mousedown2 = false;
    
})
