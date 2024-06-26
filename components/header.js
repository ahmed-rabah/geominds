import logo from "../images/logo.svg" ;
import hamburgerMenu from "../images/hamburger-menu.svg"
import closedMenu from "../images/close-menu.svg"

document.body.insertAdjacentHTML('afterbegin',`<header>
<nav class="nav-links" role="navigation">
    <a href="./">
      <img src="${logo}" alt="logo" class="logo" aria-label="logo">
    </a>
    <div class="menu-toggle">
      <img src="${hamburgerMenu}" alt="hamburger menu" class="icon-hamburger">
      <img src="${closedMenu}" alt="close menu" class="icon-close">
    </div>
    <div class="nav-menu">
      <ul class="nav-list" role="list">
        <li class="nav-item">
          <a href="./" class="nav-link">home</a>
        </li>
        <li class="nav-item">
          <a href="./mapExplorer.html" class="nav-link">map Explorer</a>
        </li>
        <li class="nav-item">
          <a href="./geoQuiz.html" class="nav-link">geo quiz</a>
        </li>
        <li class="nav-item">
          <a href="./mapGuessing.html" class="nav-link">map guess</a>
        </li>
        <li class="nav-item">
          <a href="./contact.html" class="nav-link">contact us</a>
        </li>
        <li class="nav-item">
          <a href="https://www.buymeacoffee.com/ahmedrabah" target="_blank" title="support us by buying us a Basketball" class="support-button bg-yellow">
            <span>buy us 🏀</span>
          </a>
        </li>
      </ul>
  </div>
</nav>
</header>`);