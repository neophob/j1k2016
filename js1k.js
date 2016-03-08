w = a.width;
h = a.height;
u=0;

// # init gradient
g=c.createRadialGradient(w/2, h/1.3, h/3.0, w/2, h/1.3, h/1.3);
g.addColorStop(0, "rgba(255, 255, 255, 0.5)");
g.addColorStop(0.3, "rgba(255, 0, 255, 0.5)");
g.addColorStop(0.8, "rgba(0, 0, 255, 0.5)");
g.addColorStop(1, "rgba(0, 0, 0, 0.5)");

// see http://victorblog.com/html5-canvas-gradient-creator/

// # init STARS
s = [];

// # init CANONS
f = [ {}, {}, {} ];

// # init MOUNTAINS, ripped from http://codepen.io/loktar00/pen/uEJKl/?editors=0010
m = [];
// set the start height and end height for the terrain
m[1024] = m[0] = h/4;
// create the rest of the points
d = h/4;
for (l = 1; l < 1024; l *= 2) {
  for (z = (1024 / l) / 2; z < 1024; z += 1024 / l) {
      m[z] = ((m[z - (1024 / l) / 2] + m[z + (1024 / l) / 2]) / 2) + (Math.random() * -d + d);
  }
  d *= 0.45;
}

setInterval(function() {

  // clear
  c.rect(0,0,w,h);
  c.fillStyle = "#000";
  c.fill();

  i=32*Math.cos(u/188);

	// __ draw GRID
    //vertical lines
    for (l = -50; l < 50; l++) {
//    	drawLine(w/2, h/4, l*96 + u%96, h);
      c.strokeStyle = "rgba(255, 0, 255, 0.5)";
      c.lineWidth = 2;
  		if (Math.random() < 0.05) {
  			c.strokeStyle = "rgba(255, 64, 255, 0.7)";
  			c.lineWidth = 4;
  		}
	    c.beginPath();
	    c.moveTo(w/2+i, h/4+i*2);
	    c.lineTo(l*96 + u%96, h);
	    c.closePath();
	    c.stroke();
    }
    //horizontal lines
    for (l = 0; l <20; l++) {
	    y = l * 180 / (8 + l * -0.4) + h/2;
//    	drawLine(0, y, w, y);
      c.strokeStyle = "rgba(255, 0, 255, 0.5)";
      c.lineWidth = 2;
      if (Math.random() < 0.05) {
        c.strokeStyle = "rgba(255, 64, 255, 0.7)";
        c.lineWidth = 4;
      }
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(w, y);
      c.closePath();
      c.stroke();
    }

  //clear top lines
  c.rect(0,0,w,h/2);
  c.fillStyle = "#000";
  c.fill();

	// __ draw COLOR gradient
	c.fillStyle = g;
	c.fillRect(0, 0, w, h/2);

  // __ draw PLANETS
  c.fillStyle = "rgba(255, 255, 255, 0.06)";
  c.beginPath();
  c.arc(100, -h/8, h/2-i, 0, 2*Math.PI);
  c.arc(w/1.2, h/3, 150+i, 0, 2*Math.PI);
  c.fill();

	//__ draw stars
	c.fillStyle = "rgba(255, 255, 255, 0.5)";
	for (l = 0; l<500; l++) {
		if (!s[l]) {
      //init new star, array value: xpos, ypos, xsize, ysize, speed
			s[l] = [Math.random() * w, Math.random() * h , 1 + Math.random() * 2, 1 + Math.random() * 2, Math.random() * 0.4];
		} else {
      //move  right
			s[l][0] += s[l][4];
		}
		c.fillRect(s[l][0], (s[l][1]+i)%h/2, s[l][2], s[l][3]);
    s[l][0] %= w;
	}

	// __ draw CANONS, s: startpos, t: targetpos, l:lifetime
	for (l = 0; l<3; l++) {
		if (f[l].l > 0) {
			c.strokeStyle = "rgba(255, 0, 255, 0.3)";
			c.lineWidth = 6;
	    c.beginPath();
	    c.moveTo(f[l].s, h/2);
	    c.lineTo(f[l].t, 0);
	    c.closePath();
	    c.stroke();
	    f[l].l--;
		} else if (Math.random() < 0.1) {
      //reinit
			f[l].s = Math.random() * (w-250) + 125;
			f[l].t = f[l].s + (Math.random() * 250) - 125;
			f[l].l = 50 + Math.random() * 40;
		}
	}

	//__ draw mountain
  l=16*Math.cos(u/256);
  c.fillStyle = "#000";
  c.beginPath();
  c.moveTo(0, h/2);
	for (i = 0; i<m.length; i++) {
	    c.lineTo(i * w/(m.length-1), h*0.75-m[i] - l);
	}
  c.lineTo(w, h/2);
  c.closePath();
  c.fill();

  //draw TRIANGLE
  i=20*Math.cos(u/128);
  c.fillStyle = "rgba(255, 0, 255, 0.3)";
  c.strokeStyle = "#000";
  c.lineWidth = 2;
  c.beginPath();
  c.lineTo(w/2, h/2+127-i);//255*Math.sin(Math.PI/6) );
  c.lineTo(w/2-/*255*Math.cos(Math.PI/6)*/220.8-i, i+h/2-255 ); //top left
  c.lineTo(w/2+/*255*Math.cos(Math.PI/6)*/i+220.8, i+h/2-255 ); //top right
  c.closePath();
  c.stroke();
  c.fill();

	u+=2;
}, 50);
