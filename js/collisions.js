collisionsJs = function(){
// initial setup
var canvas = document.getElementById('collisions');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = [
	'#3F46FF',
	'#398CE8',
	'#4CEFFF',
	'#39E8A6',
	'#41FF5E'
];

var distance;

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

//utility functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
    const m1 = particle.mass;
    const m2 = otherParticle.mass;
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

//objects
function Particle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.velocity = {
		x: (Math.random() - 0.5) * 3,
		y: (Math.random() - 0.5) * 3
	};
	this.radius = radius;
	this.color = color;
	this.mass = 1;
	this.opacity = 0.05;


	this.update = function(particles) {
		this.draw();

		for (var i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;

			distance = getDistance(this.x, this.y, particles[i].x, particles[i].y);
			if ((distance - radius) - radius < 0) {
				resolveCollision(this, particles[i]);
			}
		}

		//wall collision bounce
		if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
			this.velocity.y = -this.velocity.y;
		}

		// mouse collision detection
		var mouseDistance = getDistance(this.x, this.y, mouse.x, mouse.y)
		if(mouseDistance < 80) {
			if (this.opacity < 0.4) {
				this.opacity += 0.02;
			} 
		} else if (this.opacity > 0.05) {
				this.opacity += -0.01;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;

	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.save();
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;
		c.fill();
		c.restore();
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	}
}

var particles;
function init() {
	particles = [];

	for (var i = 0; i < 100; i++) {
		var radius = 15;
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(radius, canvas.height - radius);
		var color = randomColor(colors);
		if( i !== 0) {

			for (var j = 0; j < particles.length; j++) {
				distance = getDistance(x, y, particles[j].x, particles[j].y);

				if ((distance - radius) - particles[j].radius < 0) {
					x = randomIntFromRange(radius, canvas.width - radius);
					y = randomIntFromRange(radius, canvas.height - radius);

					j = -1;
				}
			}
		}
		particles.push(new Particle(x, y, radius, color));	
	}
}

//Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach(function(particle) {
		particle.update(particles);
	});
};

init();
animate();

}();