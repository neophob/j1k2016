w = a.width;
h = a.height;
u=0;

// # init gradient
g=c.createRadialGradient(w/2, h/1.3, h/3, w/2, h/1.3, h/1.3);
g.addColorStop(0, "#777");
g.addColorStop(0.3, "#707");
g.addColorStop(0.8, "#007");
g.addColorStop(1, "#000");
// # init STARS
s = [];
// # init CANONS
f = [];
// # init MOUNTAINS, ripped from http://codepen.io/loktar00/pen/uEJKl/?editors=0010
m = [];

// set the start height and end height for the terrain
d = m[1024] = m[0] = h/4;
// create the rest of the points
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
  c.strokeStyle = "rgba(255, 0, 255, 0.5)";
  c.fillStyle = "rgba(0, 0, 96, 0.1)";

  //horizontal lines
  for (l = 0; l <20; l++) {
    c.lineWidth = 2;
    y = l * 180 / (8 + l * -0.4) + h/2;
    //draw blue bg
    c.rect(0, y-20, w, y);
    c.fill();

    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(w, y);
    c.stroke();
  }
  //vertical lines
  for (l = -50; l < 50; l++) {
    c.lineWidth = 2;
		if (Math.random() < 0.05) {
			c.lineWidth = 4;
		}
    c.beginPath();
    c.moveTo(w/2+i, h/4+i*2);
    c.lineTo(l*96 + u%96, h);
    c.stroke();
  }

  // __ draw COLOR gradient
	c.fillStyle = g;
	c.fillRect(0, 0, w, h/2);

  // __ draw PLANETS
  i=8*Math.cos(u/222);

  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  c.beginPath();
  c.arc(100, -h/8, h/2-i, 0, 2*Math.PI);
  c.arc(w, h/4, h/5+i, 0, 2*Math.PI);
  c.fill();

	//__ draw stars
	for (l = 0; l<1200; l++) {
    c.fillStyle = "rgba(255, 255, 255, 0.25)";
		if (!s[l]) {
      //init new star, array value: xpos, ypos, xsize, ysize, speed
			s[l] = [Math.random() * w, Math.random() * h , 1 + Math.random() * 2, 1 + Math.random() * 2, Math.random() * 0.4];
    }
    s[l][0] += s[l][4];
    c.fillRect(s[l][0], (s[l][1]+i)%h/2, s[l][2], s[l][3]);
    s[l][0] %= w;
	}

	// __ draw CANONS, s: startpos, t: targetpos, l:lifetime
  c.strokeStyle = "rgba(255, 0, 255, 0.3)";
  c.lineWidth = 6;
	for (l = 0; l<1200; l++) {
    if (l==3) c.strokeStyle = "rgba(255, 0, 255, 0.006)";
		if (f[l] && f[l].l > 0) {
      c.beginPath();
	    c.moveTo(f[l].s, h/2);
	    c.lineTo(f[l].t, 0);
      c.stroke();
	    f[l].l--;
		} else if (Math.random() < 0.1) {
      //reinit
      f[l] = {};
			f[l].s = Math.random() * w;
      f[l].t = f[l].s + (Math.random() * h/2) - h/4;
      f[l].l = 30 + Math.random() * 60;
      if (l<4) {
  			f[l].l += 30;
      }
		}
	}

	//__ draw mountain
  l=16*Math.cos(u/256);
  c.fillStyle = "#000";
  c.beginPath();
  c.moveTo(0, h/2);
	for (i = 0; i<1024; i++) {
	    c.lineTo(i * w/(1023), h*0.7 - m[i] - l);
	}
  c.lineTo(w, h/2);
  c.fill();

  //draw TRIANGLE
  i=20*Math.cos(u/128);
  c.strokeStyle = "#000";
  c.lineWidth = 2;
  c.fillStyle = "rgba(255, 0, 255, 0.3)";
  c.beginPath();
  c.lineTo(w/2, 2*h/3-i);
  c.lineTo(w/2-i+0.87*-h/3, i+ h/6 ); //top left, Math.cos(Math.PI/6) = 0.8660254037844387
  c.lineTo(w/2+i+0.87* h/3, i+ h/6 ); //top right Math.cos(Math.PI/6) = 0.8660254037844387
  c.closePath();
  c.stroke();
  c.fill();

	u+=2;
}, 1);
