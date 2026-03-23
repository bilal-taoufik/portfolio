import "../css/main.scss";
console.log("Main.scss bien chargé boss");
import "./cookie.js";
console.log("Cookie js bien chargé");

function rotatateTitleHero() {
    const words = ["Front-end", "Back-end"];
    const container = document.getElementById("heroRotatingText");

    if (!container) return;

    const activeEl = container.querySelector(".is-active");
    const nextEl = container.querySelector(".is-next");

    let index = 0;

    setInterval(() => {
        const nextIndex = (index + 1) % words.length;

        nextEl.textContent = words[nextIndex];

        activeEl.classList.add("is-animating-out");
        nextEl.classList.add("is-animating-in");

        setTimeout(() => {
            activeEl.textContent = words[nextIndex];

            activeEl.classList.remove("is-animating-out");
            nextEl.classList.remove("is-animating-in");

            index = nextIndex;
        }, 700);
    }, 2000);
}

function competencesCarousel() {
    const marquee = document.getElementById("competencesMarquee");
    const track = document.getElementById("competencesTrack");

    if (!marquee || !track) return;

    const originalItems = Array.from(track.children);
    if (!originalItems.length) return;

    originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    let isPaused = false;
    let animationId = null;
    let position = 0;
    const speed = 0.6;

    const originalWidth = originalItems.reduce((total, item) => {
        const style = window.getComputedStyle(item);
        const marginRight = parseFloat(style.marginRight) || 0;
        return total + item.offsetWidth + marginRight;
    }, 0);

    function animate() {
        if (!isPaused) {
            position -= speed;

            if (Math.abs(position) >= originalWidth) {
                position = 0;
            }

            track.style.transform = `translate3d(${position}px, 0, 0)`;
        }

        animationId = requestAnimationFrame(animate);
    }

    marquee.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    marquee.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    animate();
}

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

function contactForm() {
    const form = document.getElementById("contactForm");
    const success = document.getElementById("contactSuccess");

    if (!form || !success) return;

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const phoneInput = form.querySelector("#phone");
    const messageInput = form.querySelector("#message");
    const submitButton = form.querySelector(".contact-submit");
    const textElement = submitButton.querySelector("span");

    if (!nameInput || !emailInput || !messageInput || !submitButton || !textElement) return;

    // Empêche autre chose que des chiffres dans le téléphone
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const phone = phoneInput ? phoneInput.value.trim() : "";

        // Validation nom
        if (!name) {
            alert("Le nom est obligatoire.");
            nameInput.focus();
            return;
        }

        // Validation email
        if (!email) {
            alert("L'email est obligatoire.");
            emailInput.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Veuillez entrer une adresse email valide.");
            emailInput.focus();
            return;
        }

        // Validation message
        if (!message) {
            alert("Le message est obligatoire.");
            messageInput.focus();
            return;
        }

        // Validation téléphone
        if (phone && !/^\d{1,10}$/.test(phone)) {
            alert("Le numéro de téléphone doit contenir uniquement des chiffres, avec 10 maximum.");
            phoneInput.focus();
            return;
        }

        const originalText = textElement.textContent;

        submitButton.disabled = true;
        textElement.textContent = "Envoi...";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                form.reset();
                form.classList.add("is-hidden");
                success.hidden = false;
            } else {
                alert("Une erreur est survenue. Merci de réessayer.");
            }
        } catch (error) {
            alert("Une erreur est survenue. Merci de réessayer.");
        } finally {
            submitButton.disabled = false;
            textElement.textContent = originalText;
        }
    });
}

function animScroll() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    rotatateTitleHero();
    competencesCarousel();
    headerAnimation();
    contactForm();
    animScroll();
});