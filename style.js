
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


// TESTIMONIAL SLIDER

const slider = document.querySelector(".sw");
const slides = document.querySelectorAll(".ss");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const pagination = document.querySelector(".swiperp");
const swipeArea = document.querySelector("#tesswi");

let currentIndex = 0;
let startX = 0;
let isDragging = false;



slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });

    pagination.appendChild(dot);

});



function updateSlider() {

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    const dots = document.querySelectorAll(".swiperp .dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle("active", index === currentIndex);

    });

}



nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateSlider();

});



prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    updateSlider();

});



swipeArea.addEventListener("pointerdown", (e) => {

    if (e.pointerType === "mouse" && e.button !== 0) return;

    startX = e.clientX;
    isDragging = true;

    swipeArea.setPointerCapture(e.pointerId);

});

swipeArea.addEventListener("pointerup", (e) => {

    if (!isDragging) return;

    let endX = e.clientX;

    let difference = startX - endX;

    if (difference > 50) {

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

    }

    else if (difference < -50) {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

    }

    isDragging = false;

    updateSlider();

});

swipeArea.addEventListener("pointercancel", () => {
    isDragging = false;
});



swipeArea.addEventListener("dragstart", (e) => {
    e.preventDefault();
});