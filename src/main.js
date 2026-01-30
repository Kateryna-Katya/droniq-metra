document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Анимация Hero (GSAP)
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

    // 2. Scroll Reveal
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    revealItems.forEach(item => revealObserver.observe(item));

    // 3. Валидация телефона (только цифры и символы +, -, space)
    const phoneInput = document.getElementById('phone-input');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9+ \-]/g, '');
    });

    // 4. AJAX отправка формы и Капча
    const contactForm = document.getElementById('ajax-form');
    const formResponse = document.getElementById('form-response');
    
    // Генерируем простую задачу
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    
    if(captchaLabel) captchaLabel.textContent = `Сколько будет ${num1} + ${num2}?`;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Проверка капчи
        if (parseInt(captchaInput.value) !== (num1 + num2)) {
            alert('Неверный ответ на защитный вопрос!');
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        // Имитация загрузки
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        setTimeout(() => {
            btn.style.display = 'none';
            formResponse.textContent = 'Спасибо! Детали на сайте. Мы свяжемся с вами в ближайшее время.';
            formResponse.classList.add('success');
            contactForm.reset();
        }, 1500);
    });
});