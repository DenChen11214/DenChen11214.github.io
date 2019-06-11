var mousedown = false;
group.addEventListener("mousedown",function(e){
    window.cancelAnimationFrame(requestID)
    mousedown = true;
})
group2.addEventListener("mousedown",function(e){
    window.cancelAnimationFrame(requestID)
    resetVars();
    mousedown = true;
})
img.addEventListener("mousemove",function(e){
    if (mousedown) {
        theta1 = Math.atan(-1 * (pivot[0]-e.clientX)/(pivot[1]-e.clientY))
        group.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI)} 200 100) translate(200 100)`);
        let cx = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
        let cy = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
        group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);

        currentX = cx + aL2 * Math.cos(theta2 + Math.PI/2);
        currentY = cy + aL2 * Math.sin(theta2 + Math.PI/2);
    }
})
window.addEventListener("mouseup", function(e){
    if(!paused){
        move();
        mousedown = false;
    }
})
