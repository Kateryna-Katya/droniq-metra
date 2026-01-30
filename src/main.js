// Инициализация иконок Lucide
lucide.createIcons();

// Эффект скролла для хедера
window.addEventListener('scroll', () => {
    const header = document.querySelector('#header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = 'none';
    }
});

// Бургер-меню (заготовка для мобильной версии)
const burger = document.getElementById('burger-menu');
const nav = document.getElementById('nav-menu');

if(burger) {
    burger.addEventListener('click', () => {
        // Логика открытия меню будет добавлена при необходимости
        console.log('Mobile menu toggled');
    });
}