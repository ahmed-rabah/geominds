import "../components/header.js"
import "../components/footer.js"

import '../css/main.css';
import "./main.js"
import '../css/style.css';

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