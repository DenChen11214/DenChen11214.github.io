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
    let rect = img.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;
    if (mousedown1) {
        theta1 = Math.atan(-1 * (pivot[0]-mx)/(pivot[1]-my))
	if (pivot[1] - my >= 0) {
	    theta1 += Math.PI
	}
        group.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI)} 200 100) translate(200 100)`);
        let cx = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
        let cy = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
        group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);

        currentX = cx + aL2 * Math.cos(theta2 + Math.PI/2);
        currentY = cy + aL2 * Math.sin(theta2 + Math.PI/2);
        v1 = av1 * l1;
        v2 = av2 * l2;

        vline.setAttribute("x1", currentX)
        vline.setAttribute("y1", currentY)
        vline.setAttribute("x2", currentX)
        vline.setAttribute("y2", currentY + v2 * 10)
        vline.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI + 90)} ${currentX} ${currentY})`);
    }
})

img.addEventListener("mousemove",function(e){
    let rect = img.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;
    x = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
    y = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
    if (mousedown2) {
        theta2 = Math.atan(-1 * (x-mx)/(y-my))
	if (y - my >= 0) {
	    theta2 += Math.PI
	}
        group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${x} ${y}) translate(${x} ${y})`);

        currentX = x + aL2 * Math.cos(theta2 + Math.PI/2);
        currentY = y + aL2 * Math.sin(theta2 + Math.PI/2);
        v1 = av1 * l1;
        v2 = av2 * l2;

        vline.setAttribute("x1", currentX)
        vline.setAttribute("y1", currentY)
        vline.setAttribute("x2", currentX)
        vline.setAttribute("y2", currentY + v2 * 10)
        vline.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI + 90)} ${currentX} ${currentY})`);
    }
})
window.addEventListener("mouseup", function(e){
    if(!paused){
        move();
    }
    mousedown1 = false;
    mousedown2 = false;

})
