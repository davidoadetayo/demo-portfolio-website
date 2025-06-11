// Scrollspy for Active Navigation Links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

function onScroll() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll);
onScroll(); // Run once on page load

// Toggler
const navToggler = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
const overlay = document.getElementById("overlay");

// Toggler click
navToggler.addEventListener("click", () => {
  navToggler.classList.toggle("active");
  aside.classList.toggle("open");
});

// Overlay click
overlay.addEventListener("click", () => {
  navToggler.classList.remove("active");
  aside.classList.remove("open");
});

// Theme toggler
const themeToggler = document.getElementById("theme-toggler");
const body = document.body;

// Check localStorage on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggler.innerHTML = '<i class="fas fa-sun"></i>'; // Set correct icon
} else {
  body.classList.remove("dark");
  themeToggler.innerHTML = '<i class="fas fa-moon"></i>'; // Set correct icon
}

// Toggle theme and save to localStorage
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    themeToggler.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(".section");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Run on page load

// Form validation
  const form = document.querySelector(".contact-form");

  const fields = {
    name: {
      el: form.querySelector('input[name="name"]'),
      validate: (val) => val.trim() !== "",
      message: "Please enter your name.",
    },
    email: {
      el: form.querySelector('input[name="email"]'),
      validate: (val) => /^\S+@\S+\.\S+$/.test(val),
      message: "Enter a valid email address.",
    },
    subject: {
      el: form.querySelector('input[name="subject"]'),
      validate: (val) => val.trim() !== "",
      message: "Subject can't be empty.",
    },
    message: {
      el: form.querySelector('textarea[name="message"]'),
      validate: (val) => val.trim().length >= 35,
      message: "Message must be at least 35 characters.",
    },
  };

  function setError(input, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    const errorTag = input.parentElement.querySelector(".error-message");
    if (errorTag) errorTag.textContent = message;
  }

  function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    const errorTag = input.parentElement.querySelector(".error-message");
    if (errorTag) errorTag.textContent = "";
  }

  // Live validation
  for (const key in fields) {
    const field = fields[key];
    field.el.addEventListener("input", () => {
      if (field.validate(field.el.value)) {
        setValid(field.el);
      } else {
        setError(field.el, field.message);
      }
    });
  }

  // Optional: Validate on submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true;
    for (const key in fields) {
      const field = fields[key];
      if (!field.validate(field.el.value)) {
        setError(field.el, field.message);
        allValid = false;
      }
    }

    if (allValid) {
      alert("Form submitted successfully!");
      // Submit logic here
    }
  });

// Url Observer

  // Function to update URL hash based on active link
  function updateUrlFromActiveLink() {
    const activeLink = document.querySelector('.nav a.active');
    if (activeLink) {
      const href = activeLink.getAttribute('href');
      if (window.location.hash !== href) {
        history.replaceState(null, null, href);
      }
    }
  }

  // Observe class changes on nav links to detect when 'active' changes
  navLinks.forEach(link => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          updateUrlFromActiveLink();
        }
      });
    });
    observer.observe(link, { attributes: true });
  });

  // Also call once on page load to sync URL
  window.addEventListener('DOMContentLoaded', updateUrlFromActiveLink);