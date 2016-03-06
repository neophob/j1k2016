w = a.width;
h = a.height;
frame=0;
ran = Math.random;

// # init gradient
g=c.createRadialGradient(w/2, h/1.3, h/3.0, w/2, h/1.3, h/1.3);
g.addColorStop(0, "rgba(255, 255, 255, 0.5)");
g.addColorStop(0.3, "rgba(255, 0, 255, 0.5)");
g.addColorStop(0.8, "rgba(0, 0, 255, 0.5)");
g.addColorStop(1, "rgba(0, 0, 0, 0.5)");

// # init STARS
s = [4]
for (layer = 0; layer<4; layer++) {
	s[layer] = [];
}

// # init MOUNTAINS, ripped from http://codepen.io/loktar00/pen/uEJKl/?editors=0010
m = [];
d = h/4, power = Math.pow(2, Math.ceil(Math.log(w) / (Math.log(2))));
// set the start height and end height for the terrain
m[power] = m[0] = h/4;
// create the rest of the points
for (i = 1; i < power; i *= 2) {
  for (j = (power / i) / 2; j < power; j += power / i) {
      m[j] = ((m[j - (power / i) / 2] + m[j + (power / i) / 2]) / 2) + (ran() * -d + d);
  }
  d *= 0.45;
}

setInterval(function() {

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
		c.fillStyle = "#000";
		c.fill();
	}    

	clear(0,0,w,h);

	// __ draw GRID
    //vertical lines
    for (grid = -50; grid < 50; grid++) {
    	drawLine(w/2, h/4, grid*96 + frame%96, h);
    }
    //horizontal lines
    for (grid = 0; grid <20; grid++) {
	    y = grid * 179.75881754 / (8 + grid * -0.43837106194) + h/2;
    	drawLine(0, y, w, y);
    }	
    //clear top lines
    clear(0,0,w,h/2);


	// __ draw gradient
	c.fillStyle = g;
	c.fillRect(0, 0, w, h/2);

	//__ draw stars
	size = 2;
	c.fillStyle = "rgba(255, 255, 255, 0.5)";
	for (layer = 0; layer<4; layer++) {		
		for (star = 0; star<64*4; star++) {
			if (!s[layer][star]) {
				s[layer][star] = [ran() * w, ran() * h];
			} else {
				s[layer][star][0] += layer*0.1;
			}
			c.fillRect(s[layer][star][0], s[layer][star][1], size, 1);
			if (s[layer][star][0] > w) {
				s[layer][star] = [0, ran() * h];
			}
		}
		size = 1;
	}

	//__ draw mountain
    c.lineWidth = 1;
	c.fillStyle = "#000";	
    c.beginPath();
    c.moveTo(0, h/4+m[0]);    
	for (i = 0; i<m.length; i++) {
	    c.lineTo(i * w / (m.length-1), h/4+h/2-m[i]);
	}
    c.closePath();  
    c.fill();

	frame++;
}, 50);

