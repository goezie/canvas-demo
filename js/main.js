var projectsBtn = document.getElementById('projectsBtn');
var contactBtn = document.getElementById('contactBtn');
var previousBtn = document.getElementById('previousBtn');
var nextBtn = document.getElementById('nextBtn');
var canvasCount = 2;

previousBtn.addEventListener('click', previousCanvas);
nextBtn.addEventListener('click', nextCanvas);



function resetScroll()
{
	
}

function scrollToNext () 
{

}

var thisProject 
var nextProject

function nextCanvas ()
{
	thisProject = document.querySelector("section canvas:nth-child(" + canvasCount + ")");
	thisProject.classList.remove("show");
	if (canvasCount === 3) 
	{
		canvasCount = 1;
	} else
	{
		canvasCount++;
	}
	nextProject = document.querySelector("section canvas:nth-child(" + canvasCount + ")");
	nextProject.classList.add("show");
}

function previousCanvas () 
{
	thisProject = document.querySelector("section canvas:nth-child(" + canvasCount + ")");
	thisProject.classList.remove("show");
	if (canvasCount === 1) 
	{
		canvasCount = 3;
	} else 
	{
		canvasCount += -1;
	}
	nextProject = document.querySelector("section canvas:nth-child(" + canvasCount + ")");
	nextProject.classList.add("show");
}