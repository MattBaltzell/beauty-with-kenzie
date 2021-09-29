const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-item");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");

buildArrClickListener(menuLink, jumpToSection);
buildArrClickListener(logoAnchor, jumpToSection);

function buildArrClickListener(el, func) {
  for (i = 0; i < el.length; i++) {
    el[i].addEventListener("click", func);
  }
}

function jumpToSection() {
  if (this.classList.contains("btn")) return menuClose();
  const sect = this.textContent.toLowerCase();
  const target = document.getElementById(`${sect}-anchor`);
  target.scrollIntoView(true);
  menuClose();
}

function menuClose() {
  checkBox.checked ? checkBox.click() : null;
}
