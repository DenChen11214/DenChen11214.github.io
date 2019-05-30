var img = document.getElementById("vimage");

//GLOBALS
var m1 = 10;
var m2 = 10;
var theta1
var theta2
var v1 = [0,0];
var v2 = [0,0];
var l1 = 30;
var l2 = 30;
var aL1 = l1 * 1;
var aL2 = l2 * 1;
var c1 = [10,0]
var c2 = [40,0]
var sin = Math.sin
var cos = Math.cos
var sqrt = Math.sqrt
var pow = Math.pow
var tension1
var tension2
var gravity = .981



var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
var prevX = undefined;
var prevY = undefined;
line.setAttribute("x1", 0);
line.setAttribute("y1", 0);
line.setAttribute("x2", 0);
line.setAttribute("y2", aL1);
line.setAttribute("stroke","black");

var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle1.setAttribute("cx",c1[0]);
circle1.setAttribute("cy",c1[1]);
circle1.setAttribute("r",20);
circle1.setAttribute("fill","red");
circle1.setAttribute("stroke","black");
group.appendChild(line);
group.appendChild(circle1);


var group2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
line2.setAttribute("x1", 0);
line2.setAttribute("y1", 0);
line2.setAttribute("x2", 0);
line2.setAttribute("y2", aL2);
line2.setAttribute("stroke","black");

var circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle2.setAttribute("cx",c2[0]);
circle2.setAttribute("cy",c2[1]);
circle2.setAttribute("r",20);
circle2.setAttribute("fill","blue");
circle2.setAttribute("stroke","black");
group2.appendChild(line2);
group2.appendChild(circle2);


img.appendChild(group);
img.appendChild(group2);

var requestID;
var move = function() {
    window.cancelAnimationFrame(requestID);
    var fg1 = m1 * gravity
    var fg2 = m2 * gravity
    theta1 = Math.asin((c2[1] - c1[1]) / l1)
    theta2 = Math.asin(c2[1] / l2)
    //After solving the equations for angular acceleration >>+-5349802349-85-230585823058-102357120-9571245712-05172389051DONT FORGET TO INCLUDE DERIVATION IN README
    tension1 = sin(theta1) * fg1 + sqrt(pow(sin(theta1),2) * pow(fg1,2) - pow(fg1,2) + pow(m1,2) * pow(sqrt(pow(v1[0],2) + pow(v1[1],2)),4) / pow(l1,2))
    // console.log(theta1)
    // console.log(pow(sin(theta1),2) * pow(fg1,2) - pow(fg1,2) + pow(m1,2) * pow(sqrt(pow(v1[0],2) + pow(v1[1],2)),4) / pow(l1,2))
    var alpha = fg2 + tension1 * sin(theta1)
    var beta = tension1 * sin(theta1)
    var gamma = pow(m2,2) * pow(sqrt(pow(v2[0],2) + pow(v2[1],2)),2) / pow(l2,2)
    var eta = sin(theta2) * alpha + cos(theta2) * beta
    tension2 = eta + sqrt(pow(eta,2) - pow(alpha,2) - pow(beta,2) + gamma)

    // prevX = currentX;
    // prevY = currentY;
    var a1 = [0,0]
    var a2 = [0,0]
    if(!Number.isNaN(tension1)){
        a1[0] -= tension1 * cos(theta1) / m1
        a1[1] -= tension1 * sin(theta1) / m1
        a2[0] += tension1 * cos(theta1) / m2
        a2[1] += tension1 * sin(theta1) / m2

    }
    if(!Number.isNaN(tension2)){
        a2[0] -= tension2 * cos(theta2) / m2
        a2[1] -= tension2 * sin(theta2) / m2
    }
    a1[1] += fg1 / m1
    a2[1] += fg2 / m2
    v1[0] += a1[0]
    v1[1] += a1[1]
    v2[0] += a2[0]
    v2[1] += a2[1]
    c1[0] += v1[0]
    c1[1] += v1[1]
    c2[0] += v2[0]
    c2[1] += v2[1]
    if (Number.isNaN(c1[0]) || Number.isNaN(c1[1])){
        window.cancelAnimationFrame(requestID);
        return
    }
    circle1.setAttribute("cx",c1[0])
    circle1.setAttribute("cy",c1[1])
    circle2.setAttribute("cx",c2[0])
    circle2.setAttribute("cy",c2[1])
    requestID = window.requestAnimationFrame(move);
}

move();
