const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-item");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const modal = document.querySelector(".slideshow-modal");
const modalX = document.querySelector("#modal-close");
const galleryImages = document.querySelectorAll(".gallery-image");
const galleryViewport = document.querySelector("#slideshow-display");
const imgArr = [];
let curSource;
let curNumber;
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const imgNumber = document.querySelector("#image-number");

buildArrClickListener(menuLink, jumpToSection);
buildArrClickListener(logoAnchor, jumpToSection);
buildElClickListener(modalX, modalClose);
buildArrClickListener(galleryImages, modalOpen);
buildElClickListener(nextBtn, nextImage);
buildElClickListener(prevBtn, prevImage);

function buildElClickListener(el, func) {
  el.addEventListener("click", func);
  el.addEventListener("touchend", func);
}

function buildArrClickListener(arr, func) {
  for (i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", func);
  }
}

function jumpToSection() {
  if (this.classList.contains("btn")) return menuClose();
  const sect = this.textContent.toLowerCase();
  const target = document.getElementById(`${sect}-anchor`);
  target.scrollIntoView(true);
  menuClose();
}

(function collectSlideImages() {
  for (i = 0; i < galleryImages.length; i++) {
    imgArr.push(galleryImages[i].getAttribute("src"));
  }
})();

function modalOpen() {
  galleryViewport.textContent = "";
  let source = this.getAttribute("src");

  for (i = 0; i < imgArr.length; i++) {
    if (imgArr[i] === source) {
      galleryViewport.style.backgroundImage = `url('${imgArr[i]}')`;
      imgNumber.textContent = `${i + 1} / ${imgArr.length}`;
    }
  }

  modal.classList.remove("hidden");
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;
  body.style.position = "fixed";
  body.style.width = ``;
  body.style.top = `-${scrollY}`;
  document.documentElement.style.scrollBehavior = "unset";
}

function nextImage() {
  curSource = galleryViewport.style.backgroundImage;

  if (curSource === `url("${imgArr[imgArr.length - 1]}")`) {
    galleryViewport.style.backgroundImage = `url("${imgArr[0]}")`;
    imgNumber.textContent = `${1} / ${imgArr.length}`;
    return;
  }

  for (i = 0; i < imgArr.length; i++) {
    if (`url("${imgArr[i]}")` === curSource) {
      galleryViewport.style.backgroundImage = `url("${imgArr[i + 1]}")`;
      imgNumber.textContent = `${i + 2} / ${imgArr.length}`;
    }
  }
}

function prevImage() {
  curSource = galleryViewport.style.backgroundImage;
  if (curSource === `url("${imgArr[0]}")`) {
    galleryViewport.style.backgroundImage = `url("${imgArr[11]}")`;
    imgNumber.textContent = `${imgArr.length} / ${imgArr.length}`;
    return;
  }
  for (i = imgArr.length; i > 0; i--) {
    if (`url("${imgArr[i]}")` === curSource) {
      galleryViewport.style.backgroundImage = `url("${imgArr[i - 1]}")`;
      imgNumber.textContent = `${i} / ${imgArr.length}`;
    }
  }
}

function modalClose() {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.width = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  modal.classList.add("hidden");
  document.documentElement.style.scrollBehavior = "smooth";
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
