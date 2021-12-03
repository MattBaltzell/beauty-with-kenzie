const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-link");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const headerBtns = document.querySelector('.header-buttons')



function clearURL() {
  window.history.replaceState({}, document.title, "/");
}

menu.addEventListener('click',scrollSection.bind(1))
headerBtns.addEventListener('click',scrollSection.bind(1))
logoAnchor.forEach(el=>el.addEventListener('click',scrollSection.bind(1)))


function scrollSection(e){
  if(!e.target.closest('a').classList.contains('scroll')) return;
  e.preventDefault();
  const id = e.target.closest('a').getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  menuClose(e);
  if(e.target.closest('a').classList.contains('home-logo')){
    setTimeout(clearURL(),0)
  } 
}

function menuClose(e) {
  checkBox.checked ? checkBox.click() : null;
}
