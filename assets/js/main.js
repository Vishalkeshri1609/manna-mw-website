// Manna's Mens Wear — site scripts
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('li').forEach(function (li) {
      var link = li.querySelector('a');
      var dropdown = li.querySelector('.dropdown');
      if (dropdown && link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 720) {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      }
    });
  }

  // Hero carousel
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  if (slides.length > 1) {
    var current = 0;
    var show = function (i) {
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
      current = i;
    };
    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { show(idx); });
    });
    setInterval(function () {
      show((current + 1) % slides.length);
    }, 5000);
  }

  // Contact form (static demo — no backend)
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form-success');
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }
});
