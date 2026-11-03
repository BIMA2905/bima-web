// Typing Effect
const words = ["Web Developer", "UI/UX Designer", "Data Analyst"];
let i = 0, timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typed-target').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typed-target').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typingEffect, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}
typingEffect();

// Mobile Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Scroll Reveal Animation
window.addEventListener('scroll', revealOnScroll);
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}
revealOnScroll();

// Particle Background Effect
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Data Detail Proyek Lengkap dengan Gambar Screenshot
const projectData = {
  'project-sma': {
    title: 'Sistem Informasi Beasiswa SMA',
    tag: 'Decision Support System (SAW Method)',
    image: 'image/beasiswa.png',
    description: 'Sistem pendukung keputusan berbasis web untuk menyeleksi penerima beasiswa secara objektif dan transparan di lingkungan SMA menggunakan metode Simple Additive Weighting (SAW).',
    features: [
      'Pengelolaan menu Perhitungan, Input data, dan Laporan terstruktur',
      'Pusat Informasi Beasiswa, Pengumuman, dan Jadwal Penting bagi siswa',
      'Perhitungan kriteria dan perangkingan otomatis secara sistematis',
      'Autentikasi terpisah untuk Petugas dan Admin'
    ],
    github: 'https://github.com/bimaalfareza',
    demo: '#'
  },
  'project-desa': {
    title: 'Sistem Informasi Desa Sokoyoso',
    tag: 'Community Web Portal',
    image: 'image/desa.png',
    description: 'Website resmi pemerintahan desa yang dirancang untuk melayani masyarakat secara cepat, transparan, dan modern dengan tata letak informasi publik yang interaktif.',
    features: [
      'Profil Desa dan transparansi informasi pemerintahan',
      'Pusat Layanan masyarakat digital',
      'Informasi Berita terkini dan Agenda kegiatan desa',
      'Navigasi kontak dan pengaduan yang mudah diakses'
    ],
    github: 'https://github.com/bimaalfareza',
    demo: '#'
  }
};

// Fungsi Buka Modal (Termasuk Render Gambar Screenshot)
function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag">${data.tag}</span>
      <h3>${data.title}</h3>
    </div>
    
    <div class="modal-image-container">
      <img src="${data.image}" alt="${data.title}" class="modal-project-img" />
    </div>

    <div class="modal-body-content">
      <p>${data.description}</p>
      <div class="modal-features">
        <h4>Fitur & Sorotan Utama:</h4>
        <ul>
          ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="modal-footer-btns">
      <a href="${data.github}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> Repository GitHub</a>
      <a href="${data.demo}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
    </div>
  `;

  document.getElementById('projectModal').classList.add('active');
}

// Fungsi Tutup Modal
function closeModal() {
  document.getElementById('projectModal').classList.remove('active');
}

function closeModalOnOverlay(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
}

// --- 1. Filter Tech Stack ---
const filterBtns = document.querySelectorAll('.filter-btn');
const techCards = document.querySelectorAll('.tech-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    techCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// --- 2. Interactive Tilt Effect & Spotlight on Cards ---
const interactiveCards = document.querySelectorAll('.tech-card, .about-card');

interactiveCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set titik pusat spotlight
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Kemiringan 3D Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// --- Dark/Light Mode Toggle ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Cek preferensi tema yang tersimpan sebelumnya
const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeIcon) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio_theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio_theme', 'light');
      if (themeIcon) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      }
    }
  });
}

// --- Fungsi Hamburger Menu Mobile ---

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Mengubah ikon garis tiga (bars) menjadi tanda silang (xmark) saat dibuka
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Menutup menu otomatis ketika salah satu link menu diklik
  const navItems = navLinks.querySelectorAll('li a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });
}