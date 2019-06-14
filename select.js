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
        pathGroup.children = []

        varrow.setAttribute("transform", "scale(0)");
        varrow2.setAttribute("transform", "scale(0)");
        n = pathGroup.children.length
        for (let j = 0; j < n; j++) {
            pathGroup.removeChild(pathGroup.children[0])
        }
        currentX = undefined;
        currentY = undefined;
        resetVars();
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
        n = pathGroup.children.length
        for (let j = 0; j < n; j++) {
            pathGroup.removeChild(pathGroup.children[0])
        }

        varrow.setAttribute("transform", "scale(0)");
        varrow2.setAttribute("transform", "scale(0)");
        resetVars();
    }
})
window.addEventListener("mouseup", function(e){
    if(!paused){
        move();
    }
    mousedown1 = false;
    mousedown2 = false;

})
