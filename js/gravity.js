gravityJs = function(){
	
var canvas = document.getElementById('gravity');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = [
	'rgba(63, 70, 255, 0.8)',
	'rgba(57, 140, 232, 0.8)',
	'rgba(76, 239, 255, 0.8)',
	'rgba(57, 232, 166, 0.8)',
	'rgba(65, 255, 94, 0.8)'
];

var gravity = 0.5;
/* 
var friction = 0.9; 
*/

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

addEventListener("click", function() {
	init();
})

//utility functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

//objects
function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy;
			this.dx = this.dx;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius + this.dx > canvas.width
			|| this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.strokeStyle = "#d9d9d9"
		c.stroke();
		c.closePath();
	}
}

// Implementation
var ball;
var ballArray = [];
function init() {
	ballArray = [];
	for (var i = 0; i < 50; i++) {
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(radius, canvas.height - radius);
		var dx = randomIntFromRange(-2, 2);
		var dy = randomIntFromRange(-2, 2);
		var radius = randomIntFromRange(10, 30);
		var color = randomColor(colors);
		ballArray.push(new Ball(x, y, dx, dy, radius, color));
	}
}

//Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}

}

init();
animate();

}();