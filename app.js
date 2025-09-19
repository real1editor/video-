// Configuration
const PORTFOLIO = [
  {
    title: "YouTube - Hair Oil Edit", 
    url: "https://youtube.com/watch?v=xxx",
    category: "youtube",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "TikTok Viral Edit", 
    url: "https://vm.tiktok.com/xxx",
    category: "tiktok",
    image: "https://images.unsplash.com/photo-1616469829476-8953c5655574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Reels - Before/After", 
    url: "https://instagram.com/p/xxx",
    category: "tiktok",
    image: "https://images.unsplash.com/photo-1611746869696-4c17d1c118361?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Commercial Ad - Tech Company", 
    url: "https://vimeo.com/xxx",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1579033386963-c9c471d8c444?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Documentary Short Film", 
    url: "https://youtube.com/watch?v=xxx",
    category: "youtube",
    image: "https://images.unsplash.com/photo-1591261730799-049e2bab5c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Product Launch Video", 
    url: "https://youtube.com/watch?v=xxx",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}));

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Sticky Navbar
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "var(--shadow)";
  }
});

// Populate portfolio
const portfolioGrid = document.getElementById("portfolioGrid");
PORTFOLIO.forEach(item => {
  const portfolioItem = document.createElement("div");
  portfolioItem.className = "portfolio-item fade-in";
  portfolioItem.setAttribute("data-category", item.category);
  portfolioItem.innerHTML = `
    <div class="portfolio-image">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="portfolio-overlay">
        <i class="fas fa-play-circle fa-3x"></i>
      </div>
    </div>
    <div class="portfolio-info">
      <h3>${item.title}</h3>
      <p>Click to view this project on the respective platform.</p>
      <span class="portfolio-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
    </div>
  `;
  
  portfolioItem.addEventListener("click", () => {
    window.open(item.url, "_blank");
  });
  
  portfolioGrid.appendChild(portfolioItem);
});

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    button.classList.add("active");
    
    // Get filter value
    const filterValue = button.getAttribute("data-filter");
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Scroll Animation
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(element => {
  observer.observe(element);
});

// Form Submissions
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (j.ok) { 
      alert("✅ Message sent!"); 
      form.reset(); 
    } else {
      alert("❌ Error: " + (j.error || "server"));
    }
  } catch(err) { 
    alert("⚠️ Network error"); 
    console.error(err); 
  }
});

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (j.ok) { 
      alert("✅ Feedback sent! Thank you."); 
      form.reset(); 
    } else {
      alert("❌ Error: " + (j.error || "server"));
    }
  } catch(err) { 
    alert("⚠️ Network error"); 
    console.error(err); 
  }
});

// Lazy Loading Images
if ("loading" in HTMLImageElement.prototype) {
  // Native lazy loading is supported
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  // You could dynamically import a lazy loading library here if needed
}

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Entrance animations
document.addEventListener("DOMContentLoaded", function() {
  // Add animation classes to elements
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.classList.add("animate-up");
  }
  
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title, index) => {
    title.classList.add("animate-up");
    title.style.animationDelay = `${0.2 + index * 0.1}s`;
  });
  
  const aboutImage = document.querySelector(".about-image");
  if (aboutImage) {
    aboutImage.classList.add("animate-left");
  }
  
  const aboutText = document.querySelector(".about-text");
  if (aboutText) {
    aboutText.classList.add("animate-right");
  }
  
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.classList.add("animate-up");
    card.style.animationDelay = `${0.3 + index * 0.1}s`;
  });
  
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.classList.add("animate-up");
    card.style.animationDelay = `${0.3 + index * 0.1}s`;
  });
});
