var img = document.getElementById("vimage");

//GLOBALS
var m1 = 10;
var m2 = 10;

var v1 = [0,0];
var v2 = [0,0];
var l1 = 100;
var l2 = 100;
var aL1 = l1 * 1;
var aL2 = l2 * 1;
var c1 = [100,0]
var c2 = [200,0]

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


    prevX = currentX;
    prevY = currentY;





    requestID = window.requestAnimationFrame(move);

}

move();
