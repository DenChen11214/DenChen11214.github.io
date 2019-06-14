var img = document.getElementById("vimage");
var content = document.getElementById("content");
// img.setAttribute("height",content.height)
// img.setAttribute("width",content.width)

//GLOBALS
var pivot = [img.getAttribute("width") / 2, 50];
var m1 = 10;
var m2 = 10;
var theta1 = Math.PI / 2;
var theta2 = Math.PI / 2;
var av1 = 0;
var av2 = 0;
var l1 = 1;
var timestep = .01;
var timestepPerFrame = 1;
var l2 = 1;
var aL1 = l1 * 100;
var aL2 = l2 * 100;
var g = 9.81
var showGhost = false;
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
c.setAttribute("fill","#dab6c4");
c.setAttribute("fill-opacity",0.8)

//c.setAttribute("stroke","black");
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
c2.setAttribute("fill","#dab6c4");
c2.setAttribute("fill-opacity",0.8)

//c2.setAttribute("stroke","black");
group2.appendChild(line2);
group2.appendChild(c2);

var varrow = document.createElementNS("http://www.w3.org/2000/svg", "g");
var vline = document.createElementNS("http://www.w3.org/2000/svg", "line");
vline.setAttribute("x1", 0);
vline.setAttribute("y1", 0);
vline.setAttribute("x2", 0);
vline.setAttribute("y2", aL2);
vline.setAttribute("stroke","black");

var head1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
head1.setAttribute("x1", 0);
head1.setAttribute("y1", aL2);
head1.setAttribute("x2", 0 - 20);
head1.setAttribute("y2", aL2 - 20);
head1.setAttribute("stroke","black");


var head2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
head2.setAttribute("x1", 0);
head2.setAttribute("y1", aL2);
head2.setAttribute("x2", 0 + 20);
head2.setAttribute("y2", aL2 - 20);
head2.setAttribute("stroke","black");

var varrow2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
var vline2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
vline2.setAttribute("x1", 0);
vline2.setAttribute("y1", 0);
vline2.setAttribute("x2", 0);
vline2.setAttribute("y2", aL1);
vline2.setAttribute("stroke","black");

var head12 = document.createElementNS("http://www.w3.org/2000/svg", "line");
head12.setAttribute("x1", 0);
head12.setAttribute("y1", aL1);
head12.setAttribute("x2", 0 - 20);
head12.setAttribute("y2", aL1 - 20);
head12.setAttribute("stroke","black");


var head22 = document.createElementNS("http://www.w3.org/2000/svg", "line");
head22.setAttribute("x1", 0);
head22.setAttribute("y1", aL1);
head22.setAttribute("x2", 0 + 20);
head22.setAttribute("y2", aL1 - 20);
head22.setAttribute("stroke","black");

varrow2.appendChild(vline2);
varrow2.appendChild(head12);
varrow2.appendChild(head22);

varrow.appendChild(vline);
varrow.appendChild(head1);
varrow.appendChild(head2);


var pathGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

img.appendChild(pathGroup);
img.appendChild(group2);
img.appendChild(group);
img.appendChild(varrow);
img.appendChild(varrow2);

var counter = 0;
var requestID;
var lastSign
var move = function() {
    theta1 = ((theta1)% (Math.PI*2) + Math.PI * 2) % (Math.PI * 2)
    theta2 = ((theta2)% (Math.PI*2) + Math.PI * 2) % (Math.PI * 2)
    if (theta1 > Math.PI) {
        theta1 -= Math.PI * 2
    }
    if (theta2 > Math.PI) {
        theta2 -= Math.PI * 2
    }

    window.cancelAnimationFrame(requestID);

    //After solving the equations for angular acceleration >>+-5349802349-85-230585823058-102357120-9571245712-05172389051DONT FORGET TO INCLUDE DERIVATION IN README

    for (var i = 0; i < timestepPerFrame; i++) {
        let aa1 = -1 * g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2)*m2*(av2 * av2 * l2 + av1 * av1 * l1 * Math.cos(theta1 - theta2))
        aa1 /= l1 * (2 * m1 + m2 - m2 * Math.cos(2*theta1 - 2*theta2))

        let aa2 = 2 * Math.sin(theta1-theta2) * (av1 * av1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + av2 * av2 * l2 * m2 * Math.cos(theta1-theta2))
        aa2 /= l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2))

        //Integration taken from https://gamedev.stackexchange.com/questions/15708/how-can-i-implement-gravity/41917#41917

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
    }
    group.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI)} ${pivot[0]} ${pivot[1]} ) translate(${pivot[0]} ${pivot[1]} )`);
    let cx = pivot[0] + aL1 * Math.cos(theta1 + Math.PI/2);
    let cy = pivot[1] + aL1 * Math.sin(theta1 + Math.PI/2);
    group2.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);

    currentX = cx + aL2 * Math.cos(theta2 + Math.PI/2);
    currentY = cy + aL2 * Math.sin(theta2 + Math.PI/2);

    if (prevX != undefined) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${prevX} ${prevY} Q ${prevX} ${prevY} ${currentX} ${currentY}`);
        path.setAttribute("stroke", "orange");
        path.setAttribute("fill", "transparent");
        pathGroup.appendChild(path);
        if (pathGroup.children.length > 100) {
            pathGroup.removeChild(pathGroup.children[0])
        }
        v1 = av1 * l1;
        v2 = av2 * l2;


        varrow.setAttribute("transform", `rotate(${(theta2 * 180 / Math.PI + 90)} ${currentX} ${currentY})
                                          translate(${currentX} ${currentY})
                                          scale(${v2/7})`);
        varrow2.setAttribute("transform", `rotate(${(theta1 * 180 / Math.PI + 90)} ${cx} ${cy})
                                          translate(${cx} ${cy})
                                          scale(${v1/7})`);



    }

    prevX = currentX;
    prevY = currentY;


    //Energy Calculation
    //KE
    ke = .5 * m1 * l1 * l1 * av1 * av1 + .5 * m2 * (l1 * l1 * av1 * av1 + l2 * l2 * av2 * av2 + 2 * l1 * l2 * av1 * av2 * Math.cos(theta1 - theta2))
    //GPE
    u1 = g * m1 * (-1 * l1 * Math.cos(theta1) + l1 + l2)
    u2 = g * m2 * (-1 * l2 * Math.cos(theta2) + -1 * l1 * Math.cos(theta1) + l2 + l1)
    u = u1+u2

    if (counter % 5 == 0) {
        if(!showAngle){
            updateChart(ke + u, ke, u)
        }
        else{
            updateChart2(theta1,theta2)
	    updateChart(ke + u, ke, u)
        }

    }
    counter += 1;
    time += timestep
    requestID = window.requestAnimationFrame(move);
    if(av2 > 0){
        lastSign = 1
    }
    else{
        lastSign = -1
    }
    if (showGhost == true) {
        gmove();
    }
}

move();
