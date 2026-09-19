/**
 * PORTFOLIO JAVASCRIPT - MD SAZZAD HOSSEN
 * Handles: Theme Toggle, Dynamic Typing, Project Filters, Modals, Clipboard, Form & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initProjectFilters();
  initBackToTop();
  updateCurrentYear();
  initBinaryParticles();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      if (globalParticleSystem) {
        globalParticleSystem.updateTheme();
      }
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }
}

/* ==========================================================================
   2. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'IT Officer @ Nirjaas Group',
    'AI & Machine Learning Researcher',
    'Published IoT Systems Author',
    'Full-Cycle Web Developer (PHP/Laravel)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR SCROLL & MOBILE MENU
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollPos > 450) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileDrawer) return;

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileDrawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   4. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || (category && category.includes(filterValue))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. MODAL DATA & CONTROLLERS (Publications & Projects)
   ========================================================================== */
const publicationsData = {
  1: {
    title: "IoT Based Air Quality Monitoring and Notification System",
    year: "2024",
    journal: "Journal of Networking and Communication Systems",
    authors: "Md Ataullah Bhuiyan, Md Sazzad Hossen, Mahir Labib Hossain",
    abstract: "Rapid industrialization and vehicular density in metropolitan zones have heightened air pollution concerns. This research investigates the architecture of an automated, low-cost Internet of Things (IoT) monitoring apparatus utilizing calibrated sensors (MQ series, DHT11/22, and optical dust sensors) coupled with an ESP32 microprocessor. The device measures atmospheric particulate matter (PM2.5, PM10), carbon monoxide, and ambient microclimate indicators. Telemetry data is streamed over Wi-Fi to a real-time cloud dashboard with an integrated notification pipeline alerting users via SMS and email whenever harmful threshold limits are breached.",
    tags: ["IoT", "Microcontrollers", "Air Quality", "ESP32", "Sensors", "Telemetry"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  },
  2: {
    title: "IoT Based Solar Energy Collecting as Alternative Energy Source and Monitoring System",
    year: "2024",
    journal: "Journal of Computational Mechanics, Power System and Control",
    authors: "Md Sazzad Hossen, Mahir Labib Hossain, Md. Tafhim Sadman Islam, Mehedi Hassan",
    abstract: "Transitioning to clean renewable energy necessitates high-efficiency harvesting mechanisms. This publication proposes a dual-axis solar tracking and remote efficiency monitoring apparatus. The system utilizes Light Dependent Resistors (LDRs) and servo actuators to continually orient photovoltaic surfaces normal to incident solar rays, maximizing energy yield. Integrated INA219 sensors read current and voltage metrics, while cloud telemetry computes real-time battery storage dynamics and solar harvesting efficiency.",
    tags: ["Solar Power", "Dual-Axis Tracking", "IoT Monitoring", "Power Electronics", "Renewable Energy"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  },
  3: {
    title: "Phishing Website Detection System Using Machine Learning",
    year: "2024",
    journal: "Journal of Networking and Communication Systems",
    authors: "Md. Arif Khan, Md Sazzad Hossen, Md Ataullah Bhuiyan, Mahir Labib Hossain",
    abstract: "Phishing attacks remain one of the primary vectors for identity theft and corporate security breaches. This paper implements an intelligent classification framework for phishing detection. Features encompassing URL character length, special characters, HTTPS token authenticity, DNS lookup age, and webpage anchor distributions were extracted across legitimate and malicious web datasets. Various supervised machine learning algorithms (Random Forest, SVM, XGBoost) were evaluated, demonstrating superior precision and recall in flagging deceptive web interfaces in real-time.",
    tags: ["Cybersecurity", "Machine Learning", "Phishing Detection", "Feature Extraction", "Classification"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  },
  4: {
    title: "IoT Based Live Streaming and Object Detecting AI Robotic Car",
    year: "2024",
    journal: "Journal of Networking and Communication Systems",
    authors: "Md. Ohahiduzzaman, Md. Fahim, Mahir Labib Hossain, Md Ataullah Bhuiyan, Md Sazzad Hossen",
    abstract: "Autonomous exploration in hazardous or inaccessible environments requires intelligent vehicular platforms. We developed an embedded robotic rover equipped with an onboard camera module streaming high-definition, low-latency video over local Wi-Fi. A client-side or edge computer vision model conducts real-time object classification and boundary localization. Meanwhile, an array of ultrasonic and infrared sensors coordinates obstacle avoidance algorithms, allowing the robotic car to navigate autonomously or through remote manual override.",
    tags: ["Robotics", "Computer Vision", "Object Detection", "Live Video Telemetry", "Embedded Systems"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  },
  5: {
    title: "Face Detection with MTCNN Using DenseNet for Enhanced Security",
    year: "2025 (Award Winner)",
    journal: "Journal of Networking and Communication Systems",
    authors: "Mehedi Hassan, Arnob Biswas, Nayem Al Hakim, SK Al Nahia Samin, Md Sazzad Hossen",
    abstract: "Biometric surveillance frequently struggles with pose variations, facial occlusion, and volatile ambient lighting. In this work (awarded Poster Award at the CDE Annual Conference 2024), we architected a two-stage deep neural pipeline. First, Multi-Task Cascaded Convolutional Networks (MTCNN) localize faces and identify five core facial landmarks. Subsequently, deep feature embeddings are extracted using DenseNet (Densely Connected Convolutional Networks), which reuses feature maps across layers to minimize vanishing gradients and maximize biometric verification accuracy under complex real-world conditions.",
    tags: ["MTCNN", "DenseNet", "Biometrics", "Face Recognition", "Deep Learning", "Conference Award Winner"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  },
  6: {
    title: "Sentiment Analysis with Text Mining: A Study from the Newspaper Contents of Bangladesh",
    year: "2025",
    journal: "Journal of Networking and Communication Systems",
    authors: "Maisha Mumtaj, Mehedi Hassan, SK Al Nahian Samin, Auchto Dey, Md Sazzad Hossen",
    abstract: "Analyzing public perspective and media sentiment requires natural language processing (NLP) tailored to specific geographic journalistic styles. This research scraped, preprocessed, and classified articles from prominent English and Bangla national dailies across economics, politics, healthcare, and technology. Using TF-IDF vectorization, n-grams, and lexicon-based polarity estimators, the system quantifies media framing trends and evaluates public discourse sentiment.",
    tags: ["Sentiment Analysis", "Text Mining", "NLP", "News Scraping", "Python", "Linguistic Analysis"],
    scholarUrl: "https://scholar.google.com/citations?user=uaw0gPYAAAAJ&hl=en"
  }
};

const projectDetailsData = {
  air_quality: {
    title: "IoT Air Quality Monitoring & Alert Station",
    category: "IoT, Embedded Systems & Cloud Telemetry",
    image: "assets/images/project_air_quality.jpg",
    description: "An end-to-end IoT embedded solution developed as an undergraduate thesis and subsequently published in an international journal. The system features a customized sensor enclosure with active airflow, an ESP32 microcontroller, OLED digital readout, and continuous Wi-Fi cloud synchronization to provide actionable environmental data.",
    highlights: [
      "Monitors PM2.5, PM10, CO2, CO, Temperature, and Humidity in real time.",
      "Custom firmware programmed in C++ with power optimization and sleep cycles.",
      "Threshold-based instant alert triggers dispatching notification emails and SMS.",
      "Data visualization web portal providing historical trend analysis."
    ],
    tech: ["ESP32", "MQ Sensors", "OLED Display", "C++ / Arduino", "Cloud Dashboard", "HTTP/MQTT REST API"]
  },
  face_detect: {
    title: "MTCNN & DenseNet Biometric Security System",
    category: "Computer Vision, Deep Learning & Biometrics",
    image: "assets/images/project_face_detect.jpg",
    description: "Award-winning computer vision system presented at the CDE Annual Conference 2024. Designed to overcome extreme lighting and angle variations in biometric entryways and surveillance feeds.",
    highlights: [
      "Awarded Best Poster Award at CDE Annual Conference 2024.",
      "Cascade alignment using 3-stage MTCNN (P-Net, R-Net, O-Net).",
      "Dense feature embedding extraction via DenseNet-121 architecture.",
      "Real-time processing capability running at 25+ FPS on standard GPU hardware."
    ],
    tech: ["Python", "PyTorch", "MTCNN", "DenseNet", "OpenCV", "NumPy", "CUDA"]
  },
  antenna: {
    title: "Microstrip Patch Antenna for Non-Invasive Blood Glucose Monitoring",
    category: "Biomedical Sensing & RF Microwave Engineering",
    image: "assets/images/project_antenna_health.jpg",
    description: "An ongoing frontier research project designing and optimizing a medical microstrip patch antenna operating at resonant microwave frequencies to measure blood permittivity shifts non-invasively.",
    highlights: [
      "Leverages changes in blood dielectric properties to correlate glucose concentration.",
      "Eliminates painful daily finger-pricking for diabetic patients.",
      "Designed and simulated using RF electromagnetic wave modeling tools.",
      "High sensitivity return loss (S11) response tuned for human tissue safety."
    ],
    tech: ["RF Antenna Design", "Dielectric Permittivity", "Biomedical Engineering", "Proteus", "Electromagnetics"]
  },
  robotic_car: {
    title: "Autonomous AI Robotic Car with Live Telemetry",
    category: "Robotics, Embedded Hardware & Computer Vision",
    image: "assets/images/project_robotic_car.jpg",
    description: "An intelligent motorized rover engineered for surveillance, indoor reconnaissance, and hazardous environmental exploration with real-time video streaming.",
    highlights: [
      "Low-latency Wi-Fi video streaming directly to a web-based operator cockpit.",
      "Computer vision obstacle detection and path identification.",
      "Dual-mode operation: fully autonomous obstacle avoidance or remote manual driving.",
      "Published in the Journal of Networking and Communication Systems (2024)."
    ],
    tech: ["Robotics", "ESP32-CAM", "Ultrasonic Sensors", "Motor Drivers (L298N)", "OpenCV", "Python"]
  },
  covid: {
    title: "COVID-19 Information Management System",
    category: "Full-Stack Web & Healthcare Analytics",
    image: null,
    description: "A centralized web application developed to coordinate emergency medical resources, patient admissions, and pandemic trend analytics across healthcare units.",
    highlights: [
      "Patient registry, diagnostic status, and vaccination verification tracking.",
      "ICU and emergency bed allocation with real-time occupancy updates.",
      "Exportable analytical summary reports for medical directors and health agencies.",
      "Role-based authentication ensuring patient data privacy."
    ],
    tech: ["PHP OOP", "MySQL", "JavaScript", "HTML5/CSS3", "Bootstrap", "Apache"]
  },
  smart_campus: {
    title: "Smart Campus Monitoring System",
    category: "IoT Automation & Smart Facilities",
    image: null,
    description: "Showcased at the City University Project Showcasing 2021, this smart campus initiative automated classroom utilities and security monitoring to optimize energy efficiency.",
    highlights: [
      "PIR occupancy sensors detecting classroom vacancy to automate lighting and fans.",
      "Digital access logging and security perimeter alerts.",
      "Centralized campus administration dashboard tracking kilowatt-hour savings.",
      "Selected as a standout engineering showcase at City University."
    ],
    tech: ["IoT Sensors", "Microcontroller Firmware", "Automation", "Web Dashboard", "Energy Tracking"]
  }
};

function openPubModal(pubId) {
  const pub = publicationsData[pubId];
  if (!pub) return;

  const modalBody = document.getElementById('modal-content');
  const tagsHtml = pub.tags.map(t => `<span>#${t}</span>`).join('');

  modalBody.innerHTML = `
    <span class="modal-header-tag">PEER-REVIEWED PUBLICATION (${pub.year})</span>
    <h2 class="modal-title">${pub.title}</h2>
    
    <div class="modal-meta">
      <span><strong><i class="fa-solid fa-users"></i> Authors:</strong> ${pub.authors}</span>
      <span><strong><i class="fa-solid fa-book-open"></i> Journal:</strong> ${pub.journal}</span>
    </div>

    <h4 class="modal-desc-heading"><i class="fa-solid fa-align-left"></i> Abstract & Research Methodology</h4>
    <p>${pub.abstract}</p>

    <div class="modal-tech-list">
      ${tagsHtml}
    </div>

    <div style="margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="${pub.scholarUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        <i class="fa-brands fa-google-scholar"></i> View on Google Scholar
      </a>
      <button onclick="closeModal()" class="btn btn-secondary btn-sm">Close</button>
    </div>
  `;

  document.getElementById('detail-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openProjectDetails(projKey) {
  const proj = projectDetailsData[projKey];
  if (!proj) return;

  const modalBody = document.getElementById('modal-content');
  const tagsHtml = proj.tech.map(t => `<span>${t}</span>`).join('');
  const highlightsHtml = proj.highlights.map(h => `<li>${h}</li>`).join('');

  const imgHtml = proj.image ? `
    <div style="width: 100%; height: 220px; border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
      <img src="${proj.image}" alt="${proj.title}" style="width:100%; height:100%; object-fit: cover;">
    </div>
  ` : '';

  modalBody.innerHTML = `
    ${imgHtml}
    <span class="modal-header-tag">${proj.category.toUpperCase()}</span>
    <h2 class="modal-title">${proj.title}</h2>

    <p style="margin-bottom: 16px;">${proj.description}</p>

    <h4 class="modal-desc-heading"><i class="fa-solid fa-star"></i> Key Engineering Highlights</h4>
    <ul style="padding-left: 20px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">
      ${highlightsHtml}
    </ul>

    <h4 class="modal-desc-heading"><i class="fa-solid fa-microchip"></i> Technologies & Tools</h4>
    <div class="modal-tech-list">
      ${tagsHtml}
    </div>

    <div style="margin-top: 28px; display: flex; gap: 12px;">
      <button onclick="closeModal()" class="btn btn-primary btn-sm">Back to Portfolio</button>
    </div>
  `;

  document.getElementById('detail-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('detail-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'detail-modal') {
    closeModal();
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

/* ==========================================================================
   6. CLIPBOARD & TOAST SYSTEM
   ========================================================================== */
function copyToClipboard(text, customMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(customMessage);
    }).catch(() => {
      fallbackCopy(text, customMessage);
    });
  } else {
    fallbackCopy(text, customMessage);
  }
}

function fallbackCopy(text, customMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(customMessage);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const subjectInput = document.getElementById('sender-subject');
  const messageInput = document.getElementById('sender-message');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = 'Please fill out all required fields.';
    statusEl.className = 'form-status-msg error';
    return;
  }

  // Visual state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';

  // Construct mailto link
  const mailtoUrl = `mailto:mdsazzadhossen31200@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  setTimeout(() => {
    statusEl.textContent = 'Thank you! Opening your email client to dispatch the message to Md Sazzad Hossen.';
    statusEl.className = 'form-status-msg success';
    showToast('Redirecting to your email client...');

    // Open mailto
    window.location.href = mailtoUrl;

    // Reset form after short delay
    setTimeout(() => {
      e.target.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }, 2000);
  }, 800);
}

/* ==========================================================================
   8. BACK TO TOP & FOOTER
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   9. INTERACTIVE BINARY 0 & 1 PARTICLE ENGINE (DARK & LIGHT REACTIVE)
   ========================================================================== */
let globalParticleSystem = null;

function initBinaryParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  const darkPalette = [
    { color: 'rgba(6, 182, 212,', glow: '#06b6d4' },    // Neon Cyan
    { color: 'rgba(16, 185, 129,', glow: '#10b981' },   // Emerald Green
    { color: 'rgba(99, 102, 241,', glow: '#6366f1' },   // Indigo
    { color: 'rgba(168, 85, 247,', glow: '#a855f7' },   // Violet
    { color: 'rgba(56, 189, 248,', glow: '#38bdf8' }    // Sky Blue
  ];

  const lightPalette = [
    { color: 'rgba(2, 132, 199,', glow: 'transparent' }, // Deep Sky Blue
    { color: 'rgba(13, 148, 136,', glow: 'transparent' }, // Deep Teal
    { color: 'rgba(79, 70, 229,', glow: 'transparent' },  // Deep Indigo
    { color: 'rgba(124, 58, 237,', glow: 'transparent' }, // Deep Purple
    { color: 'rgba(51, 65, 85,', glow: 'transparent' }    // Deep Slate
  ];

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.text = Math.random() > 0.5 ? '1' : '0';
      this.fontSize = Math.floor(Math.random() * 7 + 11);
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 25 + 5;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.flipCounter = 0;
      this.flipInterval = Math.floor(Math.random() * 180 + 80);
      this.updateColors();
    }

    updateColors() {
      const isLight = getTheme() === 'light';
      const palette = isLight ? lightPalette : darkPalette;
      const picked = palette[Math.floor(Math.random() * palette.length)];
      this.color = picked.color;
      this.glow = picked.glow;
      this.alpha = isLight ? (Math.random() * 0.4 + 0.5) : (Math.random() * 0.5 + 0.3);
    }

    draw() {
      const isLight = getTheme() === 'light';
      ctx.save();
      ctx.font = `600 ${this.fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `${this.color}${this.alpha})`;
      if (!isLight) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.glow;
      }
      ctx.fillText(this.text, this.x, this.y);
      ctx.restore();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.flipCounter++;
      if (this.flipCounter >= this.flipInterval) {
        this.text = this.text === '1' ? '0' : '1';
        this.flipCounter = 0;
      }

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * (this.density / 3.5);
          const directionY = forceDirectionY * force * (this.density / 3.5);

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 5800), 180);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const isLight = getTheme() === 'light';
    const maxDistance = 105;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * (isLight ? 0.16 : 0.18);
          ctx.strokeStyle = isLight ? `rgba(79, 70, 229, ${opacity})` : `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  globalParticleSystem = {
    updateTheme: () => {
      particles.forEach(p => p.updateColors());
    }
  };

  resizeCanvas();
  animate();
}
