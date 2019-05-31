var img = document.getElementById("vimage");

//GLOBALS
var m1 = 10;
var m2 = 10;
var theta1 = Math.PI / 4;
var theta2 = 2 * Math.PI / 3;
var av1 = 0;
var av2 = 0;
var l1 = 125;
var timestep = .2
var l2 = 125;
var aL1 = l1 * 1;
var aL2 = l2 * 1;

var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
var prevX = undefined;
var prevY = undefined;
line.setAttribute("x1", 0);
line.setAttribute("y1", 0);
line.setAttribute("x2", 0);
line.setAttribute("y2", aL1);
line.setAttribute("stroke","black");

var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
c.setAttribute("cx",0);
c.setAttribute("cy",aL1);
c.setAttribute("r",20);
c.setAttribute("fill","blue");
c.setAttribute("stroke","black");
group.appendChild(line);
group.appendChild(c);


var group2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
line2.setAttribute("x1", 0);
line2.setAttribute("y1", 0);
line2.setAttribute("x2", 0);
line2.setAttribute("y2", aL2);
line2.setAttribute("stroke","black");

var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
c2.setAttribute("cx",0);
c2.setAttribute("cy",aL2);
c2.setAttribute("r",20);
c2.setAttribute("fill","blue");
c2.setAttribute("stroke","black");
group2.appendChild(line2);
group2.appendChild(c2);


img.appendChild(group);
img.appendChild(group2);

var requestID;
var move = function() {
    window.cancelAnimationFrame(requestID);

    //After solving the equations for angular acceleration >>+-5349802349-85-230585823058-102357120-9571245712-05172389051DONT FORGET TO INCLUDE DERIVATION IN README
    let g = 9.81;
    let aa1 = -1 * g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2)*m2*(av2 * av2 * l2 + av1 * av1 * l1 * Math.cos(theta1 - theta2))
    aa1 /= l1 * (2 * m1 + m2 - m2 * Math.cos(2*theta1 - 2*theta2))

    let aa2 = 2 * Math.sin(theta1-theta2) * (av1 * av1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + av2 * av2 * l2 * m2 * Math.cos(theta1-theta2))
    aa2 /= l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2))

//Taken from https://gamedev.stackexchange.com/questions/15708/how-can-i-implement-gravity/41917#41917

    theta1 += timestep * (av1 + timestep * aa1 /2)
    theta2 += timestep * (av2 + timestep * aa2 /2)
    av1 += timestep * aa1
    av2 += timestep * aa2
    var na1 =  -1 * g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2)*m2*(av2 * av2 * l2 + av1 * av1 * l1 * Math.cos(theta1 - theta2))
    na1 /= l1 * (2 * m1 + m2 - m2 * Math.cos(2*theta1 - 2*theta2))
    var na2 =  2 * Math.sin(theta1-theta2) * (av1 * av1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + av2 * av2 * l2 * m2 * Math.cos(theta1-theta2))
    na2 /= l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2))
    av1 += timestep * (na1 - aa1) / 2;
    av2 += timestep * (na2 - aa2) / 2;

    group.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI)} 200 100) translate(200 100)`);
    let cx = 200 + aL1 * Math.cos(theta1 + Math.PI/2);
    let cy = 100 + aL1 * Math.sin(theta1 + Math.PI/2);
    group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);

    currentX = cx + aL2 * Math.cos(theta2 + Math.PI/2);
    currentY = cy + aL2 * Math.sin(theta2 + Math.PI/2);

    if (prevX != undefined) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${prevX} ${prevY} Q ${prevX} ${prevY} ${currentX} ${currentY}`);
        path.setAttribute("stroke", "black");
        path.setAttribute("fill", "transparent");
        img.appendChild(path);

    }

    prevX = currentX;
    prevY = currentY;




    updateChart()
    requestID = window.requestAnimationFrame(move);

}

move();
