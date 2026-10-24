
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';

htmlElement.setAttribute('data-theme', savedTheme);

function updateThemeIcon(theme) {
    const themeIcon = themeToggleBtn.querySelector('i');

    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');

    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
});

const cheese = document.getElementById('cheeseBtn');
const navMenu = document.getElementById('navbarMenu');
const cheeseIcon = cheese.querySelector('i');

cheese.addEventListener('click', () => {
    const expanded = cheese.getAttribute('aria-expanded') === 'true';

    cheese.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');

    if (!expanded) {
        cheeseIcon.className = 'fa-solid fa-xmark';
    } else {
        cheeseIcon.className = 'fa-solid fa-bars';
    }
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        cheese.setAttribute('aria-expanded', 'false');
        cheeseIcon.className = 'fa-solid fa-bars';
    });
});
