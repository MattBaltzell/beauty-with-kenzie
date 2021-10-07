const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-click");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const modal = document.querySelector(".slideshow-modal");
const modalX = document.querySelector("#modal-close");
const galleryImages = document.querySelectorAll(".gallery-image");
const galleryViewport = document.querySelector("#slideshow-display");
const imgArr = [];
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const imgNumber = document.querySelector("#image-number");
let curSource;
curImage = 1;

logoAnchor ? buildArrClickListener(logoAnchor, jumpToSection) : null;
menuLink ? buildArrClickListener(menuLink, jumpToSection) : null;
galleryImages ? buildArrClickListener(galleryImages, modalOpen) : null;

function buildArrClickListener(arr, func) {
  for (i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", func);
  }
}

function clearURL() {
  if (window.location.pathname == "/pricing/") {
    window.history.replaceState({}, document.title, "/pricing/");
  } else window.history.replaceState({}, document.title, "/");
}

function jumpToSection() {
  if (this.classList.contains("btn")) return menuClose();
  let sect = this.textContent.toLowerCase();
  sect = sect.replace(/\s+/g, "-").toLowerCase();
  const target = document.getElementById(`${sect}`);
  target.scrollIntoView(true);
  menuClose();
  clearURL();
}

(function collectSlideImages() {
  galleryImages.forEach((el) => imgArr.push(el.getAttribute("src")));
})();

function modalOpen() {
  setSrc(this);
  modal.classList.remove("hidden");
  preventScroll();
}

function setSrc(el) {
  let source = el.getAttribute("src");
  for (i = 0; i < imgArr.length; i++) {
    if (imgArr[i] === source) {
      galleryViewport.style.backgroundImage = `url('${imgArr[i]}')`;
      imgNumber.textContent = `${i + 1} / ${imgArr.length}`;
      curImage = i + 1;
    }
  }
}

function preventScroll() {
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;
  body.style.position = "fixed";
  body.style.width = ``;
  body.style.top = `-${scrollY}`;
  document.documentElement.style.scrollBehavior = "unset";
}

function allowScroll() {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.width = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  document.documentElement.style.scrollBehavior = "smooth";
}

function modalClose() {
  modal.classList.add("hidden");
  allowScroll();
}

function changeImage(direction) {
  direction();
  let imgSrc = imgArr[curImage - 1];
  galleryViewport.style.backgroundImage = `url("${imgSrc}")`;
  imgNumber.textContent = `${curImage} / ${imgArr.length}`;
}

function nxt() {
  curImage == imgArr.length ? (curImage = 1) : curImage++;
}

function prev() {
  curImage == 1 ? (curImage = imgArr.length) : curImage--;
}

function menuClose() {
  checkBox.checked ? checkBox.click() : null;
}

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});
