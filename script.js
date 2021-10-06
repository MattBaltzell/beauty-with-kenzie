const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-click");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const modal = document.querySelector(".slideshow-modal");
const modalX = document.querySelector("#modal-close");
const galleryImages = document.querySelectorAll(".gallery-image");
const galleryViewport = document.querySelector("#slideshow-display");
const imgArr = [];
let curSource;
let curImage = 1;
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const imgNumber = document.querySelector("#image-number");

logoAnchor ? buildArrClickListener(logoAnchor, jumpToSection) : null;
menuLink ? buildArrClickListener(menuLink, jumpToSection) : null;
modalX ? buildElClickListener(modalX, modalClose) : null;
galleryImages ? buildArrClickListener(galleryImages, modalOpen): null;

function buildElClickListener(el, func) {
  el.addEventListener("click", func);
}

function buildArrClickListener(arr, func) {
  for (i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", func);
  }
}

function clearURL() {
  if(window.location.pathname == '/pricing/') {
    window.history.replaceState({}, document.title, "/pricing/");
  } else window.history.replaceState({}, document.title, "/");
}

function jumpToSectionBIG() {
  const sect = this.textContent.toLowerCase();
  const target = document.getElementById(`${sect}`);
  target.scrollIntoView(true);
  clearURL();
}

function jumpToSection() {
  if (this.classList.contains("btn")) return menuClose();
  let sect = this.textContent.toLowerCase();
  sect = sect.replace(/\s+/g, '-').toLowerCase();
  const target = document.getElementById(`${sect}`);
  target.scrollIntoView(true);
  menuClose();
  clearURL();
}

(function collectSlideImages() {
  galleryImages.forEach((el) => imgArr.push(el.getAttribute("src")));
})();

function modalOpen() {
  galleryViewport.textContent = "";
  let source = this.getAttribute("src");
  for (i = 0; i < imgArr.length; i++) {
    if (imgArr[i] === source) {
      // can change the url below to include "-lg" to keep thumbnail img files smaller than displayed images
      galleryViewport.style.backgroundImage = `url('${imgArr[i]}')`;
      imgNumber.textContent = `${i + 1} / ${imgArr.length}`;
      curImage = i + 1;
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

function nextImage() {
  curImage == 12 ? (curImage = 1) : curImage++;
  let imgSrc = imgArr[curImage - 1];
  galleryViewport.style.backgroundImage = `url("${imgSrc}")`;
  imgNumber.textContent = `${curImage} / ${imgArr.length}`;
}

function prevImage() {
  curImage == 1 ? (curImage = 12) : curImage--;
  let imgSrc = imgArr[curImage - 1];
  galleryViewport.style.backgroundImage = `url("${imgSrc}")`;
  imgNumber.textContent = `${curImage} / ${imgArr.length}`;
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
