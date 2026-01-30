document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. АНИМАЦИЯ HERO (GSAP)
    const heroTitleText = document.querySelector('#hero-title');
    if (heroTitleText) {
        const split = new SplitType('#hero-title', { types: 'words, chars' });
        gsap.set(split.chars, { y: '100%' });
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.to(split.chars, { y: '0%', stagger: 0.02, duration: 1, delay: 0.2 })
          .from('.hero__badge', { opacity: 0, y: 20, duration: 0.8 }, "-=0.8")
          .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from('.hero__actions', { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from('.hero__visual', { opacity: 0, scale: 0.95, duration: 1.2 }, "-=1");
    }

    // 2. SCROLL REVEAL
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    revealItems.forEach(item => revealObserver.observe(item));

    // 3. МОБИЛЬНОЕ МЕНЮ
    const burger = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 5. КОНТАКТНАЯ ФОРМА
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+ \-]/g, '');
        });
    }

    const contactForm = document.getElementById('ajax-form');
    if (contactForm) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha-input');
        if (captchaLabel) captchaLabel.textContent = `Сколько будет ${num1} + ${num2}?`;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== (num1 + num2)) {
                alert('Неверный ответ на капчу!');
                return;
            }
            const btn = contactForm.querySelector('button');
            const formResponse = document.getElementById('form-response');
            btn.disabled = true;
            btn.textContent = 'Отправка...';
            setTimeout(() => {
                btn.style.display = 'none';
                formResponse.textContent = 'Успешно отправлено!';
                formResponse.classList.add('success');
            }, 1500);
        });
    }
});