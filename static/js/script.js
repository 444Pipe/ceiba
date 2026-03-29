w// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Fairy Lights Generator
const lightsContainer = document.getElementById('fairyLights');
if (lightsContainer) {
    for(let i=0; i<40; i++) {
      let light = document.createElement('div');
      light.className = 'light';
      light.style.left = Math.random() * 100 + '%';
      light.style.top = Math.random() * 100 + '%';
      light.style.animationDuration = (Math.random() * 3 + 2) + 's';
      light.style.animationDelay = (Math.random() * 2) + 's';
      lightsContainer.appendChild(light);
    }
}

// Scroll Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

// WhatsApp Form Submit
const resForm = document.getElementById('resForm');
if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = document.getElementById('rName').value;
      const d = document.getElementById('rDate').value;
      const g = document.getElementById('rGuests').value;
      const msg = `Hola La Gran Ceiba! Quiero reservar una mesa.\nNombre: ${n}\nFecha: ${d}\nPersonas: ${g}`;
      window.open(`https://wa.me/573213650060?text=${encodeURIComponent(msg)}`, '_blank');
    });
}
