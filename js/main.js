document.addEventListener('DOMContentLoaded', () => {

  /* ---- Burger ---- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  /* ===== BOOKING MODAL ===== */

  const modal = document.getElementById('bookingModal');
  const openBtn = document.querySelector('.btn-book');
  const closeBtn = document.querySelector('.close');
  const sendBtn = document.getElementById('sendBtn');
  const message = document.getElementById('message');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const email = document.getElementById('emailInput').value;

      if (!email.includes('@')) {
        message.textContent = 'Please enter a valid email';
        message.style.color = 'red';
      } else {
        message.textContent = 'Request sent! We will contact you soon.';
        message.style.color = 'green';
      }
    });
  }

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) link.classList.add('active');
  });

  /* ---- Scroll-in animation ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.52s ease, transform 0.52s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.card-row, .feature-card, .service-card, .review-card, .cruise-card, .story-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    observer.observe(el);
  });

});

/* ===================== AUTH MODAL ===================== */

const authModal = document.getElementById('authModal');
const authClose = document.getElementById('authClose');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const tabs = document.querySelectorAll('.auth-tab');

// открыть модал на ВСЕ кнопки login
document.querySelectorAll('.btn-login').forEach(btn => {
  btn.addEventListener('click', () => {
    authModal.classList.add('open');
  });
});

// закрыть
authClose.addEventListener('click', () => {
  authModal.classList.remove('open');
});

// клик вне окна
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('open');
  }
});

// tabs switch
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const type = tab.dataset.tab;

    if (type === 'login') {
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    } else {
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  });
});

/* ===================== REGISTER ===================== */

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPassword').value;

  const msg = document.getElementById('registerMsg');

  if (name.length < 2) {
    msg.textContent = "Enter valid name";
    msg.className = "auth-msg error";
    return;
  }

  if (!email.includes('@')) {
    msg.textContent = "Invalid email";
    msg.className = "auth-msg error";
    return;
  }

  if (pass.length < 6) {
    msg.textContent = "Password must be at least 6 characters";
    msg.className = "auth-msg error";
    return;
  }

  const user = { name, email, pass };

  localStorage.setItem("user", JSON.stringify(user));

  msg.textContent = "Account created successfully!";
  msg.className = "auth-msg success";
});

/* ===================== LOGIN ===================== */

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;

  const msg = document.getElementById('loginMsg');

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    msg.textContent = "No account found. Please register first.";
    msg.className = "auth-msg error";
    return;
  }

  if (email === user.email && pass === user.pass) {
    msg.textContent = "Login successful!";
    msg.className = "auth-msg success";

    setTimeout(() => {
      authModal.classList.remove('open');
    }, 800);

  } else {
    msg.textContent = "Incorrect email or password";
    msg.className = "auth-msg error";
  }
});
// SUBSCRIBE MODAL
const subscribeModal = document.getElementById("subscribeModal");
const openSubscribe = document.getElementById("openSubscribe");
const subscribeClose = document.getElementById("subscribeClose");

const subscribeEmail = document.getElementById("subscribeEmail");
const subscribeSend = document.getElementById("subscribeSend");
const subscribeMessage = document.getElementById("subscribeMessage");

// open modal
openSubscribe.addEventListener("click", () => {
  subscribeModal.style.display = "block";
});

// close modal (click on X)
subscribeClose.addEventListener("click", () => {
  subscribeModal.style.display = "none";
});

// send email (basic validation)
subscribeSend.addEventListener("click", () => {
  if (subscribeEmail.value.trim() === "") {
    subscribeMessage.textContent = "Please enter your email";
    return;
  }

  subscribeMessage.textContent = "Thank you for subscribing!";
  subscribeEmail.value = "";
});

// close modal when clicking outside of the modal content
window.addEventListener("click", (e) => {
  if (e.target === subscribeModal) {
    subscribeModal.style.display = "none";
  }
});
