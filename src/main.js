document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Анимация Hero (GSAP)
    const heroTitleText = document.querySelector('#hero-title');
    if (heroTitleText) {
        const split = new SplitType('#hero-title', { types: 'words, chars' });
        
        // Устанавливаем начальное положение букв через GSAP (скрываем их)
        gsap.set(split.chars, { y: '100%' });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to(split.chars, {
            y: '0%',
            stagger: 0.02,
            duration: 1,
            delay: 0.2
        })
        .from('.hero__badge', { opacity: 0, y: 20, duration: 0.8 }, "-=0.8")
        .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from('.hero__actions', { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from('.hero__visual', { opacity: 0, scale: 0.95, duration: 1.2 }, "-=1");
    }

    // 3. Scroll Reveal (для всех секций)
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));

    // 4. Header Scroll Effect
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'rgba(248, 250, 252, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});