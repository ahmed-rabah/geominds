
import './style.css'

let toggleMenu = document.querySelector('.menu-toggle') ; 
let hamburgerBtn = toggleMenu.querySelector('.icon-hamburger') ;
let closeBtn = toggleMenu.querySelector('.icon-close') ;
let navbarMenu = document.querySelector('.nav-menu') ; 

toggleMenu.addEventListener('click', ()=>{
  hamburgerBtn.classList.toggle('hide') ; 
  closeBtn.classList.toggle('show');
  navbarMenu.classList.toggle('show');
})
//// scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if(entry.isIntersecting){
      entry.target.classList.add("show-animation") ; 
    }else{
      entry.target.classList.remove("show-animation") ; 
    }
    
    
  })
})
const animatedElements = document.querySelectorAll('.animation') ; 
animatedElements.forEach(element =>observer.observe(element)) ; 



