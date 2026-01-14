let drag = false;
let offsetX = 0;
let offsetY = 0;
let kickFlipperElement;
let mobileNavCluster = undefined;
let timer = 0;

setInterval(() => {
  timer += 1;
  if (timer >= 360) {
    timer = 0;
  }
}, 10);

// media query stuff to handle layout change
const desktopMediaQueryList = window.matchMedia("(width >= 768px)");

const mobileMediaQueryList = window.matchMedia("(width < 768px)");

desktopMediaQueryList.addEventListener("change", onDesktopMediaQueryChange);
mobileMediaQueryList.addEventListener("change", onMobileMediaQueryChange);

function onDesktopMediaQueryChange(mql) {
  if (mql.matches) {
    const navCluster = document.querySelector(".nav-cluster");
    const clusterRows = document.querySelectorAll(".cluster-row");
    const pageBody = document.querySelector(".page-body");
    const homeSummary = document.querySelector(".home-summary");
    mobileNavCluster = navCluster.cloneNode(true);
    pageBody.insertBefore(clusterRows[0], pageBody.firstChild);
    homeSummary.after(clusterRows[1]);
    navCluster.remove();
  }
}

function onMobileMediaQueryChange(mql) {
  if (mql.matches) {
    const clusterRows = document.querySelectorAll(".cluster-row");
    clusterRows.forEach((row) => row.remove());

    const pageBody = document.querySelector(".page-body");
    pageBody.insertBefore(mobileNavCluster, pageBody.firstChild);
  }
}

window.onload = (event) => {
  kickFlipperElement = document.getElementById("kickflipper");
  kickFlipperElement.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  if (desktopMediaQueryList.matches) {
    onDesktopMediaQueryChange(desktopMediaQueryList);
  }
};

function onMouseDown(ev) {
  drag = true;
  kickFlipperElement.src = "kickin.gif";

  // Calculate offset between mouse position and element's top-left corner
  const rect = kickFlipperElement.getBoundingClientRect();
  offsetX = ev.clientX - rect.left;
  offsetY = ev.clientY - rect.top;
  kickFlipperElement.classList.add("skewflipper");

  ev.preventDefault(); // Prevent text selection while dragging
}

function onMouseMove(ev) {
  if (drag) {
    // Position element so the click point stays under the cursor
    kickFlipperElement.style.transform = `rotateZ(${timer}deg)`;
    kickFlipperElement.style.left = ev.pageX - offsetX;
    kickFlipperElement.style.top = ev.pageY - offsetY;
  }
}

function onMouseUp(ev) {
  if (drag) {
    drag = false;
    kickFlipperElement.src = "kickflip2.png";
    kickFlipperElement.classList.remove("skewflipper");
  }
}
