const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-item");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const modal = document.querySelector(".slideshow-modal");
const modalX = document.querySelector("#modal-close");

buildArrClickListener(menuLink, jumpToSection);
buildArrClickListener(logoAnchor, jumpToSection);
buildElClickListener(modalX, modalClose);

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

function modalClose() {
  modal.classList.add("hidden");
}

function menuClose() {
  checkBox.checked ? checkBox.click() : null;
}
