const typingTarget = document.getElementById("typing-text");
const roles = [
  "a Java Developer",
  "a Full Stack Developer",
  "a React & Spring Boot Builder",
  "a Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;

  const currentRole = roles[roleIndex];
  typingTarget.textContent = deleting
    ? currentRole.slice(0, charIndex--)
    : currentRole.slice(0, charIndex++);

  let delay = deleting ? 40 : 80;

  if (!deleting && charIndex > currentRole.length) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    delay = 300;
  }

  window.setTimeout(typeLoop, delay);
}

typeLoop();

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectDetails = {
  freelancer: {
    tag: "Marketplace Project",
    title: "Freelancer Marketplace App",
    description:
      "A marketplace-style web application designed to showcase freelancer discovery, service browsing, and client-talent interaction in a polished product interface.",
    stack:
      "Web Frontend, Marketplace UX, Responsive UI, Vercel Deployment",
    highlights: [
      "Focused on a real product-style marketplace browsing experience.",
      "Deployed publicly on Vercel for live access.",
      "Useful for demonstrating interface design and multi-section application flow."
    ],
    links: [
      { label: "Live Demo", href: "https://freelancer-marketplace-app.vercel.app/" }
    ]
  },
  "wallet-service": {
    tag: "Backend Service",
    title: "Wallet Service",
    description:
      "A Spring Boot 3 backend service for wallet operations with deposit and withdrawal APIs, PostgreSQL persistence, Liquibase schema migrations, Dockerized local setup, and concurrency-safe balance updates.",
    stack:
      "Java, Spring Boot 3, PostgreSQL, Liquibase, Docker Compose, JPA, Integration Testing",
    highlights: [
      "POST /api/v1/wallet applies deposit and withdraw operations against existing wallets.",
      "GET /api/v1/wallets/{walletId} returns the latest balance.",
      "Uses pessimistic write locking to prevent lost updates during concurrent transactions."
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/shraddhagavade/wallet-service" }
    ]
  },
  "stripe-payment": {
    tag: "Work In Progress",
    title: "Stripe Payment Integration System",
    description:
      "A production-minded payment workflow built around Spring Boot microservices, checkout sessions, hosted payments, and webhook-driven real-time transaction updates.",
    stack:
      "Java, Spring Boot, Microservices, Maven, Stripe API, Webhooks, Postman",
    highlights: [
      "Structured around multiple services for cleaner separation of responsibilities.",
      "Designed 10+ REST APIs supporting checkout and transaction processing flows.",
      "Focused on secure communication and payment status updates in real time."
    ],
    links: []
  },
  restaurant: {
    tag: "Full Stack Web App",
    title: "MERN Restaurant Reservation App",
    description:
      "A restaurant reservation platform where users can book tables online, receive confirmation, and interact with a full-stack deployment hosted across modern cloud services.",
    stack:
      "React.js, Node.js, Express.js, MongoDB, TypeScript, Vercel, Render",
    highlights: [
      "Handles real-time booking interactions and table management logic.",
      "Frontend is publicly deployed on Vercel.",
      "Public GitHub repository is available for code review."
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/shraddhagavade/restaurant-reservation-mern" },
      { label: "Live Demo", href: "https://restaurant-reservation-mern-jade.vercel.app" }
    ]
  },
  plant: {
    tag: "AI Project",
    title: "Plant Disease Detection",
    description:
      "A project exploring plant disease detection workflows and practical computer-vision style problem solving through code and experimentation on GitHub.",
    stack:
      "Python, Machine Learning, Computer Vision, GitHub",
    highlights: [
      "Represents interest in AI-assisted real-world use cases.",
      "Published as a public GitHub repository.",
      "Useful as part of the portfolio’s applied problem-solving track."
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/shraddhagavade/plant-Disease-Detection" }
    ]
  },
  ecommerce: {
    tag: "Commerce Project",
    title: "E-Commerce Platform",
    description:
      "A commerce-focused project that extends full-stack development practice into product presentation, user flows, and backend-connected shopping experiences.",
    stack:
      "JavaScript, Frontend Development, Backend Integration, Git",
    highlights: [
      "Demonstrates product-style application structure.",
      "Supports the portfolio’s commerce and transaction theme.",
      "Available as a public GitHub repository."
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/shraddhagavade/eCommerce" }
    ]
  },
  portfolio: {
    tag: "Personal Branding",
    title: "Portfolio Builds",
    description:
      "A collection of portfolio and presentation repos showing iterative work on personal branding, front-end layout, and developer showcase design.",
    stack:
      "HTML, TypeScript, UI Design, Static Frontend Development",
    highlights: [
      "Includes multiple public portfolio-style repositories.",
      "Shows experimentation with interface design and presentation.",
      "Useful for demonstrating front-end polish and deployment practice."
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/shraddhagavade" }
    ]
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

const projectModal = document.getElementById("project-modal");
const projectModalClose = document.getElementById("project-modal-close");

function renderProjectModal(projectKey) {
  const data = projectDetails[projectKey];
  if (!data || !projectModal) return;

  document.getElementById("project-modal-tag").textContent = data.tag;
  document.getElementById("project-modal-title").textContent = data.title;
  document.getElementById("project-modal-description").textContent = data.description;
  document.getElementById("project-modal-stack").textContent = data.stack;

  const highlights = document.getElementById("project-modal-highlights");
  const links = document.getElementById("project-modal-links");

  highlights.innerHTML = "";
  links.innerHTML = "";

  data.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    highlights.appendChild(li);
  });

  if (data.links.length === 0) {
    const unavailable = document.createElement("span");
    unavailable.textContent = "Public repo or live link not available";
    unavailable.className = "project-detail-btn";
    unavailable.style.cursor = "default";
    links.appendChild(unavailable);
  } else {
    data.links.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = item.label;
      links.appendChild(a);
    });
  }

  projectModal.showModal();
}

document.querySelectorAll(".project-detail-btn").forEach((button) => {
  button.addEventListener("click", () => renderProjectModal(button.dataset.project));
});

if (projectModalClose && projectModal) {
  projectModalClose.addEventListener("click", () => projectModal.close());
  projectModal.addEventListener("click", (event) => {
    const rect = projectModal.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) projectModal.close();
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject"));
    const message = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
    );
    window.location.href = `mailto:shraddhagavade920@gmail.com?subject=${subject}&body=${message}`;
  });
}

const canvas = document.getElementById("particle-canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = 70;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = "rgba(255,255,255,0.55)";
      context.fill();

      for (let j = index + 1; j < particles.length; j += 1) {
        const next = particles[j];
        const dx = particle.x - next.x;
        const dy = particle.y - next.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 120) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(18,214,64,${0.12 - distance / 1200})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    });

    window.requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
