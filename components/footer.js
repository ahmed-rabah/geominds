import footerLogo from '../images/footer-logo.svg' ;

let footer = `<footer>
<nav id="footer-nav" class="bg-dark-blue">
  
  <form action="" id="footer-contact" class="contact-form footer-f-visib">
    <h4>contact us</h4>
    <input type="text" name="name" id="name" placeholder="ex : John Doe">
    <input type="email" name="mail" id="mail" placeholder="ex : JohnDoe@gmail.com">
    <textarea name="message" id="message" cols="24" rows="3" placeholder="your message here ..."></textarea>
    <button class="button bg-light-green">send message</button>
  </form>

  <ul class="footer-nav-list" role="list">
      <li class="footer-nav-item">
        <a href="./" class="footer-nav-link">home</a>
      </li>
      <li class="footer-nav-item">
        <a href="./mapExplorer.html" class="footer-nav-link">map Explorer</a>
      </li>
      <li class="footer-nav-item">
        <a href="./geoQuiz.html" class="footer-nav-link">geo quiz</a>
      </li>
      <li class="footer-nav-item">
        <a href="./mapGuessing.html" class="footer-nav-link">map guess</a>
      </li>
      <li class="footer-nav-item">
        <a href="./contact.html" class="footer-nav-link">contact us</a>
      </li>
  </ul>
 
  <div class="footer-logo-support">
    <a href="./">
      <img src="${footerLogo}" alt="logo"  aria-label="logo">
    </a>
      <a href="https://www.buymeacoffee.com/ahmedrabah" target="_blank" title="support us by buying us a Basketball" class="support-button bg-yellow">
      <span>buy us 🏀</span>
    </a>
  </div>
</nav>
<p id="copyright">@copyright 2023 Geominds</p>
</footer>` ; 
let firstScript = document.querySelector('body script1')
 if(firstScript){
  firstScript.insertAdjacentHTML('beforebegin', footer);
}else{
   document.body.insertAdjacentHTML('beforeend', footer);
 }
