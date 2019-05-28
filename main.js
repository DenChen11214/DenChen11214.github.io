var img = document.getElementById("vimage");

var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", 50);
line.setAttribute("y1", 50);
line.setAttribute("x2", 100);
line.setAttribute("y2", 100);
line.setAttribute("stroke","black");

var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
c.setAttribute("cx",50);
c.setAttribute("cy",50);
c.setAttribute("r",20);
c.setAttribute("fill","blue");
c.setAttribute("stroke","black");
group.appendChild(c);
group.appendChild(line);
img.appendChild(group);
