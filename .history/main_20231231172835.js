
import './style.css'

// let body = document.getElementsByTagName('body') ; 
// body.insertAdjacentHTML('afterbegin',`<header>
// <nav class="nav-links" role="navigation">
//     <a href="./">
//       <img src="./images/logo.svg" alt="logo" class="logo" aria-label="logo">
//     </a>
//     <div class="menu-toggle">
//       <img src="./images/hamburger-menu.svg" alt="hamburger menu" class="icon-hamburger">
//       <img src="./images/close-menu.svg" alt="close menu" class="icon-close">
//     </div>
//     <div class="nav-menu">
//       <ul class="nav-list" role="list">
//         <li class="nav-item">
//           <a href="./" class="nav-link">home</a>
//         </li>
//         <li class="nav-item">
//           <a href="#" class="nav-link">map Explorer</a>
//         </li>
//         <li class="nav-item">
//           <a href="#" class="nav-link">geo quiz</a>
//         </li>
//         <li class="nav-item">
//           <a href="#" class="nav-link">map guess</a>
//         </li>
//         <li class="nav-item">
//           <a href="#" class="nav-link">contact us</a>
//         </li>
//         <li class="nav-item">
//           <a href="https://www.buymeacoffee.com/ahmedrabah" target="_blank" title="support us by buying us a Basketball" class="support-button bg-yellow">
//             <span>buy us 🏀</span>
//           </a>
//         </li>
//       </ul>
//   </div>
// </nav>
// </header>`);
// let body = document.getElementsByTagName('body') ; 
// console.log(body) ;

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



