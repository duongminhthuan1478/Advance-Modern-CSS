///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

// Set current year
const copyrightYearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
copyrightYearEl.textContent = currentYear;

// Make mobile menu navigation work
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");

btnNav.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});

/** Smooth scrolling animation */
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    /** http://127.0.0.1:5500/#pricing Prevent event link click, just handle by js below */
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll other link
    if (href !== "#" && href.startsWith("#")) {
      const el = document.querySelector(href);
      el.scrollIntoView({ behavior: "smooth" });
    }

    // When click link on mobile nav, just remove the nav-open
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
    }
  });
});

/**  * Sticky navigation */
const heroSection = document.querySelector(".section-hero");;
const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    console.log("entries", ent);
    if (!ent.isIntersecting) {
      // The section hero viewport no longer
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null, // In the viewport, where this element should be appearing or not
    threshold: 0, // get event when : 1 whenever herosection is completedly inside viewport, 0 when as soon as hero section moves out completed of the view port
    rootMargin: "-80px", // -80px to avoid when sticky nav exis will overload nav on other element, so -80px equivalently height(8rem) of class .sticky
  }
);
observer.observe(heroSection);

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// scrip to fix behavior smoothly scrolling in safari
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/* Css fix Safari flexbox gap not working on safari before 2021 vs, all of these will be copied to queries.css field
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
