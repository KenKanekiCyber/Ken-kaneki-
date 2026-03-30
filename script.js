// 💎 RED FLUID CURSOR TRAIL
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// 🎵 MUSIC TOGGLE
const music = document.getElementById("music");
const btn = document.getElementById("musicToggle");
let playing = false;
btn.onclick = () => {
  if (playing) { music.pause(); btn.innerText = "🔇"; }
  else { music.play(); btn.innerText = "🎵"; }
  playing = !playing;
};

// ⚡ PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for (let i=0;i<100;i++) {
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2,
    speedX: Math.random()-0.5,
    speedY: Math.random()-0.5
  });
}
function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.speedX;
    p.y+=p.speedY;
    ctx.fillStyle="#ff0000";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// 🩸 RED FLUID TRAIL
const canvasTrail = document.createElement("canvas");
document.body.appendChild(canvasTrail);
const ctxTrail = canvasTrail.getContext("2d");
canvasTrail.style.position="fixed";
canvasTrail.style.top="0";
canvasTrail.style.left="0";
canvasTrail.style.pointerEvents="none";
canvasTrail.style.zIndex="9999";
canvasTrail.width=window.innerWidth;
canvasTrail.height=window.innerHeight;
let trail=[];
document.addEventListener("mousemove", e => {
  for(let i=0;i<3;i++){
    trail.push({x:e.clientX+Math.random()*6-3,y:e.clientY+Math.random()*6-3,size:6+Math.random()*4,alpha:1});
  }
});
function animateTrail(){
  ctxTrail.fillStyle="rgba(0,0,0,0.08)";
  ctxTrail.fillRect(0,0,canvasTrail.width,canvasTrail.height);
  for(let i=0;i<trail.length;i++){
    let p=trail[i];
    let gradient = ctxTrail.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*2);
    gradient.addColorStop(0,`rgba(255,0,0,${p.alpha})`);
    gradient.addColorStop(1,"rgba(255,0,0,0)");
    ctxTrail.fillStyle = gradient;
    ctxTrail.beginPath();
    ctxTrail.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctxTrail.fill();
    p.size*=0.96;
    p.alpha*=0.92;
    if(p.alpha<0.05){trail.splice(i,1);i--;}
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();
window.addEventListener("resize",()=>{canvasTrail.width=window.innerWidth;canvasTrail.height=window.innerHeight;});