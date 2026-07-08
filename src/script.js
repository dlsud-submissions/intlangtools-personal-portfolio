// ==============================
// PROJECT DATA
// ==============================
const projects = [
  {
    title: "Fullstack Todo List",
    description:
      "CRUD task manager with a Node.js and Express backend featuring persistent storage and a responsive interface.",
    image: "assets/fullstack-todolist.png",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather dashboard using a public weather API with responsive UI.",
    image: "assets/weather-app.png",
  },
  {
    title: "Battleship",
    description:
      "Classic Battleship game featuring an AI opponent and developed using a test-driven workflow with Vitest.",
    image: "assets/battleship.png",
  },
  {
    title: "Foundations Calculator",
    description:
      "Keyboard-supported calculator built with vanilla JavaScript as one of my earliest frontend projects.",
    image: "assets/calculator.png",
  },
];

// ==============================
// DOM ELEMENTS
// ==============================
const projectContainer = document.getElementById("project-container");

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

const themeToggle = document.getElementById("theme-toggle");

const contactForm = document.getElementById("contact-form");

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

const backToTop = document.getElementById("back-to-top");

// ==============================
// GENERATE PROJECT CARDS
// ==============================
function displayProjects() {
  projectContainer.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">

            <div class="project-content">
                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <button class="btn details-btn">
                    View Details
                </button>
            </div>
        `;

    const button = card.querySelector(".details-btn");

    button.addEventListener("click", () => {
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalImage.src = project.image;
      modalImage.alt = project.title;

      modal.classList.add("show");
    });

    projectContainer.appendChild(card);
  });
}

displayProjects();

// ==============================
// HAMBURGER MENU
// ==============================
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
  });
});

// ==============================
// DARK MODE
// ==============================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = themeToggle.querySelector("i");

  if (document.body.classList.contains("dark")) {
    icon.className = "bx bx-sun";
  } else {
    icon.className = "bx bx-moon";
  }
});

// ==============================
// CONTACT FORM VALIDATION
// ==============================
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let valid = true;

  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("message-error").textContent = "";

  const status = document.getElementById("form-status");
  status.textContent = "";

  if (name === "") {
    document.getElementById("name-error").textContent = "Name is required.";
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    document.getElementById("email-error").textContent = "Enter a valid email.";
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById("message-error").textContent =
      "Message must contain at least 10 characters.";
    valid = false;
  }

  if (valid) {
    status.style.color = "green";
    status.textContent = "Message sent successfully!";

    contactForm.reset();
  }
});

// ==============================
// SCROLL REVEAL
// ==============================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;

    if (top < trigger) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ==============================
// ACTIVE NAVIGATION
// ==============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;

    if (pageYOffset >= top && pageYOffset < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ==============================
// MODAL
// ==============================
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// ==============================
// BACK TO TOP
// ==============================
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==============================
// TYPING ANIMATION
// ==============================
const typingElement = document.getElementById("typing-text");

const words = [
  "IT Student",
  "Full-Stack Developer",
  "Systems-Based Learner",
  "JavaScript Developer",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex);

    charIndex++;

    if (charIndex > currentWord.length) {
      deleting = true;

      setTimeout(typeEffect, 1200);

      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex);

    charIndex--;

    if (charIndex < 0) {
      deleting = false;

      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }

      charIndex = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 120);
}

typeEffect();
