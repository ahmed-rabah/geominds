
import './style.css'
import javascriptLogo from './images/logo.svg'
import viteLogo from '/images/logo.svg'
import { setupCounter } from './counter.js'


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if(entry.isIntersecting){
      entry.target.classList.add("show") ; 
    }else{
      entry.target.classList.remove("show") ; 
    }
    
    
  })
})
const animatedElements = document.querySelectorAll('.animation') ; 
animatedElements.forEach(element =>observer.observe(element)) ; 


