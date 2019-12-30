let canvas = document.getElementById("myLoading");
let ctx = canvas.getContext("2d");

canvas.width = canvas.offsetHeight;
canvas.height = canvas.offsetHeight;

let duration = 4000;
let center = {x: canvas.width/2, y:canvas.height/2};
let lineWidth = canvas.width / 10;
let arrowWidth = lineWidth * 3;
let radius = canvas.width/2 - arrowWidth/2;
let color = getComputedStyle(canvas).color;

let arrow1 = {
  startAngle: 1/2 * Math.PI + 0.6,
  endAngle: 3/2 * Math.PI
};

let arrow2 = {
  startAngle: 3/2 * Math.PI + 0.6,
  endAngle: 1/2 * Math.PI
};

let start = 0;
let progress = 0;
function animate(timestamp){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(start == 0){
    start = timestamp;
  }
  progress = (timestamp - start) / duration;
  progressInAngle = progress * Math.PI * 2;

  draw(arrow1.startAngle + progressInAngle, arrow1.endAngle + progressInAngle);
  draw(arrow2.startAngle + progressInAngle, arrow2.endAngle + progressInAngle);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function draw(startAngle, endAngle){
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, startAngle, endAngle);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  let arrowTop = getPointOnCircle(center, radius, endAngle + 0.3);
  ctx.moveTo(arrowTop.x, arrowTop.y);

  let arrowLeft = getPointOnCircle(center, radius - arrowWidth/2, endAngle);
  ctx.lineTo(arrowLeft.x, arrowLeft.y);

  let arrowRight = getPointOnCircle(center, radius + arrowWidth/2, endAngle);
  ctx.lineTo(arrowRight.x, arrowRight.y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function getPointOnCircle(center, radius, angle){
  let pX = center.x + Math.cos(angle) * radius;
  let pY = center.y + Math.sin(angle) * radius;
  return {x: pX, y:pY};
}
