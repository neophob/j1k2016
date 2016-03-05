w = a.width;
h = a.height;
n = (k = c.createImageData(w, h)).data;
frame=0;
ran = Math.random;
//How to draw a Perspective-Correct Grid in 2D
//https://jsfiddle.net/epistemex/vz8qk4q1/

// -------------------------------
var grd=c.createRadialGradient(w/2, h/1.3, h/3.0, w/2, h/1.3, h/1.3);
grd.addColorStop(0, "rgba(255, 255, 255, 0.5)");
grd.addColorStop(0.3, "rgba(255, 0, 255, 0.5)");
grd.addColorStop(0.8, "rgba(0, 0, 255, 0.5)");
grd.addColorStop(1, "rgba(0, 0, 0, 0.5)");

function drawLine(x1,y1,x2,y2){
    c.lineWidth = 2;
	if (ran() < 0.01) {
		c.strokeStyle = "rgba(255, 0, 255, 0.7)";
	} else {
		c.strokeStyle = "rgba(255, 0, 255, 0.5)";
	}	

    c.beginPath();
    c.moveTo(x1, y1); 
    c.lineTo(x2, y2);
    c.closePath();  
    c.stroke();
}    

function clear(x1,y1,x2,y2){
	c.rect(x1,y1,x2,y2);
	c.fillStyle = "rgba(0, 0, 0, 1)";
	c.fill();
}    

function drawGrid() {
    gridabstand = 96;    
    gridsteps = parseInt(w / gridabstand);

    //vertical lines
    for (grid = -50; grid < 50; grid++) {
    	drawLine(w/2, 50, grid*gridabstand + frame%gridabstand, h);
    }

    //horizontal lines
    rd = -26 * Math.PI / 180;
    //rd = -24 * Math.PI / 180;
    ca = Math.cos(rd);
    sa = Math.sin(rd);
    for (grid = 0; grid <20; grid++) {
	    ry = grid * ca;
	    rz = grid * sa;
	    f = 200 / (8 + rz);
	    y = ry * f + h/2;

    	drawLine(0, y, w, y);
    }	

    //clear top lines
    clear(0,0,w,h/2);
}

stars = [4]
for (layer = 0; layer<4; layer++) {
	stars[layer] = [];
}
function drawStars() {
	size = 2;
	for (layer = 0; layer<4; layer++) {
		c.fillStyle = "rgba(255, 255, 255, 0.5)";

		for (star = 0; star<64; star++) {
			if (!stars[layer][star]) {
				stars[layer][star] = [ran() * w, ran() * h/2.2];
			} else {
				stars[layer][star][0] += layer*0.1;
			}
			x = stars[layer][star][0];
			y = stars[layer][star][1];
			c.fillRect(x, y, size, 1);
			if (stars[layer][star][0] > w) {
				stars[layer][star] = [0, ran() * h/2.2];
			}
		}
		size = 1;
	}
}

//ripped from http://codepen.io/loktar00/pen/uEJKl/?editors=0010
mountain = [];
var displacement = h/4, power = Math.pow(2, Math.ceil(Math.log(w) / (Math.log(2))));

// set the start height and end height for the terrain
mountain[0] = h/4;
mountain[power] = mountain[0];

// create the rest of the points
for (var i = 1; i < power; i *= 2) {
  for (var j = (power / i) / 2; j < power; j += power / i) {
      mountain[j] = ((mountain[j - (power / i) / 2] + mountain[j + (power / i) / 2]) / 2) + Math.floor(Math.random() * -displacement + displacement);
  }
  displacement *= 0.45;
}

function brownianMotion() {
    c.lineWidth = 1;
	c.fillStyle = "rgba(0, 0, 0, 1)";
    c.beginPath();
    c.moveTo(0, h/4+mountain[0]);
    l = w / (mountain.length-1); 
	for (m = 0; m<mountain.length; m++) {
	    c.lineTo(m * l, h/4+h/2-mountain[m]);
	}
    c.closePath();  
    c.fill();
}

setInterval(function() {
	clear(0,0,w,h);
	drawGrid();

	//gradient
	c.fillStyle = grd;
	c.fillRect(0, 0, w, h/2);

	drawStars();
	brownianMotion()

	frame++;
}, 50);

