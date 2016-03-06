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
s[0] = [];s[1] = [];s[2] = [];s[3] = [];

// # init CANONS
f = [2]
f[0] = {}
f[1] = {}

// # init MOUNTAINS, ripped from http://codepen.io/loktar00/pen/uEJKl/?editors=0010
m = [];
d = h/4, power = Math.pow(2, Math.ceil(Math.log(w) / (Math.log(2))));
// set the start height and end height for the terrain
m[power] = m[0] = h/4;
// create the rest of the points
for (l = 1; l < power; l *= 2) {
  for (j = (power / l) / 2; j < power; j += power / l) {
      m[j] = ((m[j - (power / l) / 2] + m[j + (power / l) / 2]) / 2) + (ran() * -d + d);
  }
  d *= 0.45;
}

setInterval(function() {

	function drawLine(x1,y1,x2,y2){
		if (ran() < 0.05) {
			c.strokeStyle = "rgba(255, 64, 255, 0.65)";
			c.lineWidth = 4;
		} else {
			c.strokeStyle = "rgba(255, 0, 255, 0.5)";
	    	c.lineWidth = 2;
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
    for (l = -50; l < 50; l++) {
    	drawLine(w/2, h/4, l*96 + frame%96, h);
    }
    //horizontal lines
    for (l = 0; l <20; l++) {
	    y = l * 179.75881754 / (8 + l * -0.43837106194) + h/2;
    	drawLine(0, y, w, y);
    }	
    //clear top lines
    clear(0,0,w,h/2);


	// __ draw gradient
	c.fillStyle = g;
	c.fillRect(0, 0, w, h/2);

	//__ draw stars
	c.fillStyle = "rgba(255, 255, 255, 0.5)";
	for (l = 0; l<4; l++) {		
		for (z = 0; z<64*4; z++) {
			if (!s[l][z]) {
				s[l][z] = [ran() * w, ran() * h, 1 + ran() * 1, 1 + ran() * 1];
			} else {
				s[l][z][0] += l*0.1;
			}
			c.fillRect(s[l][z][0], s[l][z][1], s[l][z][2], s[l][z][3]);
			if (s[l][z][0] > w) {
				s[l][z] = [0, ran() * h, , 1 + ran() * 1, 1 + ran() * 1];
			}
		}
	}

	// __ draw CANONS
	for (l = 0; l<2; l++) {		
		if (f[l].l > 0) {
			c.strokeStyle = "rgba(255, 0, 255, 0.3)";
			c.lineWidth = 6;
		    c.beginPath();
		    c.moveTo(f[l].s, h/2);
		    c.lineTo(f[l].t, 0);
		    c.closePath();  
		    c.stroke();	
		    f[l].l--;	
		} else {
			if (ran() < 0.1) {
				f[l].s = ran() * w;
				f[l].t = f[l].s + (ran() * 250) - 125;
				f[l].l = 80;
			}		
		}	
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
/*
    c.lineWidth = 4;
	c.strokeStyle = "#0ff";
    c.beginPath();
    c.moveTo(w/3, h/3);
    c.lineTo(w/1.5, h/3);
    c.lineTo(w/2, h/1.5);   
    c.lineTo(w/3, h/3);
    c.closePath();  
    c.stroke();
/*
    c.lineWidth = 2;
	c.strokeStyle = "#f0f";
    c.beginPath();
    c.moveTo(w/3-2, h/3+2);
    c.lineTo(w/1.5-2, h/3+2);
    c.lineTo(w/2-2, h/1.5+2);   
    c.lineTo(w/3-2, h/3+2);
    c.closePath();  
    c.stroke();*/


	frame+=0.5;
}, 50);

