//Handles the Joystick
//center = initial center position (and rest position for joystick)
//radius = joystick radius
//tiltPos = where the user is tilting the joystick
function Joystick(centerX, centerY, radius) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;

	//this.tiltPosX = centerX;
	//this.tiltPosY = centerY;

	this.tiltMagnitude = 0;
	this.tiltAngle = 0;

	this.initialTouchX = 0;
	this.initialTouchY = 0;
}

//Handles what happens when the joystick is touched
function handleTouchStart(event){
	event.preventDefault();

	this.initialTouchX = touches[0].clientX;
	this.initialTouchY = touches[0].clientY;
}

//Move the joystick to the touch
function handleTouchMove(event){
	event.preventDefault();

	var touch = touches[0];
	var touchX = touch.clientX;
	var touchY = touch.clientY;

	var hypotenuse = touchX * touchX + touchY * touchY;

	//clamp the hypotenuse to the radius
	//var hypotenuseFixed = max(0, min(radius, hypotenuse)); 

	//this.tiltPosX = this.initialTouchX + ();
	//this.tiltPosY = ;

	this.tiltMagnitude = max(0, min(radius, hypotenuse));
	this.tiltAngle = Math.atan2(touchY - this.initialTouchY, touchX - this.initialTouchX);
}

//On touch end, snap the joystick back to its starting position
function handleTouchEnd(event){
	event.preventDefault();
	//this.tiltPosX = this.centerX;
	//this.tiltPosY = this.centerY;

	this.tiltMagnitude = 0;
	this.tiltAngle = 0;
}

function draw(canvas){
	var ctx = canvas.getContext("2d");

	//Draw joystick base
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.strokeStyle = "#003300";
	ctx.stroke();

	//Draw joystick head
	ctx.beginPath();
	ctx.arc(this.centerX + (this.tiltMagnitude * Math.cos(this.tiltAngle)), this.centerY + (this.tiltMagnitude * Math.sin(this.tiltAngle)), this.radius * 0.8, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#0000FF";
	ctx.fill();
	ctx.strokeStyle = "#001100";
	ctx.stroke();
}