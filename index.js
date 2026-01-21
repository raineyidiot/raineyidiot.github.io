let drag = false;
let offsetX = 0;
let offsetY = 0;
let kickFlipperElement;
let mobileNavCluster = undefined;
let mobileUsersDie = undefined;
let timer = 0;
let aoiSora = undefined;
let caramelldansenAudio = undefined;
let wikipe = undefined;

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
    const mbUsersDie = document.querySelector(".mobile-die-container");
    mobileNavCluster = navCluster.cloneNode(true);
    mobileUsersDie = mbUsersDie.cloneNode(true);
    pageBody.insertBefore(clusterRows[0], pageBody.firstChild);
    homeSummary.after(clusterRows[1]);
    navCluster.remove();
    mbUsersDie.remove();
  }
}

function onMobileMediaQueryChange(mql) {
  if (mql.matches) {
    const clusterRows = document.querySelectorAll(".cluster-row");
    clusterRows.forEach((row) => row.remove());
    const pageBody = document.querySelector(".page-body");
    pageBody.insertBefore(mobileNavCluster, pageBody.firstChild);
    pageBody.appendChild(mobileUsersDie);
  }
}

window.onload = (event) => {
  kickFlipperElement = document.getElementById("kickflipper");
  kickFlipperElement.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  aoiSora = document.querySelector(".aoi-sora");
  aoiSora.addEventListener("click", caramelldansen);
  if (desktopMediaQueryList.matches) {
    onDesktopMediaQueryChange(desktopMediaQueryList);
  }
};

function caramelldansen(ev) {
  if (!caramelldansenAudio) {
    caramelldansenAudio = new Audio('/yeah.mp3');
    caramelldansenAudio.loop = true;
    caramelldansenAudio.play();
    aoiSora.style.setProperty("animation-name", "shes-rainbow");
  }
  else {
    caramelldansenAudio.pause();
    caramelldansenAudio = undefined;
    aoiSora.style.removeProperty("animation-name");
  }
}

function onMouseDown(ev) {
  drag = true;
  kickFlipperElement.src = "kickin.gif";

  // calculate offset from top-left of image's bounding rect
  const rect = kickFlipperElement.getBoundingClientRect();
  offsetX = ev.clientX - rect.left;
  offsetY = ev.clientY - rect.top;
  kickFlipperElement.classList.add("skewflipper");

  ev.preventDefault();
}

function onMouseMove(ev) {
  if (drag) {
    kickFlipperElement.style.setProperty("animation-name", "rotate-flipper");
    kickFlipperElement.style.left = ev.pageX - offsetX;
    kickFlipperElement.style.top = ev.pageY - offsetY;
  }
}

function onMouseUp(ev) {
  if (drag) {
    kickFlipperElement.style.removeProperty("animation-name");
    drag = false;
    kickFlipperElement.src = "kickflip2.png";
    kickFlipperElement.classList.remove("skewflipper");
  }
}

