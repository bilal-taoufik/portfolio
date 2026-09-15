import "../css/main.scss";

// Burger menu animation
function headerAnimation() {
    const header = document.querySelector(".header-component");
    const button = document.querySelector(".header-menu-button");
    const navLinks = document.querySelectorAll(".header-nav-link");

    if (!header || !button) return;

    button.addEventListener("click", () => {
        const isOpen = header.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            header.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    headerAnimation();
});