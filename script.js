var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

width = Math.floor(width * 0.9);
height = Math.floor(height * 0.8);

var accel = 2;

var Xaccel = 0;
var Yaccel = accel;

var Xpos = 20;
var Ypos = 20;

var Xspeed = 0;
var Yspeed = 0;

var ball = document.getElementById("ball");

document.addEventListener("keydown", KeyReader);

function KeyReader(e)
{
	switch(e.keyCode)
	{
		case 37:
			Xaccel = -accel;
			Yaccel = 0;
			break;
		case 38:
			Xaccel = 0;
			Yaccel = -accel;
			break;
		case 39:
			Xaccel = accel;
			Yaccel = 0;
			break;
		case 40:
			Xaccel = 0;
			Yaccel = accel;
			break;
	}
}

function GameLogic()
{
	ball.style.left = Xpos + 'px';
	ball.style.top = Ypos + 'px';

	Xpos = Xpos + Xspeed + Xaccel / 2;
	Ypos = Ypos + Yspeed + Yaccel / 2;

	Xspeed = Xspeed + Xaccel;
	Yspeed = Yspeed + Yaccel;

	if(Xpos >= width)
	{
		Xpos = width;
		Xspeed = Math.ceil(-Xspeed * 0.8);
	}
	if(Xpos <= 0)
	{
		Xpos = 0;
		Xspeed = Math.floor(-Xspeed * 0.8);
	}

	if(Ypos >= height)
	{
		Ypos = height;
		Yspeed = Math.ceil(-Yspeed * 0.8);
	}
	if(Ypos <= 0)
	{
		Ypos = 0;
		Yspeed = Math.floor(-Yspeed * 0.8);
	}

	FrictionForce();

	requestAnimationFrame(GameLogic);
}

function FrictionForce()
{
	var FricAccel = 1;
	if((Xpos == 0 || Xpos == width) && Xspeed == 0)
	{
		Yspeed = Yspeed - FricAccel * ((Yspeed > 0) - (Yspeed < 0));
	}

	if((Ypos == 0 || Ypos == height) && Yspeed == 0)
	{
		Xspeed = Xspeed - FricAccel * ((Xspeed > 0) - (Xspeed < 0));
	}
}

GameLogic();