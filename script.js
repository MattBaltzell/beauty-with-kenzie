const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-item");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const modal = document.querySelector(".slideshow-modal");
const modalX = document.querySelector("#modal-close");
const galleryImages = document.querySelectorAll(".gallery-image")
const galleryDisplay = document.querySelector("#slideshow-display");

buildArrClickListener(menuLink, jumpToSection);
buildArrClickListener(logoAnchor, jumpToSection);
buildElClickListener(modalX, modalClose);
buildArrClickListener(galleryImages, modalOpen);

function buildElClickListener(el, func) {
  el.addEventListener("click", func);
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

function modalOpen(){
  
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `${scrollY}px`;  
  modal.classList.remove("hidden");
}

// function displayImage(){
//   gallery-image
// }

function modalClose() {
  
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  modal.classList.add("hidden");
}

function menuClose() {
  checkBox.checked ? checkBox.click() : null;
}
