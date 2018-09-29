spaceJs = function(){

var canvas = document.getElementById('space');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


// variables
var mouse = {
	x: undefined,
	y: undefined
};

var speed = 1;

// event listeners
window.addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// utility functions
function getAngle(x1, y1, x2, y2) {
	dx = x1 - x2;
	dy = y1 - y2;
	return Math.atan2(dy, dx);
}

function getDistance(x1, y1, x2, y2) {
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

//objects
function Planet(name, x, y, radius, velocity, distanceFromCenter, color, isMoon) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.velocity = velocity;
	this.radius = radius;
	this.radians = Math.random() * Math.PI * 2; 
	// this.angleToSun = 0;
	this.distanceFromCenter = distanceFromCenter;
	this.color = color;
	// this.mouseDistance = getDistance(mouse.x, mouse.y, this.x, this.y);

	this.update = function() {
		// circular motion
		this.radians += this.velocity;
		if (this === planets['earthMoon']) {
			this.x = planets['earth'].x + Math.cos(this.radians) * this.distanceFromCenter;
			this.y = planets['earth'].y + Math.sin(this.radians) * this.distanceFromCenter;
		} else {
			this.x = planets['sun'].x + Math.cos(this.radians) * this.distanceFromCenter;
			this.y = planets['sun'].y + Math.sin(this.radians) * this.distanceFromCenter;
		}
		this.angleToSun = getAngle(planets['sun'].x, planets['sun'].y, this.x, this.y);
		this.mouseDistance = getDistance(mouse.x, mouse.y, this.x, this.y);
		this.draw();
	}

	this.draw = function() {
		// planets
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();

		// planet shadows
		if (this !== planets['sun']) {
			c.beginPath();
			c.arc(
				this.x,
				this.y,
			  this.radius,
			  this.angleToSun + Math.PI / 2,
			  this.angleToSun - Math.PI / 2 ,
			  false
			);
			c.fillStyle = "rgba(10, 10, 10, 0.5)";
			c.fill();
			c.closePath();
		}

		if (this.mouseDistance < 50) {
			c.font = '18px raleway sans-serif';
			c.textAlign = 'center';
			c.fillStyle = "white";
			c.fillText(this.name, this.x, this.y - this.radius - 5);
		}
	}
}

function Star (x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function() {

		this.draw();
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
}

var planets = {};
var stars = [];
function init() {
	planets = {
		sun: new Planet(
			'sun',
			canvas.width / 2,
			canvas.height / 2,
			80,
			0,
			0,
			"rgb(244, 229, 66)"
		),
		mercury: new Planet(
			'mercury',
			canvas.width / 2,
			canvas.height / 2,
			4,
			0.04 * speed,
			120,
			"gray"
		), 
		venus: new Planet(
			'venus',
			canvas.width / 2,
			canvas.height / 2,
			6,
			0.015 * speed,
			160,
			"#fbf29a"
		),
		earth: new Planet(
			'earth',
			canvas.width / 2,
			canvas.height / 2,
			8,
			0.01 * speed,
			200,
			"#89e4ff"
		),
		earthMoon: new Planet(
			"our moon",
			canvas.width / 2,
			canvas.height / 2,
			3,
			0.12 * speed,
			18,
			"#ffffff"
		),
		mars: new Planet(
			'mars',
			canvas.width / 2,
			canvas.height / 2,
			7,
			0.00555 * speed,
			240,
			"#f98140"
		),
		jupiter: new Planet(
			'jupiter',
			canvas.width / 2,
			canvas.height / 2,
			15,
			0.00085 * speed,
			290,
			"#ffa315"
		),
		saturn: new Planet(
			'saturn',
			canvas.width / 2,
			canvas.height / 2,
			15,
			0.00036 * speed,
			340,
			"#f0e7b3"
		),
		uranus: new Planet(
			'uranus',
			canvas.width / 2,
			canvas.height / 2,
			10,
			0.0002 * speed,
			390,
			"#b3f0d9"
		),
		neptune: new Planet(
			'neptune',
			canvas.width / 2,
			canvas.height / 2,
			7,
			0.00007 * speed,
			440,
			"#46a6e1"
		)
	};
	stars = [];
	for(var i = 0; i < 300; i++ ) {
		stars.push(new Star(
			Math.random() * canvas.width,
			Math.random() * canvas.height,
			Math.floor(Math.random() * 3 + 1),
			"#fff"
		));
	}
}

//Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = "#152136";
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	stars.forEach(function(star) {
		star.update();
	})

	for (key in planets) {
    if (planets.hasOwnProperty(key)) {
      planets[key].update();
    }
	}
};

init();
animate();

}();