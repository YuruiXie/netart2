const canvas = document.getElementsByTagName("canvas")[0],
      c = canvas.getContext("2d");
let   circles = [],
      t = 1,
      toDrawX = 0,
      incrementer = 1;
      toDrawY = 0;

function init() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  toDrawX = window.innerWidth / 20;
  toDrawY = window.innerHeight / 20;
  canvas.addEventListener("mousemove", (e) => {
    addCircle(e.clientX, e.clientY);
  });
}

function Circle(x, y) {
  let radius = 100;
  let maxRadius = 1000;

  const circle = {
    init() {
      return this;
    },
    draw() {
      c.strokeStyle = `rgba(255,255,255,${1 / (radius / 10)})`;
      c.beginPath();
      c.arc(x, y, radius, 0, 2*Math.PI);
      // c.fillStyle="#FFff23";
      // c.fill();
      c.stroke();

      return this;
    },
    pushToArray() {
      circles.push(this);
      return this;
    },
    grow() {
      radius += .6;
      return this;
    },
    isDead() {
      return radius > maxRadius;
    }
  }

  return circle;
}

function addCircle(x, y) {
  new Circle(x, y).init().draw().pushToArray();
}

function run() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  const temp = [];
  circles.forEach(circle => {
    if (!circle.grow().draw().isDead()) {
      temp.push(circle);
    }
  })
  circles = temp;
  t += incrementer;
  toDrawX = Math.cos(t * Math.PI / 50) + canvas.width / 2;
  toDrawY = Math.sin(t * Math.PI / 100) + canvas.height / 2;
  addCircle(toDrawX, toDrawY);
  if (t > Math.max(canvas.width, canvas.height)) {
    incrementer = -1;
  }
  if (t < 10) {
    incrementer = 10;
  }
  return window.requestAnimationFrame(run);
}

function resizeCanvas() {
  canvas.width = window.innerWidth+"px";
  canvas.height = window.innerHeight+"px";
  c.clearRect(0, 0, canvas.width, canvas.height);

}

window.addEventListener('resize', resizeCanvas, false);

init();
run();
