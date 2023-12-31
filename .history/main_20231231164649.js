
import './style.css'

let toggleMenu = document.querySelector('.menu-toggle') ; 
let hamburgerBtn = toggleMenu.querySelector('.icon-hamburger') ;
let closeBtn = toggleMenu.querySelector('.icon-close') ;

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



