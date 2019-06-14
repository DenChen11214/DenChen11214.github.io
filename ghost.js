


var gtheta1 = theta1 + .01;
var gtheta2 = theta2 + .01;
var gav1 = 0;
var gav2 = 0;

showGhost = false;
var ggroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
var gline = document.createElementNS("http://www.w3.org/2000/svg", "line");
var prevX = undefined;
var prevY = undefined;
gline.setAttribute("x1", 0);
gline.setAttribute("y1", 0);
gline.setAttribute("x2", 0);
gline.setAttribute("y2", aL1);
gline.setAttribute("stroke","black");

var gc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
gc.setAttribute("cx",0);
gc.setAttribute("cy",aL1);
gc.setAttribute("r",20);
gc.setAttribute("fill","#9cd08f");
gc.setAttribute("fill-opacity",0.8)
//c.setAttribute("stroke","black");
ggroup.appendChild(gline);
ggroup.appendChild(gc);


var ggroup2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
var gline2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
gline2.setAttribute("x1", 0);
gline2.setAttribute("y1", 0);
gline2.setAttribute("x2", 0);
gline2.setAttribute("y2", aL2);
gline2.setAttribute("stroke","black");

var gc2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
gc2.setAttribute("cx",0);
gc2.setAttribute("cy",aL2);
gc2.setAttribute("r",20);
gc2.setAttribute("fill","#9cd08f");
gc2.setAttribute("fill-opacity",0.8)
//gc2.setAttribute("stroke","black");
ggroup2.appendChild(gline2);
ggroup2.appendChild(gc2);


var pathggroup = document.createElementNS("http://www.w3.org/2000/svg", "g");


var gmove = function() {
    gtheta1 = ((gtheta1)% (Math.PI*2) + Math.PI * 2) % (Math.PI * 2)
    gtheta2 = ((gtheta2)% (Math.PI*2) + Math.PI * 2) % (Math.PI * 2)
    if (gtheta1 > Math.PI) {
        gtheta1 -= Math.PI * 2
    }
    if (gtheta2 > Math.PI) {
        gtheta2 -= Math.PI * 2
    }

    //After solving the equations for angular acceleration >>+-5349802349-85-230585823058-102357120-9571245712-05172389051DONT FORGET TO INCLUDE DERIVATION IN README

    for (var i = 0; i < timestepPerFrame; i++) {
        let aa1 = -1 * g * (2 * m1 + m2) * Math.sin(gtheta1) - m2 * g * Math.sin(gtheta1 - 2 * gtheta2) - 2 * Math.sin(gtheta1 - gtheta2)*m2*(gav2 * gav2 * l2 + gav1 * gav1 * l1 * Math.cos(gtheta1 - gtheta2))
        aa1 /= l1 * (2 * m1 + m2 - m2 * Math.cos(2*gtheta1 - 2*gtheta2))

        let aa2 = 2 * Math.sin(gtheta1-gtheta2) * (gav1 * gav1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(gtheta1) + gav2 * gav2 * l2 * m2 * Math.cos(gtheta1-gtheta2))
        aa2 /= l2 * (2 * m1 + m2 - m2 * Math.cos(2 * gtheta1 - 2 * gtheta2))

        //Taken from https://gamedev.stackexchange.com/questions/15708/how-can-i-implement-gravity/41917#41917

        gtheta1 += timestep * (gav1 + timestep * aa1 /2)
        gtheta2 += timestep * (gav2 + timestep * aa2 /2)
        gav1 += timestep * aa1
        gav2 += timestep * aa2
        var na1 =  -1 * g * (2 * m1 + m2) * Math.sin(gtheta1) - m2 * g * Math.sin(gtheta1 - 2 * gtheta2) - 2 * Math.sin(gtheta1 - gtheta2)*m2*(gav2 * gav2 * l2 + gav1 * gav1 * l1 * Math.cos(gtheta1 - gtheta2))
        na1 /= l1 * (2 * m1 + m2 - m2 * Math.cos(2*gtheta1 - 2*gtheta2))
        var na2 =  2 * Math.sin(gtheta1-gtheta2) * (gav1 * gav1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(gtheta1) + gav2 * gav2 * l2 * m2 * Math.cos(gtheta1-gtheta2))
        na2 /= l2 * (2 * m1 + m2 - m2 * Math.cos(2 * gtheta1 - 2 * gtheta2))
        gav1 += timestep * (na1 - aa1) / 2;
        gav2 += timestep * (na2 - aa2) / 2;
    }
    ggroup.setAttribute("transform", `rotate(${(gtheta1 * 180 / Math.PI)} ${pivot[0]} ${pivot[1]} ) translate(${pivot[0]} ${pivot[1]} )`);
    let cx = pivot[0] + aL1 * Math.cos(gtheta1 + Math.PI/2);
    let cy = pivot[1] + aL1 * Math.sin(gtheta1 + Math.PI/2);
    ggroup2.setAttribute("transform", `rotate(${(gtheta2 * 180 / Math.PI)} ${cx} ${cy}) translate(${cx} ${cy})`);
}
